import { useEffect, useState } from "react";
import { Project } from "screeen/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { clearnObject, useMount, useDebounce } from "utils";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectSearchParams } from "screeen/project-list/util";
import { useAddConfig, useConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";
import { Kanban } from "types/kanban";

export const useProjects = (param: Partial<Project>) => {
    const ajax = useHttp();
    return useQuery<Project[]>(['projects', param], () => ajax('projects', { data: param })  )
}

export const useProjectEdit = (queryKey: QueryKey) => {
    const ajax = useHttp();
    return useMutation(
        (params: Partial<Project>) => 
            ajax(`projects/${params.id}`,{
                method: 'PATCH',
                data: params
            }
        ),
        useEditConfig(queryKey)
    )
}

export const useProjectAdd = (queryKey: QueryKey) => {
    const ajax = useHttp();

    return useMutation(
        (params: Partial<Project>) => ajax(`projects`, {
            method: 'POST',
            data: params
        }),
        useAddConfig(queryKey)
    )
}

export const useProjectDelete = (queryKey: QueryKey) => {
    const ajax = useHttp();

    return useMutation(
        // 和 useDeleteConfig 中的target是对应的
        ({id}: {id: number}) => ajax(`projects/${id}`, {
            method: 'DELETE',
        }),
        useDeleteConfig(queryKey)
    )
}


export const useProject= (id?: number) => {

    const ajax = useHttp();
    return useQuery<Project>(
        ['project', 
        {id}], 
        () => ajax(`projects/${id}`), 
        {
            enabled: !!id
        }
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