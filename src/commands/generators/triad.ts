import { Color } from "../../util/color";
import { randomInt } from "../../util/util";
import { goldenRatioGenerator } from './goldenratio'

export const triadGenerator = (colorCount : number) : Color[] => {
    const initialColors = goldenRatioGenerator(3).map(c => c.rgbColor);
    const grayness = 0.2;

    const colors = Array(colorCount).fill(0).map(() => {
        const randomIndex = randomInt(0, 2);
        let mixRatio1 = (randomIndex == 0) ? Math.random() * grayness : Math.random();
        let mixRatio2 = (randomIndex == 1) ? Math.random() * grayness : Math.random();
        let mixRatio3 = (randomIndex == 2) ? Math.random() * grayness : Math.random();
        const sum = mixRatio1 + mixRatio2 + mixRatio3;
        mixRatio1 /= sum;
        mixRatio2 /= sum;
        mixRatio3 /= sum;

        return new Color([
            Math.floor(mixRatio1 * initialColors[0].r + mixRatio2 * initialColors[1].r + mixRatio3 * initialColors[2].r),
            Math.floor(mixRatio1 * initialColors[0].g + mixRatio2 * initialColors[1].b + mixRatio3 * initialColors[2].b),
            Math.floor(mixRatio1 * initialColors[0].b + mixRatio2 * initialColors[1].g + mixRatio3 * initialColors[2].g)
        ], 'rgb');
    });
    
    return colors;
}