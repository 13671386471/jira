import React, {useState} from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import { useKanbanSearchParams, useProjectInUrl } from './util';
import { KanbanColumn } from './kanban-column';
import styled from '@emotion/styled';


export const KanbanScreen = () => {

    useDocumentTitle('看板列表');
    const { data: currentProject} = useProjectInUrl();
    const { data: kanbans} = useKanbans(useKanbanSearchParams());
    return <div>
        <h1>{currentProject?.name}看板</h1>
        <ColuumnContainer>
            {
                kanbans?.map(kanban => {
                    return <KanbanColumn key={kanban.id} kanban={kanban} />
                })
            }
        </ColuumnContainer>
        
    </div> 


}

const ColuumnContainer = styled.div`
    display: flex;
    overflow: hidden;
    margin-right: 2rem;
`