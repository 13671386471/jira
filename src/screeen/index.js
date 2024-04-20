import { useEffect, useState } from 'react';
import qs from 'qs';
import { SearchPanel } from "./search-panel"
import { ProjectList } from "./project-list"
import { clearnObject } from "utils";
const apiUrl = process.env.REACT_APP_API_URL;
console.log('apiUrl:::', apiUrl);
export const ProjectScreen = () => {
    const [param ,setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);// 列表数据

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(param))}`)
        .then(async res => {
            console.log('res:projects', res);
            if(res.ok){
                // console.log('res:ok', res.json());
                setList(await res.json())
            }
            
        })
    }, [param])// param发生变化时候请求列表数据
    useEffect(() => {
        // 页面初始化后请求人员信息
        fetch(`${apiUrl}/users`)
        .then(async res => {
            console.log('res:users', res);
            if(res.ok){
                // console.log('res:ok', res.json());
                setUsers(await res.json())
            }
            
        })
    }, [])
    return (
        <div>
            <SearchPanel
                param={param}
                setParam={setParam}
                users={users}
            />
            <ProjectList 
                list={list}
                users={users}
            />
        </div>
    )
}