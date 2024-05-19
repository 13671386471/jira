import { useMemo } from "react";
import { useLocation } from "react-router"
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";


export const useProjectIdInUrl = () => {
  const {pathname} = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id)

//   let pathname = 'www.baidu.com/projects/123/kanban';
//   pathname.match(/projects\/(\d+)/)
//   ['projects/123', '123', index: 14, input: 'www.baidu.com/projects/123/kanban', groups: undefined]
}


export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => {
   const [param, setParam] = useUrlQueryParam([
        'name', 
        'typeId',
        'processorId',
        'tagId'
    ]);
//    return {projectId: useProjectIdInUrl()};
    const projectId = useProjectIdInUrl();
    return useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name,
    }), [projectId, param])
}
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]