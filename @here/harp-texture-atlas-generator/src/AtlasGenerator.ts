import * as mkpath from "mkpath";
import * as path from "path";
import { BlendAlpha, BlendMultiply, BlendOperation } from "./BlendOperations";
import { FileSystem, ImageFormat } from "./FileSystem";
import { ImageBitmapDecoderConstructor, ImageBitmapEncoderConstructor } from "./ImageBitmapCoders";
import { Color, ImageDecoder, ImageEncoder, ImageFactory } from "./ImageFactory";
import { BlendImages, Colorize, Grayscale, GrayscaleMethod } from "./ImageProcessing";
// tslint:disable-next-line: no-duplicate-imports
import { AddBackground, ImageProcess, InvertColor } from "./ImageProcessing";
import { ImageVectorDecoderConstructor, ImageVectorEncoderConstructor } from "./ImageVectorCoders";
import { getLogger, Logger, LogLevel } from "./Logger";

export interface Options {
    readonly input: string;
    readonly output: string;
    readonly padding: number;
    readonly width: number;
    readonly height: number;
    readonly background: string;
    readonly minify: boolean;
    readonly verbose: boolean;
    readonly jobs: number;
    readonly processConfig: string;
}

export async function generateTextureAtlas(options: Options) {

    const outputPath = path.dirname(path.resolve(process.cwd(), options.output));
    // Input path may take a from of wildcards expression, i.e. icons/*.png
    const inputPath = path.resolve(process.cwd(), options.input);
    const inputDir = path.dirname(inputPath);

    const logger: Logger = getLogger(options.verbose);

    logger.log(LogLevel.INFO, `Output path: '${outputPath}'`);
    logger.log(LogLevel.INFO, `Input path: '${inputPath}'`);

    // TODO: Consider declaring as global.
    const glob = require('glob');

    // Parse list of input files.
    let inputFiles: string[];
    try {
        logger.log(LogLevel.INFO, `\nReading input files in: '${inputDir}' ...`);
        inputFiles = glob.sync(inputPath);
        if (inputFiles.length > 0) {
            logger.log(LogLevel.INFO, inputFiles);
        }
        else {
            logger.log(LogLevel.ERROR, "No input files found.");
            throw new Error("No input files found!");
        }
    } catch (error) {
        logger.log(LogLevel.ERROR,
            `Could not locate files at input path: '${inputPath}'. (${error})`);
        throw new Error(`Could not locate files at input path: '${inputPath}'. (${error})`);
    }

    // Prepare factory of image loaders.
    const imageFactory: ImageFactory = new ImageFactory();

    // Register bitmap MIME/image types supported.
    const bitmapDecoder = new ImageBitmapDecoderConstructor();
    const bitmapEncoder = new ImageBitmapEncoderConstructor();
    imageFactory.registerImageType(ImageFormat.PNG, bitmapDecoder, bitmapEncoder);
    imageFactory.registerImageType(ImageFormat.BMP, bitmapDecoder, bitmapEncoder);
    imageFactory.registerImageType(ImageFormat.JPG, bitmapDecoder, bitmapEncoder);
    imageFactory.registerImageType(ImageFormat.TIFF, bitmapDecoder, bitmapEncoder);
    imageFactory.registerImageType(ImageFormat.GIF, bitmapDecoder, bitmapEncoder);

    // Register vector data sources supported (SVG).
    const vectorDecoder = new ImageVectorDecoderConstructor(100, 100);
    const vectorEncoder = new ImageVectorEncoderConstructor();
    imageFactory.registerImageType(ImageFormat.SVG, vectorDecoder, vectorEncoder);

    // Read and prepare image post-processing operations.
    // Parse processing steps from json file.
    const processingSteps: ImageProcess[] = [];
    if (options.processConfig) {
        const processingConfig: any = JSON.parse(
            FileSystem.readFileSync(options.processConfig).toString());
        if (processingConfig.processingSteps === undefined ||
            !Array.isArray(processingConfig.processingSteps)) {
            logger.log(LogLevel.ERROR, "'processingSteps' node should be defined as JSON array");
            throw new Error("'processingSteps' node should be defined as JSON array");
        }
        else {
            logger.log(LogLevel.INFO, "\nProcessing steps configured:");
            logger.log(LogLevel.INFO, processingConfig);
            logger.log(LogLevel.INFO, "\n");
            for (const element of processingConfig.processingSteps) {
                // TODO: Remove undefined allow some debuging
                const imageProcess: ImageProcess | undefined =
                    await parseImageProcess(element, imageFactory);
                if (imageProcess !== undefined) {
                    processingSteps.push(imageProcess);
                }
            }
        }
    }

    // Prepare output and temporary directory.
    const tempOutputPath: string = path.join(outputPath, "temp");
    try {
        logger.log(LogLevel.INFO, `Creating output path: '${outputPath}' ...`);
        mkpath.sync(outputPath);
        logger.log(LogLevel.INFO, `Creating temporary directory: '${outputPath}/temp' ...`);
        mkpath.sync(tempOutputPath);
    } catch (error) {
        logger.log(LogLevel.ERROR, `Creating path '${outputPath}' failed. (${error})`);
        throw new Error(`Creating path '${outputPath}' failed. (${error})`);
    }

    // Process input files and generate output
    await processInput(inputFiles, inputDir, outputPath, tempOutputPath, imageFactory, logger,
        options.jobs, ...processingSteps);
}

function processInput(inputFiles: string[], inputPath: string, outputPath: string,
    tempOutputPath: string, imageFactory: ImageFactory, logger: Logger, jobsNum: number = 8,
    ...operations: ImageProcess[]): Promise<ImageEncoder[]> {

    // Process the input images in the source folder.
    // Since it will run in one process per image, the number of parallel jobs (promises)
    // is limited by options parmeter 'jobs'. This should be choosen wiselly, such like
    // 2 jobs per single CPU core. Otherwise, the memory usage may explode (> 16GB).
    const readPromises: Array<Promise<ImageEncoder>> = [];

    // TODO: Solve imports
    const promiseLimit = require("promise-limit");
    const jobLimit = promiseLimit(jobsNum);

    // Create image post-processing promises.
    for (const inputFile of inputFiles) {
        const inFile = inputFile; //path.resolve(inputPath, inputFile);
        const outFile = path.resolve(
            tempOutputPath,
            path.basename(inputFile, path.extname(inputFile)) + ".png"
        );
        const readPromise: Promise<ImageEncoder> = jobLimit(() => {
            return readAndProcessImage(inFile, outFile, imageFactory, operations, logger);
        });
        readPromises.push(readPromise);
    }

    // Process all input images in parallel jobs.
    return Promise.all(readPromises)
        .then((images: ImageEncoder[]) => {
            logger.log(LogLevel.INFO, `Intermediate images created in '${tempOutputPath}'`);
            // TODO: Finally generate atlas from images processed.
            return images;
        });
}

async function readAndProcessImage(inFile: string, outFile: string,
    imageFactory: ImageFactory, operations: ImageProcess[], logger: Logger): Promise<ImageEncoder> {
    logger.log(LogLevel.INFO, `Processing file: '${inFile}`);
    const imageDecoder = await imageFactory.loadImage(inFile);
    let imageOutput: ImageEncoder = imageDecoder.copy();
    operations.forEach(imageProcess => {
        logger.log(LogLevel.INFO, "Running image process: ", imageProcess);
        imageOutput = imageProcess.run(imageOutput);
    });
    imageOutput.writeSync(outFile);
    logger.log(LogLevel.INFO, `Written intermediate file: '${outFile}'`);
    return imageOutput;
}

async function parseImageProcess(jsonElement: any,
    imageFactory: ImageFactory): Promise<ImageProcess> {

    if (jsonElement.name === undefined || jsonElement.name.length < 1) {
        throw new Error("Unrecognized processing step, please define 'name' attribute!");
    }
    const processName: string = jsonElement.name;
    switch (processName) {
        case InvertColor.name:
            return new InvertColor();
        case Grayscale.name:
            if (jsonElement.method !== undefined) {
                return new Grayscale(jsonElement.method as GrayscaleMethod);
            }
            else {
                return new Grayscale();
            }
        case Colorize.name:
            return new Colorize(jsonElement.color as Color);
        case AddBackground.name:
            if (jsonElement.image === undefined) {
                throw new Error("Background image is not defined for AddBackground step!");
            }
            else {
                const imageBg: ImageDecoder = await imageFactory.loadImage(jsonElement.image);
                return new AddBackground(imageBg);
            }
        case BlendImages.name:
            if (jsonElement.image === undefined) {
                throw new Error("Destination 'image' attribute not defined for BlendImages step!");
            }
            else if (jsonElement.blendMode === undefined) {
                throw new Error("Atrribute 'blendMode' is not defined for BlendImages step!");
            }
            else {
                const blendOperation: BlendOperation | undefined =
                    getBlendOperationByName(jsonElement.blendMode);
                const imageDst: ImageDecoder = await imageFactory.loadImage(jsonElement.image);
                return new BlendImages(imageDst, blendOperation);
            }
        default:
            throw new Error("Unrecognized processing step: " + jsonElement.name);
    }
}

// TODO: Create key-operation map or something nicer.
function getBlendOperationByName(blendModeName: string): BlendOperation {
    switch(blendModeName) {
        case BlendAlpha.name:
            return BlendAlpha;
        case BlendMultiply.name:
            return BlendMultiply;
        default:
            throw new Error("Undefined blend operation: " + blendModeName);
    }
}
