import React, {useState} from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import { useKanbanSearchParams, useProjectInUrl, useTaskModal, useTasksSearchParams } from './util';
import { KanbanColumn } from './kanban-column';
import styled from '@emotion/styled';
import { SearchPanel } from './search-panel';
import { ScreenContainer } from 'components/lib';
import { useTasks } from 'utils/task';
import { Spin } from 'antd';
import { CreateKanban } from './create-kanban';
import { TaskModal } from './task-modal';


export const KanbanScreen = () => {

    useDocumentTitle('看板列表');
    const { data: currentProject} = useProjectInUrl();
    const { data: kanbans, isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams());
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
    const loading = kanbanIsLoading || taskIsLoading;
    return <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {
            loading
            ? <Spin size='large' />
            :
            <ColumnContainer>
                {
                    kanbans?.map(kanban => {
                        return <KanbanColumn key={kanban.id} kanban={kanban} />
                    })
                }
                <CreateKanban />
            </ColumnContainer>
        }
        
        <TaskModal />
    </ScreenContainer> 


}

export const ColumnContainer = styled.div`
    display: flex;
    flex: 1;// 占满剩余空间
    overflow-x: scroll;
`