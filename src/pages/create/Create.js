import { Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import useFirestore from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
]

const Create = () => {
    const { documents } = useCollection('users')
    const { user } = useAuthContext()
    const { addDocument, response } = useFirestore('projects')

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [category, setCategory] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])

    const [users, setUsers] = useState([])

    const [formError, setFormError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (documents) {
            setUsers(documents.map(user => {
                return { value: user, label: user.name }
            }))
        }
    }, [documents])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category) {
            setFormError('Category form cant be empty, please choose one')
            return
        }

        if (assignedUsers.length < 1) {
            setFormError('Please assign the project at least to 1 user')
            return
        }

        const createdBy = {
            name: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((u) => {
            return {
                name: u.value.name,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        const project = {
            name,
            details,
            dueDate: new Timestamp(dueDate).seconds,
            category: category.value,
            comments: [],
            createdBy,
            assignedUsersList
        }


        await addDocument(project)
        if (!response.error) {
            navigate('/')
        }
    }



    return (
        <div className='max-w-[600px] mb-5'>
            <h2 className='page-title font-bold text-2xl'>Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input type="text" required onChange={(e) => setName(e.target.value)} value={name} />
                </label>

                <label>
                    <span>Project details:</span>
                    <textarea type="text" required onChange={(e) => setDetails(e.target.value)} value={details} />
                </label>

                <label>
                    <span>Project due date:</span>
                    <input type="date" required onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
                </label>

                <label>
                    <span>Project category:</span>
                    <Select
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>

                <label>
                    <span>Assign project to:</span>
                    <Select
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>

                {formError && <p className='error'>{formError}</p>}

                <button className='btn'>Submit project</button>
            </form>
        </div>
    )
}

export default Create