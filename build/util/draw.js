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
class Drawer {
    static squares(colors) {
        return __awaiter(this, void 0, void 0, function* () {
            const squareSize = 250;
            const canvas = (0, canvas_1.createCanvas)(squareSize * colors.length, squareSize);
            const ctx = canvas.getContext('2d');
            for (let i = 0; i < colors.length; i++) {
                ctx.fillStyle = '#' + colors[i].getHexString(false);
                ctx.fillRect(i * squareSize, 0, squareSize, squareSize);
            }
            /*canvas.encode('png').then(data => {
                fs.writeFile('./picture.png', data, () => {});
            })*/
            const imageData = yield canvas.encode('png');
            return imageData;
        });
    }
}
exports.Drawer = Drawer;
