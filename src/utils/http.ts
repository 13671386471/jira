
import qs from 'qs';
import {logout} from '../auth-provider';
import { useAuth } from '../context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL;

interface HttpConfig extends RequestInit{
    data?: object,
    token?: string,
}

export const http = (
    endpoint: string, 
    {data, token, ...customConfig}: HttpConfig = {}
) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig,
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    }else {
        config.body = JSON.stringify(data || {});
    }

    return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async res => {
        if (res.status === 401) {
            await logout()
            window.location.reload()// 刷新页面；
            return Promise.reject({message: '请重新登录'})
        }
        console.log('fetch:', res);
        const data = await res.json()
        if (res.ok) {
            console.log('data::', data);
            return data
        } else {
            return Promise.reject(data)
        }
        // axios和fetch对错误的表现不一样
        // axios可以直接返回状态不为2xx的异常
    })
}
// 想要在一个方法中使用hook，那么这个方法也必须是一个hook，所以要用hook再包裹一层http
export const useHttp= () => {
    const {user} = useAuth();
    // return ([endpoint, config]: [string, HttpConfig]) => http(endpoint, config)
    // TODO Parameters TS操作符讲解 --- utility Types

    // typeof http 中的typeof是ts中的类型操作符，用来获取一个函数的参数类型
    // typeof 1 === 'number' 是在运行时执行的；
    // ts中的typeof是在静态时候执行的(即编写代码时)，并且执行时候是没有这些代码的
    // utility Types 的用法：用泛型给他传入其他类型，然后utility Types可以这些类型进行对应的操作
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}

type Person={
    name: string;
    age: number;
}
const per: Partial<Person> = {age: 12}
const shenmiren: Omit<Person, 'name'> = {age: 12}
const shenmiren2: Omit<Person, 'name'|'age'> = {123: '123'}

// keyof 是把一个对象类型的键值取出来，然后把他们联合在一起组成联合类型
type perKey = keyof Person;//  'name' | 'age'
type PersonOnlyName = Pick<Person, 'name'>;// Pick操作的作用是取出【对象类型】的某个属性
type Age = Exclude<perKey, 'name'>// Exclude操作的作用是排除掉【联合类型】中的某个类型

// ts的作用就是一个类型约束系统

// 联合类型
let param: number | string;
param=1;
param='sring'

// 如果多个变量类型都是 number | string，
// 那么可以写成【类型别名】 type classAll= number | string
// type classAll = number | string;
// let params: classAll = 1;


// // 类型别名和接口interface很像
// interface Person {
//     name: string;
//     age: number;
// }
// let xiaoming: Person = {
//     name: 'xiaoming',
//     age: 18
// }
// // 用类型别名也能实现上面的效果
// type Person2 = {
//     name: string;
//     age: number;
// }
// let xiaohua: Person2 = {
//     name: 'xiaohua',
//     age: 18
// }

// 类型别名很多情况下可以和interface互换的；
// 类型别名和接口的区别：
// 1. 【类型别名】可以重复定义；2. 【】类型别名不能继承；
// 3、interface不能像类型别名那样定义联合类型、交叉类型；
// 4、interface没法实现utility Types; type可以；Partial<T> Parameters<>