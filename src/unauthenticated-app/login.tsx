

import { useAuth } from 'context/auth-context';
import React, {useState} from 'react'
import { Button, Form, Input } from 'antd';
const apiUrl = process.env.REACT_APP_API_URL;
export const Login = () => {
    const {login, user} = useAuth();
    
    const handleSubmit = (formValues: { username: string, password: string }) => {
        console.log('login:', formValues);
        login(formValues);
    }

    return (
        <div>
            <Form 
                layout='horizontal'
                onFinish={handleSubmit}
            >
                <Form.Item
                    name='username'
                    label='用户名'
                    rules={[
                        {required: true, message: '请输入用户名'}
                    ]}
                    // labelCol={{ flex: '16' }}
                    // wrapperCol={{ flex: 2 }}
                >
                    <Input type="text" id='username'/>
                </Form.Item>
                <Form.Item
                    name={'password'}
                    label='密码'
                    rules={[
                        {required: true, message: '请输入密码'}
                    ]}
                    // labelCol={{ flex: '16' }}
                    // wrapperCol={{ flex: 2 }}
                >
                    <Input type="password" id='password'/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>登陆</Button>
                </Form.Item>
            </Form>
        </div>
    )
}