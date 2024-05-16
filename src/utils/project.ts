import { useEffect, useState } from "react";
import { Project } from "screeen/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { clearnObject, useMount, useDebounce } from "utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param: Partial<Project>) => {
    const ajax = useHttp();
    return useQuery<Project[]>(['projects', param], () => ajax('projects', { data: param })  )
}

export const useProjectEdit = () => {
    const ajax = useHttp();
    const queryClient = useQueryClient();
    return useMutation((params: Partial<Project>) => ajax(`projects/`, {
        method: 'PATCH',
        data: params
    }), {
        onSuccess: () => queryClient.invalidateQueries('projects')
    })
}

export const useProjectAdd = () => {
    const ajax = useHttp();
    const queryClient = useQueryClient();

    return useMutation(
        (params: Partial<Project>) => ajax(`projects`, {
            method: 'POST',
            data: params
        }),
        {
            onSuccess: () => queryClient.invalidateQueries('projects')
        }
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