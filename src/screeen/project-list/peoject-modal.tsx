import { Button, Drawer } from "antd"
import { useProjects } from "utils/project"
import { useProjectsModal } from "./util"


export const ProjectModal = () => {
    const {projectModalOpen, close, editingProject, isLoading} = useProjectsModal();
    return <Drawer
        open={projectModalOpen} 
        onClose={() => {close()}}
        width={'100%'}
    >
        <h1>项目详情</h1>
        <Button onClick={() => close()}>关闭</Button>
    </Drawer>
}