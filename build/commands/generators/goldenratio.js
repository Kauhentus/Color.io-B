"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goldenRatioGenerator = void 0;
const color_1 = require("../../util/color");
const goldenAngle = 1 / ((1 + Math.sqrt(5)) / 2);
const goldenRatioGenerator = (colorCount) => {
    const randomColor = new color_1.Color([Math.random(), 0.8, 0.6], 'hsl');
    let currentOffset = randomColor.hslColor.h;
    const colors = Array(colorCount).fill(0).map(() => {
        currentOffset += goldenAngle;
        currentOffset %= 1;
        return new color_1.Color([currentOffset * 360, 0.7 + Math.random() * 0.3, 0.4 + Math.random() * 0.4], 'hsl');
    });
    return colors;
};
exports.goldenRatioGenerator = goldenRatioGenerator;
