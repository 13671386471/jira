import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import qs from 'qs';
import styled from '@emotion/styled'
import { SearchPanel } from "./search-panel"
import { ProjectList } from "./list"
import { clearnObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import { useAuth } from 'context/auth-context';
// import { logout } from 'auth-provider'; // 和从useAuth中导出的logout函数进行区分，为什么这个直接导入的函数不能触发登出
const apiUrl = process.env.REACT_APP_API_URL;
console.log('apiUrl:::', apiUrl);
export const ProjectScreen = () => {
    const ajax = useHttp();
    const [param ,setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);// 列表数据
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);
    const debounceValue = useDebounce(param, 600);
    const {logout} = useAuth()
    useEffect(() => {
        setIsLoading(true)
        ajax('projects', {
            data: clearnObject(param)
        })
        .then(setList)
        .catch((error) => {
            setError(error);
            setList([]);
        })
        .finally(() => setIsLoading(false));
        // fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(param))}`)
        // .then(async res => {
        //     console.log('res:projects', res);
        //     if(res.ok){
        //         // console.log('res:ok', res.json());
        //         setList(await res.json())
        //     }
            
        // })
    }, [debounceValue])// param发生变化时候请求列表数据，但是param是根据录入实时变化的，但是录入项目名称时候只需要录入完成后再出发即可，所以用debounceValue做为触发条件
    useMount(() => {
        // 页面初始化后请求人员信息
        setIsLoading(true)
        ajax('users')
        .then(setUsers)
        .finally(() => {
            setIsLoading(false)
        })
        // fetch(`${apiUrl}/users`)
        // .then(async res => {
        //     console.log('res:users', res);
        //     if(res.ok){
        //         // console.log('res:ok', res.json());
        //         setUsers(await res.json())
        //     }
            
        // })
    })
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel
                param={param}
                setParam={setParam}
                users={users}
            />
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <ProjectList 
                dataSource={list}
                loading={isLoading}
                users={users}
            />
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`