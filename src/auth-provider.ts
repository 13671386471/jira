
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
        } else {
            return Promise.reject(data)
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
            return Promise.reject(data)
        }
    })
}
export const logout = async () => window.localStorage.removeItem(localStorageKey)