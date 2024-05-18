import { Dropdown, Table, TableProps, Button, Modal } from "antd";
import type { MenuProps } from 'antd';
import dayjs from "dayjs";
//  
import { Link } from "react-router-dom";
import { User } from "./search-panel";
import { Pin } from "components/pin";
import { useProjectDelete, useProjectEdit } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectQueryKey, useProjectsModal } from "./util";
export interface Project{
    id: number,
    name: string,
    personId: number,
    organization: string,
    pin: boolean,
    created: number
}
interface ProjectListProp extends TableProps<Project> { 
    // list: Project[],
    users: User[],
    refresh?: () => void,
}

export const ProjectList = ({users, ...tableProps}: ProjectListProp) => {
    
    const { mutate } = useProjectEdit(useProjectQueryKey());// hook返回的是一个普通函数mutate，这样就可以在组件内部调用了，而不是违反规则在组件内部调用hook，因为hook只能在顶部调用 -- 9-5
    const pinProject = (id: number) => (pin: boolean) => {
        // 函数柯理化，减少参数传递的个数
        mutate({id, pin})
    }
   
    return <Table
        pagination={false}
        columns={[
            {
                title: <Pin checked={true}/>,
                dataIndex: 'pin',
                key: 'pin',
                width: '100px',
                render: (pin, project) => {

                    return <Pin 
                        checked={project.pin} 
                        // 柯理化写法; project.id在没触发事件的时候就已经拿到了
                        onCheckedChange={pinProject(project.id)}
                        // 非柯理化写法
                        // onCheckedChange={(pin) => mutate({pin, id: project.id})}
                    />
                }
            },
            {
                title: '名称',
                dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                render: (text, record, index) => {
                    console.log('render::', text, record, index, tableProps);
                    // <Link to={`/projects/${record.id}`}>查看详情</Link>
                    // 不指定前面的/projects，会自动加上，因为是当前路径下点击跳转，那么就以当前为跟路径，自动在后面加跳转的id
                    // 但是要注意前面不能加/，加上的话那么就是根路径来
                    return <Link to={`${record.id}`}>{text}</Link>
                }
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
            },
            {
                render(text, record, index){
                    return <More project={record}/>
                }
            }
        ]}
        // dataSource={list}
        {...tableProps}
    />
}


const More = ({project}: {project: Project}) => {
    const { startEdit } = useProjectsModal();
    const editProject = (id: number) => () => {
        startEdit(id)
    }

    const {mutate: deleteProject} = useProjectDelete(useProjectQueryKey());
    const confirmDeleteProject = ({id}: {id: number}) => {
        // 删除项目
        Modal.confirm({
            title: '确认删除项目吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                deleteProject({id})
            }
        })
        
    }
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: <ButtonNoPadding 
                    key={'edit'}
                    type="link" 
                    onClick={editProject(project.id)}
                >
                    编辑
                </ButtonNoPadding>,
        },
        {
            key: '2',
            label: <ButtonNoPadding 
                    key={'delete'}
                    type="link" 
                    onClick={() => confirmDeleteProject({id: project.id})}
                  >
                      删除
                  </ButtonNoPadding>,
          }
      ];
    return <Dropdown 
                menu={{items}}
            >
                <ButtonNoPadding type="link">
                   ...
                </ButtonNoPadding>
                
            </Dropdown>
}