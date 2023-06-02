export interface Color {
    toRGB() : ColorRGB;
    toHSL() : ColorHSL;
    toHex() : ColorHex;
    getString(code : boolean) : string;
}

export interface ColorRGB extends Color {
    r : number;
    g : number;
    b : number;
}

export class ColorRGB implements Color {
    constructor(r : number, g : number, b : number){
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getString(code : boolean) : string {
        if(code) return `[${this.r | 0}, ${this.g | 0}, ${this.b | 0}]`;
        return `(${this.r | 0}, ${this.g | 0}, ${this.b | 0})`
    }

    toHex() : ColorHex {
        return new ColorHex(paddedToString(clampRGBInt(this.r)) + paddedToString(clampRGBInt(this.g)) + paddedToString(clampRGBInt(this.b)))
    }

    toRGB() : ColorRGB {
        return this;
    }

    toHSL() : ColorHSL {
        const [r1, g1, b1] = [this.r / 255, this.g / 255, this.b / 255];
        const rgb1 = [r1, g1, b1];

        const xmax = Math.max(...rgb1);
        const v = xmax;

        const xmin = Math.min(...rgb1);
        const c = xmax - xmin;

        const l = (xmax + xmin) / 2;

        const h = 
            (c == 0) ? 0 :
            (v == r1) ? 60 * ((g1 - b1) / c) :
            (v == g1) ? 60 * (2 + (b1 - r1) / c) :
            (v == b1) ? 60 * (4 + (r1 - g1) / c) : 0;
        const s = 
            (l == 0 || l == 1) ? 0 : c / (1 - Math.abs(2 * v - c - 1));

        return new ColorHSL(h, s, l);
    }
}

export interface ColorHex extends Color {
    hex : string
}

export class ColorHex implements Color {
    constructor(hex : string){
        this.hex = hex;
    }

    getString (code : boolean) : string {
        if(code) return `"${this.hex.toUpperCase()}"`
        return this.hex.toUpperCase();
    }

    toRGB() : ColorRGB {
        return new ColorRGB(
            parseInt(this.hex.slice(0, 2), 16),
            parseInt(this.hex.slice(2, 4), 16),
            parseInt(this.hex.slice(4), 16)
        )
    }

    toHSL() : ColorHSL {
        return this.toRGB().toHSL();
    }

    toHex() : ColorHex {
        return this;
    }
}

export interface ColorHSL extends Color {
    h : number;
    s : number;
    l : number;
}

export class ColorHSL implements Color {
    constructor(h : number, s : number, l : number){
        this.h = h;
        this.s = s;
        this.l = l;
    }

    copy() : ColorHSL {
        return new ColorHSL(this.h, this.s, this.l);
    }

    getString(code : boolean) : string {
        if(code) return `[${this.h | 0}, ${(this.s * 1000 | 0) / 1000}, ${(this.l * 1000 | 0) / 1000}]`
        return `(${this.h | 0}, ${(this.s * 1000 | 0) / 1000}, ${(this.l * 1000 | 0) / 1000})`;
    }

    shiftHue(deltaHue : number) : void {
        this.h += deltaHue;

        if(this.h > 360) this.h -= 360;
        else if(this.h < 0) this.h += 360;
    }

    shiftSaturation(deltaSaturation : number) : void {
        this.s += deltaSaturation;
        if(this.s > 1) this.s -= 1;
        else if(this.s < 0) this.s += 0;
    }

    shiftLight(deltaLight : number) : void {
        this.l += deltaLight;
        if(this.l > 1) this.l -= 1;
        else if(this.l < 0) this.l += 0;
    }

    toRGB() : ColorRGB {
        const c = (1 - Math.abs(2 * this.l - 1)) * this.s;
        const hp = this.h / 60;
        const x = c * (1 - Math.abs(hp % 2 - 1));

        const rhp = Math.ceil(hp);
        const [r1, g1, b1] = 
            rhp == 1 ? [c, x, 0] :
            rhp == 2 ? [x, c, 0] :
            rhp == 3 ? [0, c, x] :
            rhp == 4 ? [0, x, c] :
            rhp == 5 ? [x, 0, c] :
            rhp == 6 ? [c, 0, x] : [0, 0, 0];

        const m = this.l - c / 2;
        
        return new ColorRGB((r1 + m) * 255, (g1 + m) * 255, (b1 + m) * 255);
    }

    toHex() : ColorHex {
        return this.toRGB().toHex();
    }

    toHSL() : ColorHSL {
        return this;
    }
}

export const clampRGBInt = (a : number) => Math.min(Math.max(a | 0, 0), 255);
export const clampHSLHue = (a : number) => Math.min(Math.max(a | 0, 0), 360);
export const clampHSLFloat = (a : number) => Math.min(Math.max(a, 0), 1);
export const clampHex = (a : string) => ('000000' + Math.min(Math.max(parseInt(a, 16), 0), 16777215).toString(16)).slice(-6);

export const paddedToString = (a : number) => ('000000' + a.toString(16)).slice(-2)