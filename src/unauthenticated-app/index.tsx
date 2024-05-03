import { useState } from 'react';
import {Helmet} from "react-helmet";
import { Button, Typography } from 'antd';
import { RegisterScreen } from './register';
import { Login } from './login';
import { Card, Divider } from 'antd';
import styled from '@emotion/styled';
import logo from '../assets/logo.svg';
import left from '../assets/left.svg';
import right from '../assets/right.svg';
import { useDocumentTitle } from 'utils';

export const UnAutnhenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    useDocumentTitle('请登录注册', false);
    return (
        <Wrapper>
            <Header />
            <Backgrounnd />
            <ShadowCard>
                <Title>
                    {
                        isRegister ? '请注册' : '请登陆'
                    }
                </Title>
                {
                    error? 
                    <Typography.Text type='danger'>{error.message}</Typography.Text>
                    :
                    null
                }
                {
                    isRegister ?
                        <RegisterScreen onError={setError} />
                        :
                        <Login onError={setError} />
                }
                <Divider />
                <a onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? '已经有账号了?直接登陆': '没有账号？注册新账号'}
                </a>
            </ShadowCard>
        </Wrapper>
        
    )
}
const Backgrounnd = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;//背景图不滚动
    background-position: left bottom, right bottom;
    background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover;
    background-image: url(${left}), url(${right}); //linear-gradient(180deg, #f8f8f8 0%, #f0f0f0 100%);
`
const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
// styled只能.原始html元素，antd的组件元素要像这样写法
const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.4rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    text-align: center;
`
const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`
const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94, 108, 132);
`

export const LongButton = styled(Button)`
    width: 100%;
`