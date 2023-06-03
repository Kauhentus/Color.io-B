"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.harmonyGenerator = void 0;
const color_1 = require("../../util/color");
const util_1 = require("../../util/util");
const harmonyGenerator = (colorCount) => {
    const referenceAngle = Math.random() * 360;
    const offsetAngle1 = 120, offsetAngle2 = 240;
    const rangeAngle0 = (0, util_1.randomInt)(20, 40), rangeAngle1 = (0, util_1.randomInt)(20, 40), rangeAngle2 = (0, util_1.randomInt)(20, 40);
    const saturation = 0.8;
    const colors = Array(colorCount).fill(0).map(() => {
        let randomAngle = Math.random() * (rangeAngle0 + rangeAngle1 + rangeAngle2);
        if (randomAngle > rangeAngle0) {
            randomAngle += randomAngle < rangeAngle0 + rangeAngle1 ? offsetAngle1 : offsetAngle2;
        }
        return new color_1.Color([(referenceAngle + randomAngle) % 360, Math.random() * (1 - saturation) + saturation, Math.random() * 0.3 + 0.5], 'hsl');
    });
    return colors;
};
exports.harmonyGenerator = harmonyGenerator;
