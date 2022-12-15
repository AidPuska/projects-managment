import { Link } from "react-router-dom"
import Avatar from "./Avatar"

const ProjectsList = ({ projects, filter }) => {

    return (
        <div className="mt-10 grid gridCol gap-5">
            {projects.length === 0 ? <p>No projects yet</p> : projects.map(project => (
                <Link className="bg-white p-4 rounded-sm shadow-xl no-underline text-inherit" to={`/projects/${project.id}`} key={project.id}>
                    <h4 className="text-lg text-gray-900">{project.name}</h4>
                    <p className="text-gray-500 text-base">Due by: {project.dueDate}</p>
                    <div className="mt-5 pt-2.5 border-t border-gray-200">
                        <ul className="my-2.5 mx-0 flex">
                            {project.assignedUsersList && project.assignedUsersList.map(user => (
                                <li className="mr-2.5" key={user.photoURL}>
                                    <Avatar className='w-7 h-7' src={user.photoURL} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProjectsList