import { useEffect, useState } from "react";
import { Project } from "screeen/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { clearnObject, useMount, useDebounce } from "utils";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectSearchParams } from "screeen/project-list/util";
import { useAddConfig, useConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { TaskType } from "types/task-type";


export const useTasks = (param?: Partial<Task>) => {
    const ajax = useHttp();
    return useQuery<Task[]>(
        ['tasks', param], 
        () => ajax('tasks', { data: param })  
    )
}

export const useTaskAdd = (queryKey: QueryKey) => {
    const ajax = useHttp();

    return useMutation(
        (params: Partial<Task>) => ajax(`tasks`, {
            method: 'POST',
            data: params
        }),
        useAddConfig(queryKey)
    )
}