import { ColorHSL, ColorHex, ColorRGB } from "./raw-color";

export type ColorFlag = 'hex' | 'rgb' | 'hsl';
export type RawColorInput = string | [number, number, number];
export type LeftBracket = '{' | '[' | '(';
export type RightBracket = '}' | ']' | ')';
const leftBrackets = ['{', '[', '('];
const rightBrackets = ['}', ']', ')'];
export type Triple = [number, number, number];

export class Color {
    hexColor: ColorHex;
    rgbColor: ColorRGB;
    hslColor: ColorHSL;

    constructor(input: RawColorInput, type: ColorFlag){
        if(type === 'hex'){
            const rawHexInput = input as string;
            const hexInput = rawHexInput[0] === '#' ? rawHexInput.slice(1) : rawHexInput;
            this.hexColor = new ColorHex(hexInput);
            this.rgbColor = this.hexColor.toRGB();
            this.hslColor = this.hexColor.toHSL();
        } 

        else if(type === 'rgb'){
            const rgbInput = input as [number, number, number];
            this.rgbColor = new ColorRGB(...rgbInput);
            this.hexColor = this.rgbColor.toHex();
            this.hslColor = this.rgbColor.toHSL();
        }

        else {
            const hslInput = input as [number, number, number];
            this.hslColor = new ColorHSL(...hslInput);
            this.hexColor = this.hslColor.toHex();
            this.rgbColor = this.hslColor.toRGB();
        }
    }

    getHexString(code: boolean){
        return this.hexColor.getString(code);
    }

    getRGBString(code: boolean){
        return this.rgbColor.getString(code);
    }

    getHSLString(code: boolean){
        return this.hslColor.getString(code);
    }

    getInt(){
        return parseInt(this.getHexString(false), 16);
    }

    static parseColorString(str: string, type: ColorFlag): Promise<Color[]> {
        const cleanedStr = str
            .replace(/\s\s+/g, ' ')
            .trimStart()
            .trimEnd();

        if(type === 'hex'){
            const curNums = cleanedStr.split(' ');
            const allHexcode = curNums.every(str => {
                return ((str[0] === '#') ? str.slice(1) : str).match(/[0-9A-Fa-f]/g)
            })
            const all6Long = curNums.every(str => {
                return (str[0] === '#') ? str.length === 7 : str.length === 6
            });
            
            if(!allHexcode) return Promise.reject(`invalid hexcode characters`);
            if(!all6Long) return Promise.reject(`invalid hexcode length`);
            if(curNums.length <= 0){
                return Promise.reject(`at least one color must be inputted`)
            }

            const colors = curNums.map(hexStr => new Color(hexStr, 'hex'));
            return Promise.resolve(colors);
        } 

        else {
            let curColors : Triple[] = [];
            let curTriple = [];
            let curNum = '';
            let startedBracket = false;
            for(let i = 0; i < str.length; i++){
                if(!startedBracket){
                    if(str[i] === ' ') continue;
                    if(!leftBrackets.includes(str[i])){
                        return Promise.reject(`${type} missing starting bracket`)
                    } else {
                        startedBracket = true;
                    }
                } 

                else {
                    if(leftBrackets.includes(str[i])){
                        return Promise.reject(`${type} missing ending bracket`)
                    }

                    if(rightBrackets.includes(str[i])){
                        curTriple.push(parseFloat(curNum));
                        curNum = '';

                        if(curTriple.length !== 3){
                            return Promise.reject(`each ${type} color requires exactly three numbers`)
                        } else {
                            curColors.push(curTriple as Triple);
                            curTriple = [];
                            startedBracket = false;
                        }
                    } else {
                        if(str[i] === ','){
                            curTriple.push(parseFloat(curNum));
                            curNum = '';
                        } else {
                            curNum += str[i];
                        }
                    }
                }
            }

            if(curColors.length <= 0){
                return Promise.reject(`at least one color must be inputted`)
            }
            const colors = curColors.map(triple => new Color(triple, type));
            return Promise.resolve(colors);
        }
    }

    static toFormatString(color: Color, toType: ColorFlag, code: boolean){
        return toType === 'hex' ? color.getHexString(code) :
            toType === 'rgb' ? color.getRGBString(code) :
                color.getHSLString(code);
    }
}