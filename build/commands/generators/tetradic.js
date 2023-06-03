"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tetradicGenerator = void 0;
const color_1 = require("../../util/color");
const util_1 = require("../../util/util");
const tetradicGenerator = (colorCount) => {
    let colors = [];
    let hue = Math.random() * 360;
    let offset = (Math.random() > 0.5) ? 0 : 1;
    let darknessOffset = Math.random() * 100;
    if (Math.random() < 0.4) {
        hue = Math.random() * 40;
        offset = 0;
    }
    for (let i = offset; i < colorCount + offset; i++) {
        const baseHue = hue - 10 + Math.random() * 20;
        const boundedHue = baseHue < 0 ? baseHue + 360 : baseHue % 360;
        const darkness = Math.sin((i + darknessOffset) * Math.PI / 5) * 0.3 - 0.1;
        const lightness = (0, util_1.clamp01)((0, util_1.randomFloat)(0.4, 0.8) + darkness);
        const saturation = (0, util_1.clamp01)((0, util_1.randomFloat)(0.6, 0.9));
        const colorTriple = [boundedHue % 360, saturation, lightness];
        colors.push(new color_1.Color(colorTriple, 'hsl'));
        if (i % 2 === 0) {
            hue = (hue + 50) % 360;
        }
        else {
            hue = (hue + 130) % 360;
        }
    }
    return colors;
};
exports.tetradicGenerator = tetradicGenerator;
