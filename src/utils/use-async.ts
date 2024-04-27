import { useEffect, useState } from "react";


interface State<D>{
    data: D | null;
    error: Error | null;
    stat: 'idle' | 'loading' | 'error' | 'success';
}
// 不加后面的类型限制的话会报错
const defaultState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultState,
        ...initialState
    });
    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    });
    const setError = (error: Error) => setState({
        data: null,
        stat: 'error',
        error
    });
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setState({...state, stat: 'loading'})
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            return Promise.reject(error)
        })
   }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        setData,
        setError,
        // 用来触发异步请求
        run,
        ...state
    }
}