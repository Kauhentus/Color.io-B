"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paddedToString = exports.clampHex = exports.clampHSLFloat = exports.clampHSLHue = exports.clampRGBInt = exports.ColorHSL = exports.ColorHex = exports.ColorRGB = void 0;
class ColorRGB {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    getString(code) {
        if (code)
            return `[${this.r | 0}, ${this.g | 0}, ${this.b | 0}]`;
        return `(${this.r | 0}, ${this.g | 0}, ${this.b | 0})`;
    }
    toHex() {
        return new ColorHex((0, exports.paddedToString)((0, exports.clampRGBInt)(this.r)) + (0, exports.paddedToString)((0, exports.clampRGBInt)(this.g)) + (0, exports.paddedToString)((0, exports.clampRGBInt)(this.b)));
    }
    toRGB() {
        return this;
    }
    toHSL() {
        const [r1, g1, b1] = [this.r / 255, this.g / 255, this.b / 255];
        const rgb1 = [r1, g1, b1];
        const xmax = Math.max(...rgb1);
        const v = xmax;
        const xmin = Math.min(...rgb1);
        const c = xmax - xmin;
        const l = (xmax + xmin) / 2;
        const h = (c == 0) ? 0 :
            (v == r1) ? 60 * ((g1 - b1) / c) :
                (v == g1) ? 60 * (2 + (b1 - r1) / c) :
                    (v == b1) ? 60 * (4 + (r1 - g1) / c) : 0;
        const s = (l == 0 || l == 1) ? 0 : c / (1 - Math.abs(2 * v - c - 1));
        return new ColorHSL(h, s, l);
    }
}
exports.ColorRGB = ColorRGB;
class ColorHex {
    constructor(hex) {
        this.hex = hex;
    }
    getString(code) {
        if (code)
            return `"${this.hex.toUpperCase()}"`;
        return this.hex.toUpperCase();
    }
    toRGB() {
        return new ColorRGB(parseInt(this.hex.slice(0, 2), 16), parseInt(this.hex.slice(2, 4), 16), parseInt(this.hex.slice(4), 16));
    }
    toHSL() {
        return this.toRGB().toHSL();
    }
    toHex() {
        return this;
    }
}
exports.ColorHex = ColorHex;
class ColorHSL {
    constructor(h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
    }
    copy() {
        return new ColorHSL(this.h, this.s, this.l);
    }
    getString(code) {
        if (code)
            return `[${this.h | 0}, ${(this.s * 1000 | 0) / 1000}, ${(this.l * 1000 | 0) / 1000}]`;
        return `(${this.h | 0}, ${(this.s * 1000 | 0) / 1000}, ${(this.l * 1000 | 0) / 1000})`;
    }
    shiftHue(deltaHue) {
        this.h += deltaHue;
        if (this.h > 360)
            this.h -= 360;
        else if (this.h < 0)
            this.h += 360;
    }
    shiftSaturation(deltaSaturation) {
        this.s += deltaSaturation;
        if (this.s > 1)
            this.s -= 1;
        else if (this.s < 0)
            this.s += 0;
    }
    shiftLight(deltaLight) {
        this.l += deltaLight;
        if (this.l > 1)
            this.l -= 1;
        else if (this.l < 0)
            this.l += 0;
    }
    toRGB() {
        const c = (1 - Math.abs(2 * this.l - 1)) * this.s;
        const hp = this.h / 60;
        const x = c * (1 - Math.abs(hp % 2 - 1));
        const rhp = Math.ceil(hp);
        const [r1, g1, b1] = rhp == 1 ? [c, x, 0] :
            rhp == 2 ? [x, c, 0] :
                rhp == 3 ? [0, c, x] :
                    rhp == 4 ? [0, x, c] :
                        rhp == 5 ? [x, 0, c] :
                            rhp == 6 ? [c, 0, x] : [0, 0, 0];
        const m = this.l - c / 2;
        return new ColorRGB((r1 + m) * 255, (g1 + m) * 255, (b1 + m) * 255);
    }
    toHex() {
        return this.toRGB().toHex();
    }
    toHSL() {
        return this;
    }
}
exports.ColorHSL = ColorHSL;
const clampRGBInt = (a) => Math.min(Math.max(a | 0, 0), 255);
exports.clampRGBInt = clampRGBInt;
const clampHSLHue = (a) => Math.min(Math.max(a | 0, 0), 360);
exports.clampHSLHue = clampHSLHue;
const clampHSLFloat = (a) => Math.min(Math.max(a, 0), 1);
exports.clampHSLFloat = clampHSLFloat;
const clampHex = (a) => ('000000' + Math.min(Math.max(parseInt(a, 16), 0), 16777215).toString(16)).slice(-6);
exports.clampHex = clampHex;
const paddedToString = (a) => ('000000' + a.toString(16)).slice(-2);
exports.paddedToString = paddedToString;
