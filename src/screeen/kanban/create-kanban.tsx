import { useState } from "react"
import { useKanbansQueryKey, useProjectIdInUrl, useProjectInUrl } from "./util";
import { useKanbanAdd } from "utils/project";
import { Container } from "./kanban-column";
import { Input } from "antd";



export const CreateKanban = () => {
    const [name, setName] = useState('');
    const projectId = useProjectIdInUrl();
    const {mutateAsync: addKanban} = useKanbanAdd(useKanbansQueryKey());

    const submit = async () => {
        await addKanban({name, projectId});
        setName('');
    }

    return <Container>
        <Input 
            size="large"
            placeholder="新建看板名称"
            onPressEnter={submit}
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    </Container>



}