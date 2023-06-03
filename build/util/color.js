"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const raw_color_1 = require("./raw-color");
const leftBrackets = ['{', '[', '('];
const rightBrackets = ['}', ']', ')'];
class Color {
    constructor(input, type) {
        if (type === 'hex') {
            const rawHexInput = input;
            const hexInput = rawHexInput[0] === '#' ? rawHexInput.slice(1) : rawHexInput;
            this.hexColor = new raw_color_1.ColorHex(hexInput);
            this.rgbColor = this.hexColor.toRGB();
            this.hslColor = this.hexColor.toHSL();
        }
        else if (type === 'rgb') {
            const rgbInput = input;
            this.rgbColor = new raw_color_1.ColorRGB(...rgbInput);
            this.hexColor = this.rgbColor.toHex();
            this.hslColor = this.rgbColor.toHSL();
        }
        else {
            const hslInput = input;
            this.hslColor = new raw_color_1.ColorHSL(...hslInput);
            this.hexColor = this.hslColor.toHex();
            this.rgbColor = this.hslColor.toRGB();
        }
    }
    getHexString(code) {
        return this.hexColor.getString(code);
    }
    getRGBString(code) {
        return this.rgbColor.getString(code);
    }
    getHSLString(code) {
        return this.hslColor.getString(code);
    }
    getInt() {
        return parseInt(this.getHexString(false), 16);
    }
    static parseColorString(str, type) {
        const cleanedStr = str
            .replace(/\s\s+/g, ' ')
            .trimStart()
            .trimEnd();
        if (type === 'hex') {
            const curNums = cleanedStr.split(' ');
            const allHexcode = curNums.every(str => {
                return ((str[0] === '#') ? str.slice(1) : str).match(/[0-9A-Fa-f]/g);
            });
            const all6Long = curNums.every(str => {
                return (str[0] === '#') ? str.length === 7 : str.length === 6;
            });
            if (!allHexcode)
                return Promise.reject(`invalid hexcode characters`);
            if (!all6Long)
                return Promise.reject(`invalid hexcode length`);
            if (curNums.length <= 0) {
                return Promise.reject(`at least one color must be inputted`);
            }
            const colors = curNums.map(hexStr => new Color(hexStr, 'hex'));
            return Promise.resolve(colors);
        }
        else {
            let curColors = [];
            let curTriple = [];
            let curNum = '';
            let startedBracket = false;
            for (let i = 0; i < str.length; i++) {
                if (!startedBracket) {
                    if (str[i] === ' ')
                        continue;
                    if (!leftBrackets.includes(str[i])) {
                        return Promise.reject(`${type} missing starting bracket`);
                    }
                    else {
                        startedBracket = true;
                    }
                }
                else {
                    if (leftBrackets.includes(str[i])) {
                        return Promise.reject(`${type} missing ending bracket`);
                    }
                    if (rightBrackets.includes(str[i])) {
                        curTriple.push(parseFloat(curNum));
                        curNum = '';
                        if (curTriple.length !== 3) {
                            return Promise.reject(`each ${type} color requires exactly three numbers`);
                        }
                        else {
                            curColors.push(curTriple);
                            curTriple = [];
                            startedBracket = false;
                        }
                    }
                    else {
                        if (str[i] === ',') {
                            curTriple.push(parseFloat(curNum));
                            curNum = '';
                        }
                        else {
                            curNum += str[i];
                        }
                    }
                }
            }
            if (curColors.length <= 0) {
                return Promise.reject(`at least one color must be inputted`);
            }
            const colors = curColors.map(triple => new Color(triple, type));
            return Promise.resolve(colors);
        }
    }
    static toFormatString(color, toType, code) {
        return toType === 'hex' ? color.getHexString(code) :
            toType === 'rgb' ? color.getRGBString(code) :
                color.getHSLString(code);
    }
}
exports.Color = Color;
