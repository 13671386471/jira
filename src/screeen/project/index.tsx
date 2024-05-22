import styled from '@emotion/styled';
import { Menu } from 'antd';
import { ScreenContainer } from 'components/lib';
import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import {Link, useParams} from 'react-router-dom'

import { KanbanScreen } from 'screeen/kanban';

const useRouteType = () => {
    const units = useLocation().pathname.split('/')
    console.log('units:::',useLocation(), useLocation().pathname, units)
    return units[units.length - 1]
}

export const ProjectScreen = () => {
    const routeType = useRouteType();
    const {id} = useParams<{id: string}>()
    // const {data: currentProject} = useProjects(Number(id))
    return (
        <Container>
            <Aside>
                {/* 加上mode={'inline'}后菜单会占满左边区域 */}
                <Menu mode={'inline'} selectedKeys={[routeType]}>
                    <Menu.Item key={'kanban'}>
                        {/* to的内容如果加上/的话就是指定跳转到根路由了 */}
                        <Link to={'kanban'}>看板</Link>
                    </Menu.Item>
                    <Menu.Item key={'epic'}>
                        <Link to={'epic'}>任务组</Link>
                    </Menu.Item>
                </Menu>
                
                
            </Aside>
            <Main>
                <Routes>
                    <Route path={'/kanban'} element={<KanbanScreen />}></Route>
                    {/* <Route path={'/kanban'} element={<div>kanban</div>}></Route> */}
                    <Route path={'/epic'} element={<div>epic</div>}></Route>
                    <Route path="*" element={<Navigate to={'kanban'} replace={true} />} />
                </Routes>
            </Main>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;// 左边16rem,右边占满剩余空间
   
`

const Aside = styled.aside`
    display: flex;
    overflow: hidden;
    background-color: rgb(244, 245, 247);
`

const Main = styled.div`
    box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
    display: flex;
    overflow: hidden;
`