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