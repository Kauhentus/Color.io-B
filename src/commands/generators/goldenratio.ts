import { Color } from "../../util/color";

const goldenAngle = 1 / ((1 + Math.sqrt(5)) / 2);

export const goldenRatioGenerator = (colorCount : number) : Color[] => {
    const randomColor = new Color([Math.random(), 0.8, 0.6], 'hsl');

    let currentOffset : number = randomColor.hslColor.h;
    const colors = Array(colorCount).fill(0).map(() => {
        currentOffset += goldenAngle; 
        currentOffset %= 1;
        return new Color([currentOffset * 360, 0.7 + Math.random() * 0.3, 0.4 + Math.random() * 0.4], 'hsl')
    });
    
    return colors;
}