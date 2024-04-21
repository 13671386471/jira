import { useState } from 'react';
import { RegisterScreen } from './register';
import { Login } from './login';

export const UnAutnhenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <div>
            {
                isRegister?
                <RegisterScreen />
                :
                <Login />
            }

            <button onClick={() => setIsRegister(!isRegister)}>
                切换到 {isRegister ? '登陆': '注册'}
            </button>
        </div>
    )
}