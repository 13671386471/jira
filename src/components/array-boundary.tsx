import React from 'react';


type fallbackRender = (props: {error: Error | null}) => React.ReactNode;
// 第一个泛型指的是错误边界组件的props类型，即使用这个组件时候要传递过来的参数React.Component<{children: React.ReactNode, fallbackRender: fallbackRender}, {hasError: boolean}> 
// 第二个参数是指组件内定义的state变量
// 但是可以用如下简便写法
export class ErrorBoundary extends React.Component<
    React.PropsWithChildren<{fallbackRender: fallbackRender}>, 
    {error: Error | null}
> {
    state = {error: null, abc: 1}
    
    // 当自组件抛出异常的时候会触发这个方法
    static getDerivedStateFromError(error: Error) {
        // derived 衍生
        return {error: error}// 返回的这个值就会更新到state中
    }
    render() {
        const { fallbackRender, children } = this.props;
        if (this.state.error) {
            return fallbackRender({error: this.state.error});
        }
        return children
    }
}