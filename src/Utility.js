const hexDict = {
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F"
}

export const getHexValue = (value) => {
    let div = Math.floor(value / 16);
    let rem = value % 16;
    if(div >= 10){
        div = hexDict[div];
    }
    if(rem >= 10){
        rem = hexDict[rem];
    }
    return div + "" + rem;
}

export const convertHueToRGB = (hue) => {
    let r = 0, g = 0, b = 0;
    const c = 1
    const x = 1 - Math.abs((hue/60) % 2 - 1);
    if(hue < 60){
        r = 1;
        g = x;
        b = 0;
    }
    else if(hue < 120){
        r = x;
        g = 1;
        b = 0;
    }
    else if(hue < 180){
        r = 0;
        g = 1;
        b = x;
    }
    else if(hue < 240){
        r = 0;
        g = x;
        b = 1;
    }
    else if(hue < 300){
        r = x;
        g = 0;
        b = 1;
    }
    else {
        r = 1;
        g = 0;
        b = x;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export const convertRGBToHue = (red, green, blue) => {
    const r = red/255;
    const g = green/255;
    const b = blue/255;
    const cMax = Math.max(r, g, b);
    const cMin = Math.min(r, g, b);
    const delta = cMax - cMin;
    let hue = 0;
    if(delta === 0){
        return hue;
    }
    if(cMax === r){
        hue = (g - b)/delta;
        hue %= 6;
    }
    else if(cMax === g){
        hue = (b - r)/delta;
        hue += 2;
    }
    else if(cMax === b){
        hue = (r - g)/delta;
        hue += 4;
    }
    return hue * 60;
}