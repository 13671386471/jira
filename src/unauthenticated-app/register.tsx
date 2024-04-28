

import { Button, Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import React, {useState} from 'react'
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';
const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = ({onError}: {onError: (error: Error)=>void}) => {
    const {register, user} = useAuth();
    const {run, isLoading , error} = useAsync(undefined, {throwOnError: true});
    
    const handleSubmit = async (formValues: {username: string, password: string, cpassword: string}) => {
        let {cpassword, ...values} = formValues;
        if(cpassword != values.password){
            onError(new Error('两次密码不一致'));
            return;
        }
        console.log('handleSubmit:', formValues)
        try{
            await run(register(formValues));
        }catch(e){
            onError(e as Error);
        }
        
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
                <Form.Item
                    name="cpassword"
                    label="确认密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入确认密码',
                        },
                    ]}
                >
                    <Input type="password" id='cpassword'/>
                </Form.Item>
                <Form.Item>
                    <LongButton loading={isLoading}  htmlType='submit' type='primary' >注册</LongButton>
                </Form.Item>
            </Form>
        </div>
    )
}