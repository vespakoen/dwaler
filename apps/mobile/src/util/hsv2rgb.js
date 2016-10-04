function hsv2rgb(h, s, v) {
    h = bound(h);
    s = bound(s);
    v = bound(v);
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function bound(value){
    if (value < 0) {
        value = 0;
    }
    if (value >1) {
        value = 1;
    }
    return value;
}

export default function(h,s,v): ?Object {
  let rgb = hsv2rgb(h,s,v);
  return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
};