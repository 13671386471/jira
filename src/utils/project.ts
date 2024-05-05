import { useEffect, useState } from "react";
import { Project } from "screeen/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { clearnObject, useMount, useDebounce } from "utils";

export const useProject = (param: Partial<Project>) => {
    const ajax = useHttp();
    const { run, ...result } = useAsync<Project[]>();
    const fetchProject = () => ajax('projects', { data: clearnObject(param)})
    useEffect(() => {
        run(fetchProject(), {retry: fetchProject})
        // 视频的react版本中这里ESlint提示要依赖run, 因为useEffect用到了就要依赖run，当run更新的话就重新执行useEffect并且用最新的run方法
        // 但是现在最新的react版本中，useEffect中不依赖run，ESlint也不报错了
    }, [param])// param发生变化时候请求列表数据，但是param是根据录入实时变化的，但是录入项目名称时候只需要录入完成后再出发即可，所以用debounceValue做为触发条件

    return result
}

export const useProjectEdit = () => {
    const { run, ...asyncResult } = useAsync();
    const ajax = useHttp();

    const mutate = (params: Partial<Project>) => {
        return run(ajax(`projects/${params.id}`, {
            method: 'PATCH',
            data: params
        }))
    }

    return {
        mutate,
        ...asyncResult
    }
}

export const useProjectAdd = () => {
    const { run, ...asyncResult } = useAsync();
    const ajax = useHttp();

    const mutate = (params: Partial<Project>) => {
        return run(ajax(`projects/${params.id}`, {
            method: 'POST',
            data: params
        }))
    }

    return {
        mutate,
        ...asyncResult
    }
}