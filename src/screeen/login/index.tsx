

import React, {useState} from 'react'
const apiUrl = process.env.REACT_APP_API_URL;
export const Login = () => {

    const login = ( username: string, password: string ) => {
        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }).then(async res => {
            console.log('res:login1',res);
            if(res.ok){
                console.log('res:login2',);
                
            }
            
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        console.log(username, password)
        login(username, password);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">用户名</label>
                    <input type="text" id='username'/>
                </div>
                <div>
                    <label htmlFor="password">密码</label>
                    <input type="password" id='password'/>
                </div>
                <button type='submit'>登录</button>
            </form>
        </div>
    )
}