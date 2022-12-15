import React, { useState } from 'react'
import ProjectsList from '../../components/ProjectsList'
import Sidebar from '../../components/Sidebar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import ProjectFilter from './ProjectFilter'

const Dashboard = () => {

    const { documents, error } = useCollection('projects')
    const { user } = useAuthContext()

    const [filter, setFilter] = useState('all')

    const handleFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const projects = documents ? documents.filter((document) => {
        switch (filter) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach(u => {
                    if (user.uid === u.id) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
                console.log(document.category, filter)
                return document.category === filter
            default:
                return true
        }
    }) : null

    return (
        <div className='flex flex-col mb-10'>
            <h2 className='page-title font-bold text-2xl'>Dashboard</h2>

            {error && <p className='error'>{error}</p>}
            {documents && <ProjectFilter filter={filter} handleFilter={handleFilter} />}
            {projects && <ProjectsList projects={projects} />}
        </div>
    )
}

export default Dashboard