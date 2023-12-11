import { Color } from "./color"
import { createCanvas } from "@napi-rs/canvas";

const squareSize = 250;
const indices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const canvases = indices.map(v => {
    const canvas = createCanvas(
        squareSize * v,
        squareSize
    );
    const ctx = canvas.getContext('2d');
    return {
        canvas: canvas,
        ctx: ctx
    }
});

export class Drawer {
    static async squares(colors: Color[]){
        const memTracker = process.memoryUsage();
        console.log("memory", JSON.stringify(memTracker));

        const {
            canvas: canvas,
            ctx: ctx
        } = canvases[colors.length - 1];

        for(let i = 0; i < colors.length; i++){
            ctx.fillStyle = '#' + colors[i].getHexString(false);
            ctx.fillRect(i * squareSize, 0, squareSize, squareSize);
        }

        const imageData = await canvas.encode('png');
        return imageData;
    }
}