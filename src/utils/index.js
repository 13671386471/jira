
// 函数中最好不修改传进来的参数对象
export const clearnObject = (obj) => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') {
            clearnObject(obj[key])
        } else if (
            obj[key]!='' && 
            obj[key]!=undefined && 
            obj[key]!=null && 
            typeof obj[key] !== 'function'
        ) {
            newObj[key] = obj[key]
        }
    })

    return newObj;
}