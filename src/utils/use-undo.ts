import { useCallback, useState } from "react"

export const useUndo = <T,>(initialValue: T) => {

    // const [past, setPast] = useState<T[]>([]);
    // const [present, setPresent] = useState(initialValue);
    // const [future, setFuture] = useState<T[]>([]);

    const [ state, setState ]= useState<{
        past: T[],
        present: T,
        future: T[]}
    >({
        past: [],
        present: initialValue,
        future: []
    })
    // 或者采用如下的写法
    // const [ newstate, setNewstate ]= useState({
    //     past: [] as T[],
    //     present: initialValue as T,
    //     future: [] as T[]
    // })

    const canUndo = state.past.length > 0;
    const canRedo = state.future.length > 0;
// 在同一个hook中有很多状态，这几个状态呢又相互影响，那么应该把这几个状态合并到一起，这样就可以大大的降低hook的复杂程度
// 如果按照初始的方法写useCallback的话要依赖多个状态；
    const undo = useCallback(() => {

        setState(currnetState => {
            const {past, present, future} = currnetState;
            if(past.length === 0) return currnetState;

            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        })
        // if (!canUndo) return;
        // const previous = past[past.length - 1];
        // const newPast = past.slice(0, past.length - 1);
        // setPast(newPast);
        // setPresent(previous);
        // setFuture([present, ...future]);
    }, []);

    const redo = useCallback(() => {
        setState(currnetState => {
            const {past, present, future} = currnetState;
            if(future.length === 0) return currnetState;

            const next = future[0];
            const newFuture = future.slice(1);
            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        })
        // if (!canRedo) return;
        // const next = future[0];
        // const newFuture = future.slice(1);
        // setPast([...past, present]);
        // setPresent(next);
        // setFuture(newFuture);
    }, []);
    const set = useCallback((value: T) => {

        setState(currnetState => {
            const {past, present, future} = currnetState;
            if(present === value) return currnetState;
            return {
                past: [...past, present],
                present: value,
                future: []
            }
        })
        // setPast([...past, present]);
        // setPresent(value);
        // setFuture([]);
    }, [])
    const reset = useCallback((newPresent: T) => {

        setState(currnetState => {
            const {past, present, future} = currnetState;
            return {
                past: [],
                present: newPresent,
                future: []
            }
        })
        // setPast([]);
        // setPresent(newPresent);
        // setFuture([]);
    }, [])

    return [
        state,
        {set, undo, redo, canUndo, canRedo, reset}
    ]
}