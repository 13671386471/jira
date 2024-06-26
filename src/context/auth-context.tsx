
import React,  {createContext, useState, useContext} from 'react';
import {User} from 'screeen/project-list/search-panel';
import * as auth from 'auth-provider';
import {http} from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageLoading, FullPageErrorFallback } from 'components/lib';
import { useQueryClient } from 'react-query';

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
    // const [user, setUse]= useState<User | null>(null);
    const {run, isIdle,isLoading, isError, setData: setUse, data: user, error} = useAsync<User | null>();
    const queryClient = useQueryClient();

    const login = (form: AuthForm) => auth.login(form).then(user => setUse(user));
    const register = (form: AuthForm) => auth.register(form).then(setUse);// 上面(user => setUse(user))的简写
    const logout = () => auth.logout().then(() => {
        setUse(null);
        queryClient.clear();// 退出后把缓存清空，以免后续登陆的用户看到上一个用户的数据
    });// 因为auth.logout()是async 函数，返回的是Promise<void>，所以这里需要用then()
    useMount(() => {
        // bootstrapUser().then(user => setUse(user));
        run(bootstrapUser());
    })
    if(isIdle || isLoading){
        return <FullPageLoading />;
    }
    if(isError){
        return <FullPageErrorFallback error={error} />;
    }
    return <AuthContext.Provider value={{user, login, register, logout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    // console.log('AuthContext::',context, AuthContext);
    // constext 就是传入<AuthContext.Provider vlaue的对象{user, login, register, logout}
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用');
    }
    return context;
}