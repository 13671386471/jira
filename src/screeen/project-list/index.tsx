import { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import qs from 'qs';
import styled from '@emotion/styled'
// import { Helmet } from 'react-helmet';
import { SearchPanel } from "./search-panel"
import { Project, ProjectList } from "./list"
import { ErrorBox, Row } from 'components/lib';
import { clearnObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import { useAuth } from 'context/auth-context';
import { useAsync } from 'utils/use-async';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
// import { logout } from 'auth-provider'; // 和从useAuth中导出的logout函数进行区分，为什么这个直接导入的函数不能触发登出
import { useDocumentTitle } from 'utils';
import { Test } from './test';
import { useSearchParams } from 'react-router-dom';
import { useUrlQueryParam } from 'utils/url';
import { useProjectSearchParams, useProjectsModal } from './util';
import { ButtonNoPadding } from 'components/lib';
const apiUrl = process.env.REACT_APP_API_URL;

console.log('apiUrl:::', apiUrl);
export const ProjectScreenList = () => {
    const { open } = useProjectsModal();
    const [param, setParam] = useProjectSearchParams();
    const debounceValue = useDebounce(param, 600);
    const {isLoading, error, data: list } = useProjects(debounceValue);
    const {data: users} = useUsers();
    useDocumentTitle('项目列表', false);
    console.log('searchParams:', param)
    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding 
                    type="link" 
                    onClick={() => open()}
                >
                    新建项目
                </ButtonNoPadding>
            </Row>
            
            <SearchPanel
                param={param}
                setParam={setParam}
                users={users || []}
            />
            <ErrorBox error={error} />
            <ProjectList
                dataSource={list || []}
                loading={isLoading}
                users={users || []}
            />
        </Container>
    )
}
ProjectScreenList.whyDidYouRender = true;
const Container = styled.div`
    padding: 3.2rem;
`