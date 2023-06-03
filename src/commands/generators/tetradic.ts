import { Color, Triple } from "../../util/color";
import { clamp01, randomFloat } from "../../util/util";

export const tetradicGenerator = (colorCount : number) : Color[] => {
    let colors : Color[] = [];
    let hue = Math.random() * 360;

    let offset = (Math.random() > 0.5) ? 0 : 1;
    let darknessOffset = Math.random() * 100;

    
    if(Math.random() < 0.4) {
        hue = Math.random() * 40;
        offset = 0;
    }
 
    for(let i = offset; i < colorCount + offset; i++){
        const baseHue = hue - 10 + Math.random() * 20;
        const boundedHue = baseHue < 0 ? baseHue + 360 : baseHue % 360;

        const darkness = Math.sin((i + darknessOffset) * Math.PI / 5) * 0.3 - 0.1;
        const lightness = clamp01(randomFloat(0.4, 0.8) + darkness);
        const saturation = clamp01(randomFloat(0.6, 0.9));
        const colorTriple : Triple = [boundedHue % 360, saturation, lightness];

        colors.push(new Color(colorTriple, 'hsl'))
        if(i % 2 === 0){
            hue = (hue + 50) % 360;
        } else {
            hue = (hue + 130) % 360;
        }
    }
    
    return colors;
}