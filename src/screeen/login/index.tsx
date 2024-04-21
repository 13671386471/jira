

import { useAuth } from 'context/auth-context';
import React, {useState} from 'react'
const apiUrl = process.env.REACT_APP_API_URL;
export const Login = () => {
    const {login, user} = useAuth();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        console.log(username, password)
        login({username, password});
    }

    return (
        <div>
            <div>
                {
                    user
                    ?
                    <div>{user?.name},token: {user?.token}已登陆</div>
                    :
                    '请登陆'
                }
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">用户名</label>
                    <input type="text" id='username'/>
                </div>
                <div>
                    <label htmlFor="password">密码</label>
                    <input type="password" id='password'/>
                </div>
                <button type='submit'>登陆</button>
            </form>
        </div>
    )
}