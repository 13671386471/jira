
import React,  {createContext, useState, useContext, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {User} from 'screeen/project-list/search-panel';
import * as auth from 'auth-provider';
import {http} from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageLoading, FullPageErrorFallback } from 'components/lib';
import * as authStore from 'store/reduceSlice/auth-slice';
import { AppDispatch } from 'store';

export interface AuthForm {
    username: string;
    password: string;
}


// 解决登陆后刷新时，又到了登陆页面；需要重新获取用户信息
export const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http('me', {token});
        user = data.user;
    }
    return user;
}


export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    // const [user, setUse]= useState<User | null>(null);
    const {run, isIdle,isLoading, isError, error} = useAsync<User | null>();
    const dispatch = useDispatch<AppDispatch>();

    useMount(() => {
        // bootstrapUser().then(user => setUse(user));
        run(bootstrapUser());
        // TODO 为什么这里写成这样就报错呢？
        // run(dispatch(authStore.bootstrap()));
    })
    if(isIdle || isLoading){
        return <FullPageLoading />;
    }
    if(isError){
        return <FullPageErrorFallback error={error} />;
    }
    return <div>{children}</div>;
}

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector(authStore.selectUser);
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]);
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch]);
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
    return {
        user,
        login,
        register,
        logout
    };
}