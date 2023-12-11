"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drawer = void 0;
const canvas_1 = require("@napi-rs/canvas");
const squareSize = 250;
const indices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const canvases = indices.map(v => {
    const canvas = (0, canvas_1.createCanvas)(squareSize * v, squareSize);
    const ctx = canvas.getContext('2d');
    return {
        canvas: canvas,
        ctx: ctx
    };
});
class Drawer {
    static squares(colors) {
        return __awaiter(this, void 0, void 0, function* () {
            const memTracker = process.memoryUsage();
            console.log("memory", JSON.stringify(memTracker));
            const { canvas: canvas, ctx: ctx } = canvases[colors.length - 1];
            for (let i = 0; i < colors.length; i++) {
                ctx.fillStyle = '#' + colors[i].getHexString(false);
                ctx.fillRect(i * squareSize, 0, squareSize, squareSize);
            }
            const imageData = yield canvas.encode('png');
            return imageData;
        });
    }
}
exports.Drawer = Drawer;
