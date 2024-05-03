
import React, {useEffect} from 'react';
import { ProjectScreenList } from 'screeen/project-list';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';


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
    const {logout} = useAuth();
    return (
        <Container>
            <PageHeader>
                <PageHeaderLeft>
                    <span>logo</span>
                    <h1 style={{margin: 0}}>项目列表</h1>

                </PageHeaderLeft>
                <button onClick={logout}>
                    登出
                </button>
            </PageHeader>
            <Nav >Nav </Nav>
            <Main>
                <ProjectScreenList />
            </Main>
            <Aside >Aside</Aside>
            <Footer >Footer</Footer>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;// 意思是第一行占6rem，第二行占1fr(减去第一行第三行的高度后沾满)，第三行占6rem
    grid-template-columns: 20rem 1fr 20rem;// 意思是第一列占6rem，第二列占1fr(减去第一列第三列的宽度后沾满)，第三列占20rem
    grid-template-areas: 
        "header header header"
        "nav main aside"
        "footer footer footer";
    height: 100vh;
    /* grid-gap: 10rem; */
`
const PageHeader = styled.header`
    grid-area: header;
    background-color: gray;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const PageHeaderLeft = styled.div`
    display: flex;
    align-items: center;
`
const PageHeaderRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const Nav = styled.nav`
    grid-area: nav;
    background-color: #eee;
`
const Main = styled.main`
    grid-area: main;
    height: calc(100vh - 12rem);
    /* background-color: #eee; */
`
const Aside = styled.aside`
    grid-area: aside;
    background-color: #eee;
`
const Footer = styled.footer`
    grid-area: footer;
    background-color: #eee;
`
