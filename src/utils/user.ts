import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { User } from "screeen/project-list/search-panel";

export const useUsers = () => {
    const ajax = useHttp();
    const {run, ...result}= useAsync<User[]>();
    useEffect(() => {
        run(
            ajax('users')
        )
    }, [])
    return result
}