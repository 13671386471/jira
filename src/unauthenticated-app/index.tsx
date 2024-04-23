import { useState } from 'react';
import { RegisterScreen } from './register';
import { Login } from './login';
import { Card } from 'antd';

export const UnAutnhenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <div 
            style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100%'
            }}
        >
            <Card>
                {
                    isRegister ?
                        <RegisterScreen />
                        :
                        <Login />
                }

                <button onClick={() => setIsRegister(!isRegister)}>
                    切换到 {isRegister ? '登陆' : '注册'}
                </button>
            </Card>
        </div>
        
    )
}