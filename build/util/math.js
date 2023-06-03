"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFloat = exports.randomInt = void 0;
const randomInt = (start, stop) => Math.floor(Math.random() * (stop - start + 1) + start);
exports.randomInt = randomInt;
const randomFloat = (start, stop) => Math.random() * (stop - start + 1) + start;
exports.randomFloat = randomFloat;
