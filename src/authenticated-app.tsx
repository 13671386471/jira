
import React, {useEffect} from 'react';
import { Button, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { ProjectScreen } from 'screeen/project-list';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
// import softLogo from 'assets/software-logo.svg';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';


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
    const {logout, user} = useAuth();

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a onClick={logout}>
              登出
            </a>
          ),
          icon: <SmileOutlined />,
        }
      ];
    return (
        <Container>
            <PageHeader between={true}>
                <PageHeaderLeft gap={3}>
                    {/* <img src={softLogo} /> 用svg格式展示图片 */}
                    <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
                    <h1>项目列表</h1>
                    <h1>用户</h1>
                </PageHeaderLeft>
                <PageHeaderRight>
                    <Dropdown 
                        menu={{items}}
                    >
                        <a>
                            hi {user?.name}
                            <DownOutlined />
                        </a>
                        
                    </Dropdown>
                </PageHeaderRight>
               
            </PageHeader>
            <Main>
                <ProjectScreen />
            </Main>
        </Container>
    )
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