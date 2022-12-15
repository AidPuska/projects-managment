import React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import useFirestore from '../../hooks/useFirestore'

const ProjectSummary = ({ project }) => {

    const { deleteDocument } = useFirestore('projects')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = (e) => {
        deleteDocument(project.id)
        navigate('/')
    }

    return (
        <div>
            <div className="bg-white p-7 rounded">
                <h2 className='font-bold text-2xl'>{project.name}</h2>
                <p className='mt-1 font-light'>By: {project.createdBy.name}</p>
                <p className='my-2.5 mx-0 color'>Project due by: {project.dueDate}</p>
                <p className='my-7 mx-0 text-gray-500 leading-7'>{project.details}</p>
                <h4 className='text-gray-700'>Project is assigned to: </h4>
                <div className='flex gap-3 mt-5'>
                    {project.assignedUsersList.map(user => (
                        <div className='border-r pr-2 border-gray-300 last:border-white' key={user.id}>
                            <Avatar className='mr-2.5' src={user.photoURL} />
                            <div className='text-sm text-center font-light'>{user.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id && <button onClick={handleClick} className='btn mt-2'>Complete project</button>}
        </div>
    )
}

export default ProjectSummary