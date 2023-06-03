"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pastelGenerator = void 0;
const color_1 = require("../../util/color");
const goldenAngle = 1 / ((1 + Math.sqrt(5)) / 2);
const pastelGenerator = (colorCount) => {
    const randomColor = new color_1.Color([Math.random(), 0.8, 0.75], 'hsl');
    let currentOffset = randomColor.hslColor.h;
    const colors = Array(colorCount).fill(0).map(() => {
        currentOffset += goldenAngle * ((Math.random() > 0.4) ? 1 : 0.5);
        currentOffset %= 1;
        return new color_1.Color([currentOffset * 360, 0.7 + Math.random() * 0.3, 0.75 + Math.random() * 0.25], 'hsl');
    });
    return colors;
};
exports.pastelGenerator = pastelGenerator;
