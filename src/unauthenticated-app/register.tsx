

import { Button, Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import React, {useState} from 'react'
const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = () => {
    const {register, user} = useAuth();
    
    const handleSubmit = (formValues: {username: string, password: string}) => {
        console.log('handleSubmit:', formValues)
        register(formValues);
    }
    return (
        <div>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ]}
                >
                    <Input type="text" id='username'/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                >
                    <Input type="password" id='password'/>
                </Form.Item>
                <Form.Item>
                    <Button  htmlType='submit' type='primary' >注册</Button>
                </Form.Item>
            </Form>
        </div>
    )
}