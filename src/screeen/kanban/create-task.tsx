import { useState } from "react"
import { useKanbansQueryKey, useProjectIdInUrl } from "./util";
import { useTaskAdd } from "utils/task";
import { Button, Card, Input } from "antd";



export const CreateTask = ({kanbanId}: {kanbanId: number}) => {
    const [name, setName]= useState('');
    const [inputModal, setInputModal]= useState(false);
    const projectId = useProjectIdInUrl();
    const {mutateAsync: addTask} = useTaskAdd(useKanbansQueryKey());

    const submit = async () => {
        await addTask({projectId, name, kanbanId});
        setInputModal(false);
        setName('');
    }

    const toggle = () => {
        // setInputModal(!inputModal);
        setInputModal(mode => !mode);
    }

    if(!inputModal){
        return <div><Button onClick={toggle}>+创建任务</Button></div>
    }

    return <Card>
        <Input 
            onBlur={toggle}
            onPressEnter={submit}
            placeholder="需要做什么"
            autoFocus={true}
            value={name}
            onChange={e => setName(e.target.value)}
        />
    </Card>
}