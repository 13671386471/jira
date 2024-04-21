import { useState, useEffect } from "react";
// 函数中最好不修改传进来的参数对象
export const clearnObject = (obj: object) => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        // @ts-ignore
        if (obj[key] && typeof obj[key] === 'object') {
            // @ts-ignore
            clearnObject(obj[key])
        } else if (
            // @ts-ignore
            obj[key]!='' && 
            // @ts-ignore
            obj[key]!=undefined && 
            // @ts-ignore
            obj[key]!=null && 
            // @ts-ignore
            typeof obj[key] !== 'function'
        ) {
            // @ts-ignore
            newObj[key] = obj[key]
        }
    })

    return newObj;
}

export const useMount = (func: () => void)=> {
    useEffect(() => {
        func();
    }, [])
}

export const useDebounce = <T>(value: T, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => {
            clearTimeout(timeout);
        }
    }, [value, delay]);
    return debounceValue;
}