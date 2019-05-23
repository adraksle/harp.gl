// TODO: Discuss flexibility and problems with two interfaces (all functions with RGBA support)
export interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}

// TODO: Consider default 1 as alpha value
export interface RGBA extends RGB {
    a: number;
}

export class ColorUtils {
    /**
     * Retreive alpha component of 32-bit color value.
     * @param value color value encoded in 32-bit number.
     */
    static alpha(value: number): number {
        // tslint:disable-next-line: no-bitwise
        return (value >> 24) >= 0 ? (value >> 24) : 256 + (value >> 24);
    }

    /**
     * Retreive blue component from 32-bit RGBA color value.
     * @param value color value encoded in 32-bit number.
     */
    static blue(value: number): number {
        // tslint:disable-next-line: no-bitwise
        return (value >> 16) & 255;
    }

    /**
     * Retreive green component from 32-bit RGBA color value.
     * @param value color value encoded in 32-bit number.
     */
    static green(value: number): number {
        // tslint:disable-next-line: no-bitwise
        return (value >> 8) & 255;
    }

    /**
     * Retreive red component from 32-bit RGBA color value.
     * @param value color value encoded in 32-bit number.
     */
    static red(value: number): number {
        // tslint:disable-next-line: no-bitwise
        return value & 255;
    }

    static rgbaToInt(r: number, g: number, b: number, a: number): number {
        // tslint:disable-next-line: no-bitwise
        return ((a & 255) << 24) + (((b & 255) << 16) + ((g & 255) << 8) + (r & 255));
    }

    static intToRgba(value: number): RGBA {
        const rgba: RGBA = {
            r: ColorUtils.red(value),
            g: ColorUtils.green(value),
            b: ColorUtils.blue(value),
            a: ColorUtils.alpha(value)
        };
        return rgba;
    }

    /**
     * Mix fg and bg color, taking alpha into account.
     *
     * @param {*} bg
     * @param {*} fg
     */
    static mix(bg: number, fg: number): number {
        const a = ColorUtils.alpha(fg) / 255;
        const r = ColorUtils.lerp(ColorUtils.red(bg), ColorUtils.red(fg), a);
        const g = ColorUtils.lerp(ColorUtils.green(bg), ColorUtils.green(fg), a);
        const b = ColorUtils.lerp(ColorUtils.blue(bg), ColorUtils.blue(fg), a);

        const aBg = ColorUtils.alpha(bg);
        // tslint:disable-next-line: no-bitwise
        return (aBg << 24) | ((Math.floor(b) << 16) + (Math.floor(g) << 8) + Math.floor(r));
    }

    /**
     * Mix fg and bg RGBA colors, taking alpha into account.
     *
     * @param {*} bg
     * @param {*} fg
     */
    static mixRgba(bg: RGBA, fg: RGBA): RGBA {
        const factor = fg.a ? (fg.a / 255) : 1;
        const r = ColorUtils.lerp(bg.r, fg.r, factor);
        const g = ColorUtils.lerp(bg.g, fg.g, factor);
        const b = ColorUtils.lerp(bg.b, fg.b, factor);

        return { r: Math.floor(r), g: Math.floor(g), b: Math.floor(b), a: bg.a };
    }

    /**
     * Mix fg and bg color, taking alpha into account. (premultiplied alpha)
     *
     * @param {*} bg
     * @param {*} fg
     */
    static mixPremultiplied(bg: number, fg: number): number {
        const a = ColorUtils.alpha(fg) / 255;
        const r = ColorUtils.red(bg) * (1 - a) + ColorUtils.red(fg);
        const g = ColorUtils.green(bg) * (1 - a) + ColorUtils.green(fg);
        const b = ColorUtils.blue(bg) * (1 - a) + ColorUtils.blue(fg);

        const aBg = ColorUtils.alpha(bg);
        // tslint:disable-next-line: no-bitwise
        return (aBg << 24) | ((Math.floor(b) << 16) + (Math.floor(g) << 8) + Math.floor(r));
    }

    /**
     * Mix fg and bg RGBA colors, taking alpha into account. (premultiplied alpha)
     *
     * @param {*} bg
     * @param {*} fg
     */
    static mixPremultipliedRgba(bg: RGBA, fg: RGBA): RGBA {
        const a = fg.a ? (fg.a / 255) : 1;
        const r = bg.r * (1 - a) + fg.r;
        const g = bg.g * (1 - a) + fg.g;
        const b = bg.b * (1 - a) + fg.b;

        const bgA = bg.a ? bg.a : 1;
        return { r: Math.floor(r), g: Math.floor(g), b: Math.floor(b), a: bgA };
    }

    private static lerp(c0: number, c1: number, factor: number): number {
        return c0 * (1 - factor) + c1 * factor;
    }
}
