
import React, {useEffect, useState} from 'react';
import { Button, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { ProjectScreenList } from 'screeen/project-list';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';
import { ButtonNoPadding, Row } from 'components/lib';
// import softLogo from 'assets/software-logo.svg';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import { resetRoute } from 'utils';
import { ProjectScreen } from 'screeen/project';
import { ProjectModal } from 'screeen/project-list/peoject-modal';
import { ProjectPopover } from 'components/project-popover';


/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

export const AuthenticatedApp = () => {
    const [projectModalOpen, setProjectModalOpen]= useState(false); 
    return (
        <Container>
            <PageHeaderCom 
                // setProjectModalOpen={setProjectModalOpen}
                renderProjectBtn = {
                    <ButtonNoPadding 
                        type="link" 
                        onClick={() => setProjectModalOpen(true)}
                    >
                        新建项目
                    </ButtonNoPadding>
                }
            />
            <Main>
                {/* <ProjectScreenList /> */}
                <Router>
                    <Routes>
                        {/* <Route path={'/projects'} element={<Navigate to={'/projects/list'} />} /> */}{/**默认写法*/}
                        {/* <Route index element={<ProjectScreenList />}></Route> */}
                        <Route 
                            path={'/projects'} 
                            element={<ProjectScreenList renderProjectBtn = {
                                <ButtonNoPadding 
                                    type="link" 
                                    onClick={() => setProjectModalOpen(true)}
                                >
                                    新建项目
                                </ButtonNoPadding>
                            } />} 
                        />
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                        <Route path="*" element={<Navigate to={'/projects'} />} />
                        {/* <Navigate to={'/projects'} /> */}
                    </Routes>
                </Router>
            </Main>
            <ProjectModal
                projectModalOpen={projectModalOpen} 
                onClose={() => setProjectModalOpen(false)} 
            />
        </Container>
    )
}

const PageHeaderCom = (props: {renderProjectBtn: JSX.Element}) => {
    const {logout, user} = useAuth();
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Button type="link" onClick={logout}>
              登出
            </Button>
          ),
          icon: <SmileOutlined />,
        }
      ];
    return <PageHeader between={true}>
    <PageHeaderLeft gap={3}>
        {/* <img src={softLogo} /> 用svg格式展示图片 */}
        <ButtonNoPadding style={{padding: 0}} type='link' onClick={resetRoute}>
            <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
        </ButtonNoPadding>
        
        <ProjectPopover 
            {...props}
        />
        <span>用户</span>
    </PageHeaderLeft>
    <PageHeaderRight>
        <Dropdown 
            menu={{items}}
        >
            <Button type="link">
                hi~ {user?.name}
                <DownOutlined />
            </Button>
            
        </Dropdown>
    </PageHeaderRight>
   
</PageHeader>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;// 意思是第一行占6rem，第二行占1fr(减去第一行的高度后沾满)
    height: 100vh;
`
const PageHeader = styled(Row)`
    padding: 3.2rem;
`

const PageHeaderLeft = styled(Row)``
const PageHeaderRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const Main = styled.main`
    /* grid-area: main; // 可以把这里打开看看效果
    height: calc(100vh - 6rem); */
    /* background-color: #eee; */
`