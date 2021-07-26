const hexDict = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
}

export const convertHslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const c = s * (1 - Math.abs(2 * l - 1));
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c/2;
    let r = 0, g = 0, b = 0;
    if(h < 60){
        r = c;
        g = x;
        b = 0;
    }
    else if(h < 120){
        r = x;
        g = c;
        b = 0;
    }
    else if(h < 180){
        r = 0;
        g = c;
        b = x;
    }
    else if(h < 240){
        r = 0;
        g = x;
        b = c;
    }
    else if(h < 300){
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return {
        r: r,
        g: g,
        b: b
    }
}

export const convertRgbToHex = (r, g, b) => {
    let hex = '';
    [r, g, b].forEach((value, i) => {
        let div = Math.floor(value / 16);
        let rem = value % 16;
        if(div >= 10){
            div = hexDict[div];
        }
        if(rem >= 10){
            rem = hexDict[rem];
        }
        hex += div + '' + rem;
    })
    return hex;
}

export const convertRgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const cMax = Math.max(r, g, b);
    const cMin = Math.min(r, g, b);
    const delta = cMax - cMin;
    let hue = 0;
    if(delta === 0){
        hue = 0;
    }
    else if(cMax === r){
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
    hue *= 60;

    let lgt = (cMax + cMin)/2;
    let sat = 0;
    if(delta !== 0){
        sat = delta/(1 - Math.abs(2 * lgt - 1));
    }

    return {
        h: Math.round(hue),
        s: Math.round(sat * 100),
        l: Math.round(lgt * 100)
    }
}


