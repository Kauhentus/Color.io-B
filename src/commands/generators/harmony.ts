import { Color } from "../../util/color";
import { randomInt } from "../../util/util";

export const harmonyGenerator = (colorCount : number) : Color[] => {
    const referenceAngle = Math.random() * 360;
    const offsetAngle1 = 120, offsetAngle2 = 240;
    const rangeAngle0 = randomInt(20, 40), rangeAngle1 = randomInt(20, 40), rangeAngle2 = randomInt(20, 40);
    const saturation = 0.8;

    let previousAngle = 0;
    const colors = Array(colorCount).fill(0).map(() => {
        let randomAngle = Math.random() * (rangeAngle0 + rangeAngle1 + rangeAngle2);

        if(randomAngle > rangeAngle0){
            randomAngle += randomAngle < rangeAngle0 + rangeAngle1 ? offsetAngle1 : offsetAngle2;
        }
        
        if(Math.abs(referenceAngle + randomAngle - previousAngle) < 30) randomAngle += randomInt(20, 30);
        const newColor = new Color([(referenceAngle + randomAngle) % 360, Math.random() * (1 - saturation) + saturation, Math.random() * 0.3 + 0.5], 'hsl');
        previousAngle = referenceAngle + randomAngle;
        return newColor;
    });

    return colors;
}