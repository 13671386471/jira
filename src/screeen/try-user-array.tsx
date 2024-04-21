
import React, {useState} from 'react';

import { useArray } from './useArray';
import { useMount } from 'utils';

export const TryUserArray = () => {
    const persons: {name: string; age: number;}[] =[
        {name: 'jack', age: 18},
        {name: 'tom', age: 20},
    ]
    const {
        value: values, 
        setValue: addVal, 
        removeIndex: removeVal, 
        clear: clearnVal
    } = useArray(persons);
    useMount(() => {
        console.log(values);
        // addVal({name: 'haha'});
    })
    return (
        <div>
            <button onClick={() => addVal({name: 'liqkm', age: 32})}> add </button>
            <button onClick={() => removeVal(0)}> remove 0 </button>
            <button onClick={() => clearnVal()}> clearn </button>

            <ol>
                {values.map((v, i) => (
                    <li key={i}>
                        {v.name}, {v.age}
                    </li>
                ))}
            </ol>
        </div>
    )
}