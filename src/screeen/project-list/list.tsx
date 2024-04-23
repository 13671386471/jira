import { Table } from "antd";
import { User } from "./search-panel";
interface Project{
    id: string,
    name: string,
    personId: string,
    organization: string,
    pin: boolean
}
interface ProjectListProp{
    list: Project[],
    users: User[]
}

export const ProjectList = ({list, users}: ProjectListProp) => {
    return <Table
        pagination={false}
        columns={[
            {
                title: '名称',
                dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name)
            },
            {
                title: '负责人',
                dataIndex: 'personId',
                render(value, project) {
                    return (
                        <span>
                            {users.find(user => user.id === project.personId)?.name || '未知'}
                        </span>
                    )
                }
            }
        ]}
        dataSource={list}
    />
}