import { useEffect, useState } from "react";
import { useMount } from "utils";

export const Test = () => {

    const [num, setNum] = useState(0);


    useMount(() => {
        
        setInterval(() => {
            console.log('num in setInterval:', num);
        }, 1000)
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