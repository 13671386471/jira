import { Kanban } from "types/kanban"
import { useTasks } from "utils/task"
import { useKanbansQueryKey, useTaskModal, useTasksSearchParams } from "./util";
import { useTaskTypes } from "utils/task-type";
import taskIcon from 'assets/left.svg'
import bugIcon from 'assets/right.svg'
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, MenuProps, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "./mark";
import { useKanbanDelete } from "utils/kanban";
import { Row } from "components/lib";

const TaskTypeIcon = ({id}: {id: number}) => {
 
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find(taskType => taskType.id === id)?.name;

    if(!name){
        return null;
    }

    return <img style={{width: '1.6rem', height: '1.6rem'}} src={name==='task'? taskIcon: bugIcon} />
} 


export const KanbanColumn = ({kanban}: {kanban: Kanban}) => {
    const {data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);
    
    return <Container>
        <Row between={true}>
            <h2>{kanban.name}</h2>
            <More kanban={kanban} />
        </Row>
        
        <TasksContainer>
            {tasks?.map(task => <TaskCard key={task.id} task={task} />)}
            <CreateTask kanbanId={kanban.id}  />
        </TasksContainer>
    </Container>

}

const More = ({kanban}: {kanban: Kanban}) => {

    const { mutateAsync} = useKanbanDelete(useKanbansQueryKey());
    const startEdit = () => {
        Modal.confirm({
            title: '确认删除看板吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                return mutateAsync({id: kanban.id});
            }
        })
    }

    const overlay = <Menu>
        <Menu.Item>
            <Button type="link" onClick={startEdit} >删除</Button>
        </Menu.Item>
    </Menu> 

    const items: MenuProps['items'] = [
        {
            key: '1',
            label:  <Button type="link" onClick={startEdit} >删除</Button>,
        },
    ];
    return <Dropdown menu={{items}}>
        <Button type="link">...</Button>
    </Dropdown>
}

const TaskCard = ({task}: {task: Task}) => {
    const { startEdit } = useTaskModal();
    const {name: keyword} = useTasksSearchParams();
    return <Card 
        style={{marginBottom: '0.5rem', cursor: 'pointer'}} 
        onClick={() => startEdit(task.id)} 
        key={task.id}
    >
    {/* <div>{task.name}</div> */}
    <p><Mark name={task.name} keyword={keyword} /></p>
    <TaskTypeIcon id={task.typeId}/>
</Card>
}

export const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244, 245, 256);
    display: flex;
    flex-direction: column;
    box-shadow: rgb(0 0 0 / 20%) 0px 1px 4px -1px;
    padding: 0.5rem;
    margin-right: 1.5rem;
`
const TasksContainer = styled.div`
    overflow: scroll;
    flex: 1;
    padding: 0.5rem 1rem 1rem;
    ::-webkit-scrollbar {// 不出现滚动条
        display: none;
    }
`