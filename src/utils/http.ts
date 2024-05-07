
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
// TODO? 这里为什么要再包装一层呢？应为要通过useAuth的hook获取user信息，所以必须要在一个hook中调用
// 所以要再用hook包裹一层
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


// 类型操作符：
// 1、keyof 它用于从给定的对象类型中提取所有键（属性名）的联合类型
// interface PersonNew {
//     name: string;
//     age: number;
// }
// type PersonNewKey = keyof PersonNew; // PersonNewKey = 'name' | 'age'
// function getUer<T>(user: T, key: keyof T){
//     console.log('getUer:', user, key);
// }
// getUer({name: 'lihua', age: 22}, 'age');

// 2、typeof 在类型上下文中获取一个变量的类型
// let someValue = "hello";
// type SomeValueType = typeof someValue; // SomeValueType 类型为 string


// 3、索引类型查询与映射类型示例
// interface Animal {
//     name: string;
//     age: number;
// }
// 使用映射类型使所有属性变为可选的
// 映射类型 (mapped types): TypeScript允许你基于现有类型创建新的类型，通过遍历原始类型的每个属性并应用某种转换。
// 这通常与 keyof 和索引类型查询一起使用。例如，你可以创建一个类型，将所有属性从可选变为必需，或将它们的类型转换为 null
// type PartialAnimal = {
//     [P in keyof Animal]?: Animal[P]; 
//     // 遍历Animal的所有键P，然后为每个键创建一个可选属性，其类型保持不变
// };

//in 关键字示例（结合映射类型）
// interface Config {
//     theme: string;
//     version: number;
// }
// 使用 'in' 关键字遍历 Config 的键，并创建一个新的类型，其中每个键的值类型变为 string
// type StringifiedConfig = {
//     [K in keyof Config]: string;
// };
  
// const configExample: StringifiedConfig = {
//     theme: "dark",
//     version: "1.2", // 注意：原本version应为number，但此处被强制转换为string
// };