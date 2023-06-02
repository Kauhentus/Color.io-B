import { Color } from "./color"
import { createCanvas } from "@napi-rs/canvas";
import * as fs from "fs";

export class Drawer {
    static async squares(colors: Color[]){
        const squareSize = 250;
        const canvas = createCanvas(
            squareSize * colors.length,
            squareSize
        );
        const ctx = canvas.getContext('2d');

        for(let i = 0; i < colors.length; i++){
            ctx.fillStyle = '#' + colors[i].getHexString(false);
            ctx.fillRect(i * squareSize, 0, squareSize, squareSize);
        }

        /*canvas.encode('png').then(data => {
            fs.writeFile('./picture.png', data, () => {});
        })*/
        const imageData = await canvas.encode('png');
        return imageData;
    }
}