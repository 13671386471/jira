import { useEffect, useState } from "react";
import { useMount } from "utils";


const test = () => {
    let num = 0;

    const effect = () => {
        num += 1;
        const message = `num is ${num}`
        return function unmount() {
            console.log('clean up:', message);
        }
    }
    return effect;
}
// 执行test函数, 返回effect
const add = test();

// 执行effect函数，返回引用message1 的 unmount函数,此时形成一个闭包
const unmount = add();

//  执行effect函数，返回引用message2 的 unmount函数,此时又形成一个新闭包
const numount2 = add();

//  执行effect函数，返回引用message3 的 unmount函数,此时再形成一个新闭包
const numount3 = add();

// unmount();
// numount2()
// numount3()



export const Test = () => {

    const [num, setNum] = useState(0);


    useMount(() => {
        
        // setInterval(() => {
        //     console.log('num in setInterval:', num);
        // }, 1000)
    })
    useEffect(() => {
        return () => {
            console.log('nue:', num);
        }
    }, [])

    return (
        <div>
            num:{ num }
            <button onClick={() => setNum(num + 1)}>+1</button>
        </div>
    )
}