import React from 'react'
import { useParams } from 'react-router-dom'
import useDocument from '../../hooks/useDocument'
import ProjectComments from './ProjectComments'
import ProjectSummary from './ProjectSummary'

const Project = () => {

    const projectId = useParams().id
    const { document, error } = useDocument('projects', projectId)

    if (error) {
        return <div className='error'>{error}</div>
    }

    if (!document) {
        return <div className='loading'>Loading...</div>
    }

    return (
        <div className='grid grid-cols-2 items-start gap-[60px]'>
            <ProjectSummary project={document} />
            <ProjectComments project={document} />
        </div>
    )
}

export default Project