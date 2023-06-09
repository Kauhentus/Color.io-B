"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkIntoN = exports.isValidHttpUrl = exports.clamp01 = exports.randomFloat = exports.randomInt = void 0;
const randomInt = (start, stop) => Math.floor(Math.random() * (stop - start + 1) + start);
exports.randomInt = randomInt;
const randomFloat = (start, stop) => Math.random() * (stop - start) + start;
exports.randomFloat = randomFloat;
const clamp01 = (n) => Math.min(Math.max(0.1, n), 1);
exports.clamp01 = clamp01;
const isValidHttpUrl = (string) => {
    let url;
    try {
        url = new URL(string);
    }
    catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
};
exports.isValidHttpUrl = isValidHttpUrl;
const chunkIntoN = (array, n) => {
    const collection = [];
    for (let i = 0; i < array.length; i += n) {
        collection.push(array.slice(i, i + n));
    }
    return collection;
};
exports.chunkIntoN = chunkIntoN;
