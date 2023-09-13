//判断是否是空或者为null或者为undefined
export function isEmptyObject(obj) {
    if (obj === undefined) {
        return true;
    } else if (obj == null) {
        return true;
    } else if (obj === "") {
        return true;
    }
}

export function isNotEmptyObject(obj) {
    return !isEmptyObject(obj);
}