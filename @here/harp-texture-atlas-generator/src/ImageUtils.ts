import { BlendOperation } from "./BlendOperations";
import { ColorOperation } from "./ColorOperations";
import { ColorUtils, RGBA } from "./ColorUtils";
import { ImageDecoder, ImageEncoder } from "./ImageFactory";

/**
 * Provides utility functions for images' blending and colors manipulation.
 */
export class ImageUtils {
    /**
     * Render the fgImage into the bgImage, applying alpha in the fgImage.
     *
     * @param {*} bgImage
     * @param {*} fgImage
     * @param {*} offsetX
     * @param {*} offsetY
     */
    static combineImages(bgImage: ImageDecoder, fgImage: ImageDecoder,
        offsetX: number = 0, offsetY: number = 0): ImageEncoder {

        const outImage: ImageEncoder = bgImage.copy();

        const w: number = fgImage.width;
        const h: number = fgImage.height;

        for (let y = 0; y < h; ++y) {
            for (let x = 0; x < w; ++x) {
                const bgColor = bgImage.getPixelAt(offsetX + x, offsetY + y);
                const fgColor = fgImage.getPixelAt(x, y);
                outImage.setPixelAt(offsetX + x, offsetY + y,
                    ColorUtils.mixPremultipliedRgba(bgColor, fgColor));
            }
        }

        return outImage;
    }

    /**
     * Render the srcImage into the dstImage, applying blend operation.
     *
     * @param {*} dstImage
     * @param {*} srcImage
     * @param {*} offsetX
     * @param {*} offsetY
     */
    static blendImages(dstImage: ImageDecoder, srcImage: ImageDecoder, blitOp: BlendOperation,
        offsetX: number = 0, offsetY: number = 0): ImageEncoder {

        const outImage: ImageEncoder = dstImage.copy();

        const w: number = Math.min(srcImage.width, dstImage.width - offsetX);
        const h: number = Math.min(srcImage.height, dstImage.height - offsetY);

        for (let y = 0; y < h; ++y) {
            for (let x = 0; x < w; ++x) {
                const dstColor = dstImage.getPixelAt(offsetX + x, offsetY + y);
                const srcColor = srcImage.getPixelAt(x, y);
                outImage.setPixelAt(offsetX + x, offsetY + y,
                    blitOp(dstColor, srcColor));
            }
        }

        return outImage;
    }

    /**
     * Perform pixel by pixel color blending on image source data.
     *
     * @param srcImage
     * @param colorOp
     * @param blendColor
     */
    static blendImageColor(srcImage: ImageDecoder | ImageEncoder, blendOp: BlendOperation,
        blendColor: RGBA) {
        const outImage: ImageEncoder = srcImage.copy();

        const w: number = srcImage.width;
        const h: number = srcImage.height;

        for (let y = 0; y < h; ++y) {
            for (let x = 0; x < w; ++x) {
                const srcColor: RGBA = srcImage.getPixelAt(x, y);
                const resColor: RGBA = blendOp(srcColor, blendColor);
                outImage.setPixelAt(x, y, resColor);
            }
        }

        return outImage;
    }

    /**
     * Perform pixel by pixel color transformation on image source data.
     *
     * @param srcImage
     * @param colorOp
     */
    static processImageColor(srcImage: ImageDecoder | ImageEncoder, colorOp: ColorOperation) {
        const outImage: ImageEncoder = srcImage.copy();

        const w: number = srcImage.width;
        const h: number = srcImage.height;

        for (let y = 0; y < h; ++y) {
            for (let x = 0; x < w; ++x) {
                const srcColor: RGBA = srcImage.getPixelAt(x, y);
                const resColor: RGBA = colorOp(srcColor);
                outImage.setPixelAt(x, y, resColor);
            }
        }

        return outImage;
    }
}

