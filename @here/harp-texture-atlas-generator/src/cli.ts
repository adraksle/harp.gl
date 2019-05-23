#!/usr/bin/env node

import * as program from "commander";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { generateTextureAtlas, Options } from "./AtlasGenerator";
import { getLogger, Logger, LogLevel } from "./Logger";

const version = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")).version;

const outputFile: string = "./output/texture-atlas";
const padding: number = 1;
const width: number = 32;
const height: number = 32;
const jobs: number = os.cpus().length;

program
    .version(version)
    .description("CLI tool for generating texture atlases from multiple image sources.")
    .usage("[options] URL")
    .option("-i, --in [path]", "Input path")
    .option("-o, --out [file]", "Output atlas and definition file name", outputFile)
    .option("-p, --padding [num]", "Padding between icons", padding)
    .option("-w, --width [num]", "Width of each image in atlas", width)
    .option("-h, --height [num]", "Height of each atlas image", height)
    .option("-bg, --background [image path]", "Image used as unified background for each sprite")
    .option("-m, --minify", "Minify JSON")
    .option("-v, --verbose", "Verbose mode")
    .option("-j, --jobs", "Number of processing threads", jobs)
    .option("-c, --processConfig [path]", "Processing steps configuration json file")
    .parse(process.argv);

// Update parsed arguments
const cliOptions = program.opts();
const options: Options = {
    input: cliOptions.in,
    output: cliOptions.out,
    padding: parseInt(cliOptions.padding, 10),
    width: parseInt(cliOptions.width, 10),
    height: parseInt(cliOptions.height, 10),
    background: cliOptions.background,
    minify: cliOptions.minify,
    verbose: cliOptions.verbose,
    jobs: parseInt(cliOptions.jobs, 10),
    processConfig: cliOptions.processConfig,
};

const logger: Logger = getLogger(options.verbose);

if (options.verbose) {
    logger.log(LogLevel.INFO, "Verbose mode active, params list:");
    logger.log(LogLevel.INFO, "Input path: '%s'", options.input);
    logger.log(LogLevel.INFO, "Input config: '%s'", options.processConfig);
    logger.log(LogLevel.INFO, "Output PNG image: '%s.png'", options.output);
    logger.log(LogLevel.INFO, "Output JSON file: '%s.json'", options.output);
    logger.log(LogLevel.INFO, "Padding: %s", options.padding);
    logger.log(LogLevel.INFO, "Sprite width: %s", options.width);
    logger.log(LogLevel.INFO, "Sprite height: %s", options.height);
    logger.log(LogLevel.INFO, "Sprite background: '%s'", options.background);
    logger.log(LogLevel.INFO, "Minify JSON: %s", options.minify);
    logger.log(LogLevel.INFO, "Number of jobs: %s", options.jobs)
}

// Validate input/output parameters
if (options.input === undefined || options.input.length < 1) {
    logger.log(LogLevel.ERROR, "\nMissing input path!\n");
    program.outputHelp();
    process.exit(-1);
}
else if (options.output.length < 1) {
    logger.log(LogLevel.ERROR, "\nInvalid output path, please specify -o [path]\n");
    program.outputHelp();
    process.exit(-1);
}
else if (options.output === outputFile) {
    logger.log(LogLevel.INFO, "\nUsing default output path: %s[.png|.json]\n", outputFile);
}

// Run texture atlas generator
generateTextureAtlas(options)
    .then(() => {
        logger.log(LogLevel.INFO, "Image atlas created at: " + outputFile);
    })
    .catch((err: Error) => {
        logger.log(LogLevel.INFO, "Could not create image atlas.\nError: ", err);
    });
