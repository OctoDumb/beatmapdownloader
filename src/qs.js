function stringifyValue(val) {
    switch(typeof val) {
        case "boolean":
            return val ? 'true' : 'false';
        default:
            return val.toString();
    }
}

function stringifyObject(base = '', obj = {}) {
    let values = [];
    for(let key in obj) {
        if(obj[key] === null || obj[key] === undefined) continue;
        values.push(`${base}[${key}]=${encodeURI(stringifyValue(obj[key]))}`);
    }
    return values;
}

export default function stringify(obj = {}) {
    let values = [];
    for(let key in obj) {
        if(obj[key] === null || obj[key] === undefined) continue;
        switch(typeof obj[key]) {
            case "object":
                values.push(...stringifyObject(obj[key]));
                break;
            default:
                values.push(`${key}=${encodeURI(stringifyValue(obj[key]))}`);
        }
    }
    return values.join("&");
}