import { Kanban } from "types/kanban"
import { useTasks } from "utils/task"
import { useTasksSearchParams } from "./util";
import { useTaskTypes } from "utils/task-type";
import taskIcon from 'assets/left.svg'
import bugIcon from 'assets/right.svg'
import styled from "@emotion/styled";
import { Card } from "antd";
import { CreateTask } from "./create-task";

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
        <h2>{kanban.name}</h2>
        <TasksContainer>
            {tasks?.map(task => <Card key={task.id}>
                <div>{task.name}</div>
                <TaskTypeIcon id={task.typeId}/>
            </Card>)}
            <CreateTask kanbanId={kanban.id}  />
        </TasksContainer>
    </Container>

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