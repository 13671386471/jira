
import React,  {createContext, useState, useContext} from 'react';
import {User} from 'screeen/project-list/search-panel';
import * as auth from 'auth-provider';
import {http} from 'utils/http';
import { useMount } from 'utils';

interface AuthForm {
    username: string;
    password: string;
}

interface AuthContextProps {
    user: User | null;
    login: (form: AuthForm) => Promise<void>;
    register: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
}

// 解决登陆后刷新时，又到了登陆页面；需要重新获取用户信息
const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http('me', {token});
        user = data.user;
    }
    return user;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUse]= useState<User | null>(null);
    const login = (form: AuthForm) => auth.login(form).then(user => setUse(user));
    const register = (form: AuthForm) => auth.register(form).then(setUse);// 上面(user => setUse(user))的简写
    const logout = () => auth.logout().then(() => setUse(null));// 因为auth.logout()是async 函数，返回的是Promise<void>，所以这里需要用then()
    useMount(() => {
        bootstrapUser().then(user => setUse(user));
    })
    return <AuthContext.Provider value={{user, login, register, logout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log('AuthContext::',context, AuthContext);
    // constext 就是传入<AuthContext.Provider vlaue的对象{user, login, register, logout}
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用');
    }
    return context;
}