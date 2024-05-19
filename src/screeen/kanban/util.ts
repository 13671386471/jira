import { useLocation } from "react-router"
import { useProject } from "utils/project";


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

export const useTasksSearchParams = () => ({projectId: useProjectIdInUrl()})
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]