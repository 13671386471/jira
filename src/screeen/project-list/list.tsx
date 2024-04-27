import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { User } from "./search-panel";
export interface Project{
    id: string,
    name: string,
    personId: string,
    organization: string,
    pin: boolean,
    created: number
}
interface ProjectListProp extends TableProps<Project> { 
    // list: Project[],
    users: User[]
}

export const ProjectList = ({users, ...tableProps}: ProjectListProp) => {
    return <Table
        pagination={false}
        columns={[
            {
                title: '名称',
                dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name)
            },
            {
                title: '部门',
                dataIndex: 'organization',
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
            },
            {
                title: '创建时间',
                dataIndex: 'created',
                render(value, project) {
                    return (
                        <span>
                            {value ? dayjs(value).format('YYYY-MM-DD') : '无'}
                        </span>
                    )
                }
            }
        ]}
        // dataSource={list}
        {...tableProps}
    />
}