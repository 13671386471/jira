import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import {Link, useParams} from 'react-router-dom'


export const ProjectScreen = () => {
    const {id} = useParams<{id: string}>()
    // const {data: currentProject} = useProjects(Number(id))
    return (
        <div>
            <h1>{'Projectscreen'}</h1>
            {/* to的内容如果加上/的话就是指定跳转到根路由了 */}
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务组</Link>
            <Routes>
                <Route path={'/kanban'} element={<div>kanban</div>}></Route>
                <Route path={'/epic'} element={<div>epic</div>}></Route>
                <Route path="*" element={<Navigate to={'kanban'} />} />
                {/* <Navigate to={window.location.pathname + '/kanban'}></Navigate> */}
            </Routes>
        </div>
    )
}