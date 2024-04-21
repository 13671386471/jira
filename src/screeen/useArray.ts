import { useState } from "react";


export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue: (person: T) => {
            setValue([...value, {...person}])
        },
        clear: () => setValue([]),
        add: (item: T) => setValue([...value, item]),
        removeIndex: (index: number) => {
            const copy = [...value]
            copy.splice(index, 1)
            setValue(copy)
        },
    }
}




// # 为了验证类型继承和直接传递相同类型参数有什么区别，直接传递和继承类型一样的参数类型的话就会报错
interface Base {
    id: number
}
interface Person extends Base {
    name: string
}
const test = (param: Base) => {

}
const p: Person = {
    id: 1,
    name: 'liqkm'
}
// 类型兼容，因为Person是继承Base的，所以可以传递
test(p);// 不会报错
// // 但是ts的类型兼容是鸭子类型(duck typing); ts是面向接口编程，而不是面向对象编程(Java);
// // pp 虽然没有Person类型声明，但是pp还是和Person类型一样的接口，所以可以传递
const pp = {id: 1, name: 'li'};
test(pp);

// test({id: 1, name: 'li'});// 会报错，
