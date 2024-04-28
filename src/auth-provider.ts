
// 在真实的应用中，如果使用firebase 第三方auth服务的话，本文件不用自己开发，调用第三方的JDK就行
import { User } from "screeen/project-list/search-panel"
const apiUrl = process.env.REACT_APP_API_URL;


const localStorageKey = '__auth_provider__token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}: {user: User}) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = (data: {username: string, password: string}) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async res => {
        console.log('login>', res);
        if (res.ok) {
            return handleUserResponse(await res.json())
            //在使用 fetch 发起HTTP请求时，fetch 函数返回的是一个 Promise，
            // 这个 Promise 会在请求完成时解析为一个 Response 对象。
            // 这个 Response 对象代表了从服务器接收到的完整响应，
            // 包括但不限于HTTP状态码、响应头和响应体等信息。
            // 但需要注意的是，Response 对象本身并不直接包含可读的JSON数据或文本数据，
            // 这些数据实际上是存储在响应体（body）中。
            //当你需要从响应体中提取JSON格式的数据时，就需要使用 res.json() 方法。这个方法同样返回一个 Promise，该 Promise 解析后会得到一个JavaScript对象，这个对象是根据响应体中的JSON数据构建的。因此，你需要使用 await 关键字等待 res.json() 的完成，以便获取到实际的JSON数据。


        } else {
            return Promise.reject(await res.json())
        }
    })
}
export const register = (data: {username: string, password: string}) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async res => {
        console.log('register>', res);
        if (res.ok) {
            return handleUserResponse(await res.json())
        } else {
            return Promise.reject(await res.json())
        }
    })
}
export const logout = async () => {
    window.localStorage.removeItem(localStorageKey)
}