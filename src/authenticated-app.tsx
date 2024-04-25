
import React, {useEffect} from 'react';
import { ProjectScreen } from 'screeen/project-list';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';

export const AuthenticatedApp = () => {
    const {logout} = useAuth();
    return (
        <Container>
            <PageHeader>
                <button onClick={logout}>
                    退出12
                </button>
            </PageHeader>
            <Nav >Nav </Nav>
            <Main>
                <ProjectScreen />
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
`
const PageHeader = styled.header`
    grid-area: header;
    background-color: gray;
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
