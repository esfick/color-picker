export const MAX_HUE = 300;
export const MAX_RGB = 255;
export const MAX_SL = 100;

const hexDict = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
}

export const convertHexToRgb = (hex) => {
    hex = hex.padEnd(6, '0');
    let r = hex.substring(0, 2);
    let g = hex.substring(2, 4);
    let b = hex.substring(4, 6);
    return {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16)
    }
}

export const convertHslToRgb = (h, s, l) => {
    h = h === ''? 0: h;
    s = s === ''? 0: s;
    l = l === ''? 0: l;
    s /= MAX_SL;
    l /= MAX_SL;
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
    r = Math.round((r + m) * MAX_RGB);
    g = Math.round((g + m) * MAX_RGB);
    b = Math.round((b + m) * MAX_RGB);
    return {
        r: r,
        g: g,
        b: b
    }
}

export const convertRgbToHex = (r, g, b) => {
    r = r === ''? 0: r;
    g = g === ''? 0: g;
    b = b === ''? 0: b;
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
    r = r === ''? 0: r/MAX_RGB;
    g = g === ''? 0: g/MAX_RGB;
    b = b === ''? 0: b/MAX_RGB;
    const cMax = Math.max(r, g, b);
    const cMin = Math.min(r, g, b);
    const delta = cMax - cMin;
    let hue = 0;
    if(delta === 0){
        hue = 0;
    }
    else if(cMax === r){
        hue = (g - b)/delta;
        hue += g < b? 6: 0;
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
        s: Math.round(sat * MAX_SL),
        l: Math.round(lgt * MAX_SL)
    }
}



