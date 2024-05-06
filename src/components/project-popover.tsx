import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd"
import { useProject } from "utils/project"
import { ButtonNoPadding } from "./lib";



export const ProjectPopover = (props: {renderProjectBtn: JSX.Element}) => {
    const {data: projects, isLoading} = useProject({});
    const pinProject = projects?.filter(project => project.pin);
    const content = <ContentContainer>
       <Typography.Text type="secondary">收藏项目</Typography.Text>
       <List>
            {
                pinProject?.map(project => {
                    return <List.Item key={project.id}>
                        <List.Item.Meta title={project.name} />
                    </List.Item>
                })
            }
       </List>
       <Divider/>
       {
            props.renderProjectBtn
       }
    </ContentContainer>


    return <Popover placement="bottom" content={content}>
        
        <span>项目</span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 24rem;
`