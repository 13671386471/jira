import { useState, useEffect, useRef } from "react";
// 函数中最好不修改传进来的参数对象
//object 类型包含的情况比较多，不仅仅有所理解键值对对象；函数、数组、正则表达式等都是对象
// let a: object;
// a = {name: 'lisi'};
// a = ['a', 'b'];
// a = () => {};
// a = new RegExp('');
// let b = {...a}// 这时候对a进行结构的话只会得到一个空对象

// 函数中，如果参数是对象，最好使用unknown类型，因为unknown类型可以接受任何类型，但是不能进行任何操作
                            // 描述 键是字符串类型，值是unknown类型
export const clearnObject = (obj: {[key: string]: unknown}) => {
    const newObj: {[key: string]: unknown} = {};
    Object.keys(obj).forEach(key => {

        if (obj[key] && typeof obj[key] === 'object') {
            clearnObject(obj[key] as {[key: string]: unknown});
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

export const useMount = (func: () => void)=> {
    useEffect(() => {
        func();
    }, [])
    // 如果把函数传进去，每次重新渲染都会执行，所以要传一个空数组
    // 
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

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    const oldTitle = useRef(document.title).current;//document.title; //
    useEffect(() => {
        document.title = title;
    }, [title]);
    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle;
            }
        }
    }, [keepOnUnmount, oldTitle]);
}


export const resetRoute = () => {
    window.location.href = window.location.origin;
}

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 
 * @returns 当组件未渲染/卸载时，返回false；否则返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        }
    }, []);
    return mountedRef;
}