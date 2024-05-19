import { useHttp } from "./http";
import { useQuery } from "react-query";
import { TaskType } from "types/task-type";



export const useTaskTypes = () => {
    const ajax = useHttp();
    return useQuery<TaskType[]>(
        ['taskTypes'], 
        () => ajax('taskTypes')  
    )
}