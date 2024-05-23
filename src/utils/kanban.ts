import { useEffect, useState } from "react";
import { Project } from "screeen/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { clearnObject, useMount, useDebounce } from "utils";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectSearchParams } from "screeen/project-list/util";
import { useAddConfig, useConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";
import { Kanban } from "types/kanban";


export const useKanbans = (param?: Partial<Kanban>) => {
    const ajax = useHttp();
    return useQuery<Kanban[]>(
        ['kanbans', param], 
        () => ajax('kanbans', { data: param })  
    )
}


export const useKanbanAdd = (queryKey: QueryKey) => {
    const ajax = useHttp();

    return useMutation(
        (params: Partial<Kanban>) => ajax(`kanbans`, {
            method: 'POST',
            data: params
        }),
        useAddConfig(queryKey)
    )
}

export const useKanbanDelete = (queryKey: QueryKey) => {
    const ajax = useHttp();

    return useMutation(
        // 和 useDeleteConfig 中的target是对应的
        ({id}: {id: number}) => ajax(`kanbans/${id}`, {
            method: 'DELETE',
        }),
        useDeleteConfig(queryKey)
    )
}