
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProject } from 'utils/project';
import { useSetUrlSearchParam, useUrlQueryParam } from 'utils/url';


export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId']);
    return [
        useMemo(() => ({
                ...param, personId: Number(param.personId) || undefined
            }), 
            [param]
        ),
        setParam
    ] as const
}

export const useProjectQueryKey = () => ['projects', useProjectSearchParams()[0]]

export const useProjectsModal = () => {
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam(['projectCreate']);
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId']);
    const {data: editingProject, isLoading} = useProject(Number(editingProjectId));
    const setSearchParam = useSetUrlSearchParam();

    const open = () => setProjectCreate({projectCreate: true});
    const close = () => setSearchParam({projectCreate: undefined, editingProjectId: undefined});
        
    // {
    //     setProjectCreate({projectCreate: undefined});
    //     setEditingProjectId({editingProjectId: undefined})
    // };
    const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})


    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId), 
        open,
        close,
        startEdit,
        isLoading,
        editingProject
    };
}