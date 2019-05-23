import { RGBA } from "./ColorUtils";

export type BlendOperation = (dst: RGBA, src: RGBA) => RGBA;

/**
 * Standard blend mode with uses src (top) layer over dst (bottom) image whenever it is opaque.
 * If source pixel is semi-transulent color mixing occurs.
 * @param dst destination color, that may be considered as background color.
 * @param src source color, that is overlaid on the background color.
 */
export const BlendAlpha: BlendOperation = (dst: RGBA, src: RGBA): RGBA => {
    const srcA = (src.a !== undefined ? src.a : 255);
    const dstA = (dst.a !== undefined ? dst.a : 255);
    const srcFactor = srcA / 255;
    const dstFactor = 1 - srcFactor;
    return {
        r: Math.floor(src.r * srcFactor + dst.r * dstFactor),
        g: Math.floor(src.g * srcFactor + dst.g * dstFactor),
        b: Math.floor(src.b * srcFactor + dst.b * dstFactor),
        a: Math.floor(srcA + dstA * dstFactor)
    };
};

/**
 * Blend mode which blits src (top) layer over dst image without taking is alpha into account.
 * In this blend mode background (dst) image alpha is ignored when mixing pixel colors.
 * The effect is that dst image is considered to be fully opaque.
 * @param dst destination or background color,
 * @param src source color beeing overlaid on the destination.
 */
export const BlendAlphaPremultiplied: BlendOperation = (dst: RGBA, src: RGBA): RGBA => {
    const srcA = (src.a !== undefined ? src.a : 255);
    const dstA = (dst.a !== undefined ? dst.a : 255);
    const dstFactor = 1 - (srcA / 255);
    return {
        r: Math.min(Math.floor(src.r + dst.r * dstFactor), 255),
        g: Math.min(Math.floor(src.g + dst.g * dstFactor), 255),
        b: Math.min(Math.floor(src.b + dst.b * dstFactor), 255),
        a: Math.min(Math.floor(srcA + dstA * dstFactor), 255)
    };
};

/**
 * Multiplies each pixel of the top layer with the corresponding pixel for the bottom layer.
 * This mode is symmetric, so exchanging layers (source and destination) doe not change
 * the result. Multiply blend mode is equivalent to a quadratic curve, or gamma correction
 * with γ=2, final result of this blend mode is darker picture.
 * @param dst
 * @param src
 */
export const BlendMultiply: BlendOperation = (dst: RGBA, src: RGBA): RGBA => {
    const srcA = (src.a !== undefined ? src.a : 255);
    const dstA = (dst.a !== undefined ? dst.a : 255);
    const dstFactor = 1 - (srcA / 255);
    return {
        r: Math.floor(src.r * dst.r / 255),
        g: Math.floor(src.g * dst.r / 255),
        b: Math.floor(src.b * dst.r / 255),
        a: Math.min(Math.floor(srcA + dstA * dstFactor), 255)
    };
};

/**
 * Multiplies colors while preserving its components range (clamp) and alpha unchanged.
 * The effect of that operation is that destination image is colorized with source
 * color, so if destination is stored in grayscale it changes to source color while
 * preserving smooth gradient transitions. Source color alpha is ignored here.
 * @param dst base surface color.
 * @param src multiplication factor (color).
 * @return multiplied color.
 */
export const BlendMultiplyRGB: BlendOperation = (dst: RGBA, src: RGBA): RGBA => {
    const dstA = (dst.a !== undefined ? dst.a : 255);
    return {
        r: Math.floor(src.r * dst.r / 255),
        g: Math.floor(src.g * dst.r / 255),
        b: Math.floor(src.b * dst.r / 255),
        a: dstA
    };
};

/**
 * In screen blend mode the colors in of layers are inverted, multiplied, and then inverted again.
 * This yields the opposite effect to multiply. The result is a brighter picture.
 * This mode is symmetric, so exchanging layers (source and destination) doe not change
 * the result. The final result of this blend mode is brighter picture.
 * @param dst
 * @param src
 */
export const BlendScreen: BlendOperation = (dst: RGBA, src: RGBA): RGBA => {
    const srcA = (src.a !== undefined ? src.a : 255);
    const dstA = (dst.a !== undefined ? dst.a : 255);
    const dstFactor = 1 - (srcA / 255);
    return {
        r: 255 - Math.floor((255 - src.r) * (255 - dst.r) / 255),
        g: 255 - Math.floor((255 - src.g) * (255 - dst.g) / 255),
        b: 255 - Math.floor((255 - src.b) * (255 - dst.b) / 255),
        a: Math.min(Math.floor(srcA + dstA * dstFactor), 255)
    };
};
