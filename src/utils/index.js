// 深拷贝
export function deepClone(source) {
    if (!source && typeof source !== "object") {
        throw new Error("error arguments", "deepClone");
    }
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === "object") {
            targetObj[keys] = deepClone(source[keys]);
        } else {
            targetObj[keys] = source[keys];
        }
    });
    return targetObj;
}
// 递归拆解树结构
export function treeRecursionToArray(data) {
    let result = [];
    const expanded = (dt) => {
        if (dt && dt.length > 0) {
            dt.map((item) => {
                if (item.type == 2) result.push(item);
                expanded(item.children);
            });
        }
    };
    expanded(data);
    return result;
}
