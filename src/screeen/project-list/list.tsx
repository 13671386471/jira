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
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>项目</td>
                        <td>负责人</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(project => (
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>

                            </tr>
                        ))
                    }
                </tbody>
                
            </table>
        </div>
    )
}