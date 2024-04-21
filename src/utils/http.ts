
import qs from 'qs';
import {logout} from '../auth-provider';
import { useAuth } from '../context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL;

interface HttpConfig extends RequestInit{
    data?: object,
    token?: string,
}

export const http = (
    endpoint: string, 
    {data, token, ...customConfig}: HttpConfig = {}
) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig,
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    }else {
        config.body = JSON.stringify(data || {});
    }

    return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async res => {
        if (res.status === 401) {
            await logout()
            window.location.reload()// 刷新页面；
            return Promise.reject({message: '请重新登录'})
        }
        console.log('fetch:', res);
        const data = await res.json()
        if (res.ok) {
            console.log('data::', data);
            return data
        } else {
            return Promise.reject(data)
        }
        // axios和fetch对错误的表现不一样
        // axios可以直接返回状态不为2xx的异常
    })
}
// 想要在一个方法中使用hook，那么这个方法也必须是一个hook，所以要用hook再包裹一层http
export const useHttp= () => {
    const {user} = useAuth();
    // return ([endpoint, config]: [string, HttpConfig]) => http(endpoint, config)
    // TODO Parameters TS操作符讲解
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}
