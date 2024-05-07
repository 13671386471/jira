import { useCallback,useReducer, useState } from "react"

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
    past: T[];
    present: T;
    future: T[];
}
type Action<T> = {
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
    newPresent?: T;
}


const undoReducer = <T>(state: State<T>, action: Action<T>) => {
    const { past, present, future } = state;
    const { type, newPresent } = action;
    switch (type) {
        case UNDO:
            if (past.length === 0) return state;
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        case REDO:
           if (future.length === 0) return state;
           const next = future[0];
           const newFuture = future.slice(1);
           return {
               past: [...past, present],
               present: next,
               future: newFuture
           }
        case SET:
            if(present === newPresent) return state;
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        case RESET:
            return {
                past: [],
                present: newPresent,
                future: []
            }
    }
    return state;
}

// useState 和 useReducer 在要实现的功能上是可以互换的
// useState适合用于定义单个状态，而useReducer适合定义多个状态，并相互影响
export const useUndo = <T,>(initialValue: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initialValue,
        future: [],
    } as State<T>)


    const canUndo = state.past.length > 0;
    const canRedo = state.future.length > 0;
// 在同一个hook中有很多状态，这几个状态呢又相互影响，那么应该把这几个状态合并到一起，这样就可以大大的降低hook的复杂程度
// 如果按照初始的方法写useCallback的话要依赖多个状态；
    const undo = useCallback(() => dispatch({type: UNDO}), []);

    const redo = useCallback(() => dispatch({type: REDO}), []);

    const set = useCallback((newPresent: T) => dispatch({type: SET, newPresent}), [])

    const reset = useCallback((newPresent: T) => dispatch({type: RESET, newPresent}), [])

    return [
        state,
        {set, undo, redo, canUndo, canRedo, reset}
    ]
}