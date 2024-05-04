import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { clearnObject } from "utils";

/**
 * 
 * @returns 返回url后缀参数组成的对象http://jira.com?name=1&age=2
 * 返回的例子： {name: '1', age: '2'}
 * 
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParam, setSearchParam] = useSearchParams();
    console.log('searchParam::>', searchParam, Object.fromEntries(searchParam));
    return [
        useMemo(() => {
            return keys.reduce((prev: {[key in K]: string}, key: K) => {

                return {...prev, [key]: searchParam.get(key) || ''}
            }, {} as {[key in K]: string})
        }, [searchParam]), 
                                    //因为不确定值是什么类型的
        (params: Partial<{[key in K]: unknown}>) => {
            const o = clearnObject({
                ...Object.fromEntries(searchParam),
                ...params
            }) as URLSearchParamsInit; 
            return setSearchParam(o);
        }
    ] as const;
}
// https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
// 不加后面的as const，那么返回的数组类型是每一项都是联合类型，而不是[string, number, object]
// 如果像让类型检查正确返回所写的类型，那么需要加上as const
// const a = ['jack', 18, {genaral: 'man'}] as const;

// const b = ['13'] as const;