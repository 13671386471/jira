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
const defaultConfig ={
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initConfig}
    const [state, setState] = useState<State<D>>({
        ...defaultState,
        ...initialState
    });
    const [retry, setRetry] = useState(() => () => {});
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
    //泛型 :Promise<D> 
    // 这里的 D 是一个类型参数，代表这个 Promise 在成功（fulfilled）时将会解析的结果的数据类型
    const run = (promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setRetry(() => () => {
            console.log('setCallback::');
            if(runConfig?.retry){
                run(runConfig?.retry?.(), runConfig);
            }
            
        })
        setState({...state, stat: 'loading'})
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            // catch会消化异常，如果不主动抛出，外面是接收不到异常的，得用return Promise.reject(error)
            // 但是其他情况有需要错误对象，所以根据参数决定返回
            setError(error)
            if(config.throwOnError){
                return Promise.reject(error)
            }else {
                return error;
            }
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
        retry,
        ...state
    }
}