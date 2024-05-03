import { useSearchParams } from "react-router-dom"

/**
 * 
 * @returns 返回url后缀参数组成的对象http://jira.com?name=1&age=2
 * 返回的例子： {name: '1', age: '2'}
 * 
 */
export const useUrlQueryParam = (keys: string[]) => {
    const [searchParam, setSearchParam] = useSearchParams();
    return [
        keys.reduce((prev: {[key: string]: string}, key: string) => {
            
            return {...prev, [key]: searchParam.get(key) || ''}
        }, {} as {[key in string]: string}),

        (params: {[key: string]: unknown}) => {
            const o = {...Object.fromEntries(searchParam)};
            Object.assign(o, params);
            return setSearchParam(o);
        }
    ] as const;
}

// 不加后面的as const，那么返回的数组类型是每一项都是联合类型，而不是[string, number, object]
// 如果像让类型检查正确返回所写的类型，那么需要加上as const
// const a = ['jack', 18, {genaral: 'man'}] as const;

// const b = ['13'] as const;