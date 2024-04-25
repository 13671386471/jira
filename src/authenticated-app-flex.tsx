
import React, {useEffect} from 'react';
import { ProjectScreen } from 'screeen/project-list';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';

export const AuthenticatedApp = () => {
    const {logout} = useAuth();
    return (
        <div>
            <PageHeader>
                <button onClick={logout}>
                    退出
                </button>
            </PageHeader>
            <Main>
                <ProjectScreen />
            </Main>
           
        </div>
    )
}

const PageHeader = styled.div`
    height: 6rem;
    background-color: gray;
`
const Main = styled.div`
    height: calc(100vh - 6rem);
    /* background-color: #eee; */
`
