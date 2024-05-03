import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import qs from 'qs';
import styled from '@emotion/styled'
// import { Helmet } from 'react-helmet';
import { SearchPanel } from "./search-panel"
import { Project, ProjectList } from "./list"
import { clearnObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import { useAuth } from 'context/auth-context';
import { useAsync } from 'utils/use-async';
import { useProject } from 'utils/project';
import { useUsers } from 'utils/user';
// import { logout } from 'auth-provider'; // 和从useAuth中导出的logout函数进行区分，为什么这个直接导入的函数不能触发登出
import { useDocumentTitle } from 'utils';
import { Test } from './test';
const apiUrl = process.env.REACT_APP_API_URL;

console.log('apiUrl:::', apiUrl);
export const ProjectScreen = () => {
    const [param ,setParam] = useState({
        name: '',
        personId: ''
    })
    const debounceValue = useDebounce(param, 600);

    const {isLoading, error, data: list } = useProject(debounceValue);
    const {data: users} = useUsers();
    useDocumentTitle('项目列表', false);
    return (
        <Container>
            <h1>项目列表</h1>
            <Test />
            <SearchPanel
                param={param}
                setParam={setParam}
                users={users || []}
            />
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <ProjectList 
                dataSource={list || []}
                loading={isLoading}
                users={users || []}
            />
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`