import { BlendMultiplyRGB, BlendOperation, BlendAlphaPremultiplied, BlendAlpha } from "./BlendOperations";
import { ColorGrayscaleAverage, ColorGrayscaleLightness } from "./ColorOperations";
// tslint:disable-next-line: no-duplicate-imports
import { ColorGrayscaleLuminosity, ColorInvert } from "./ColorOperations";
import { Color, ImageDecoder, ImageEncoder } from "./ImageFactory";
import { ImageUtils } from "./ImageUtils";


export interface ImageProcess {
    run(srcImage: ImageDecoder | ImageEncoder): ImageEncoder;
}

export class InvertColor implements ImageProcess {
    run(srcImage: ImageDecoder | ImageEncoder): ImageEncoder {
        return ImageUtils.processImageColor(srcImage, ColorInvert);
    }
}

export enum GrayscaleMethod {
    Lighness = "Lighness",
    Average = "Average",
    Luminosity = "Luminosity"
}

export class Grayscale implements ImageProcess {
    constructor(private readonly method: GrayscaleMethod = GrayscaleMethod.Luminosity) {
    }
    run(srcImage: ImageDecoder | ImageEncoder): ImageEncoder {
        switch (this.method) {
            case GrayscaleMethod.Lighness:
                return ImageUtils.processImageColor(srcImage, ColorGrayscaleLightness);
            case GrayscaleMethod.Average:
                return ImageUtils.processImageColor(srcImage, ColorGrayscaleAverage);
            case GrayscaleMethod.Luminosity:
                return ImageUtils.processImageColor(srcImage, ColorGrayscaleLuminosity);
            default: // GrayscaleMethod.Luminosity
                console.error("Unrecognized grayscale method using Luminosity instead");
                return ImageUtils.processImageColor(srcImage, ColorGrayscaleLuminosity);
        }
    }
}

export class Colorize implements ImageProcess {
    constructor(readonly color: Color) {
    }
    run(srcImage: ImageDecoder | ImageEncoder): ImageEncoder {
        // Firstly convert image to grayscale using most common Luminosity method.
        let resultImage: ImageEncoder =
            ImageUtils.processImageColor(srcImage, ColorGrayscaleLuminosity);
        // Blend multiply luminosity values by desired color.
        resultImage = ImageUtils.blendImageColor(resultImage, BlendMultiplyRGB, this.color);
        return resultImage;
    }
}

export class BlendImages implements ImageProcess {
    constructor(readonly dstImage: ImageDecoder, readonly blendOperation: BlendOperation) {
    }
    run(srcImage: ImageDecoder | ImageEncoder): ImageEncoder {
        // TODO: Not all blending modes has been yet tested
        return ImageUtils.blendImages(this.dstImage, srcImage, this.blendOperation);
    }
}

export class AddBackground implements ImageProcess {
    constructor(readonly background: ImageDecoder) {
    }
    run(srcImage: ImageDecoder | ImageEncoder): ImageEncoder {
        // TODO: First method not yet tested
        //return ImageUtils.combineImages(this.background, srcImage);
        return ImageUtils.blendImages(this.background, srcImage, BlendAlpha);
    }
}

