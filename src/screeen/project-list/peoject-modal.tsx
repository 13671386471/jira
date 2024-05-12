import { Button, Drawer } from "antd"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { projectListActions, selectProjectModalOpen } from "store/reduceSlice/project-list-slice";
import { useProject } from "utils/project"


export const ProjectModal = () => {
    const dispatch = useDispatch();
    // useSelector 获取store中的状态数据的，再从store根状态树中获取对应切片(slice)的数据
    const projectModalOpen = useSelector(selectProjectModalOpen);
    return <Drawer
        open={projectModalOpen} 
        onClose={() => {dispatch(projectListActions.closeProjectModal())}}
        width={'100%'}
    >
        <h1>项目详情</h1>
        <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
}