import { useEffect, useState } from "react";
import { Project } from "screeen/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { clearnObject, useMount, useDebounce } from "utils";

export const useProject = (param: Partial<Project>) => {
    const ajax = useHttp();
    const { run, ...result } = useAsync<Project[]>();
    useEffect(() => {
        run(
            ajax('projects', {
                data: clearnObject(param)
            })
        )
    }, [param])// param发生变化时候请求列表数据，但是param是根据录入实时变化的，但是录入项目名称时候只需要录入完成后再出发即可，所以用debounceValue做为触发条件

    return result
}