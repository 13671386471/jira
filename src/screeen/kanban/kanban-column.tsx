import { Kanban } from "types/kanban"
import { useTasks } from "utils/task"
import { useTasksSearchParams } from "./util";





export const KanbanColumn = ({kanban}: {kanban: Kanban}) => {
    const {data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);

    return <div className="kanban-column">
        <h2>{kanban.name}</h2>
        {
            tasks?.map(task => <div key={task.id}>{task.name}</div>)
        }
    </div>

}