import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./util"
import { Row } from "components/lib";
import { Button, Input } from "antd";
import { UserSelect } from "components/userSelect";
import { TaskTypeSelect } from "components/task-type-select";


export const SearchPanel = () => {
    const searchParams = useTasksSearchParams();
    const setSearchParams = useSetUrlSearchParam();
    const reset = () => {
        setSearchParams({
            name: undefined,
            processorId: undefined,
            tagId: undefined,
            typeId: undefined
        })
    }
    return <Row marginBottom={2} gap={true}>
        <Input 
            style={{width: '20rem'}} 
            placeholder="任务名" 
            value={searchParams.name}
            onChange={e => setSearchParams({
                ...searchParams,
                name: e.target.value
            })}
        />
        <UserSelect 
            defaultOptionName={'经办人'}
            value={searchParams.processorId}
            onChange={value => setSearchParams({
                ...searchParams,
                processorId: value
            })}
        />
        <TaskTypeSelect
            defaultOptionName="类型"
            value={searchParams.typeId}
            onChange={value => setSearchParams({
                ...searchParams,
                typeId: value
            })}
        />
        <Button onClick={reset}>清除筛选器</Button>
    </Row>
}