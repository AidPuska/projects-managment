import { Timestamp } from "firebase/firestore"
import { useState } from "react"
import Avatar from "../../components/Avatar"
import { useAuthContext } from '../../hooks/useAuthContext'
import useFirestore from "../../hooks/useFirestore"

const ProjectComments = ({ project }) => {

    const { user } = useAuthContext()
    const [comment, setComment] = useState('')
    const { updateDocument, response } = useFirestore('projects')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const commentToAdd = {
            name: user.displayName,
            createdAt: Timestamp.fromDate(new Date()),
            photoURL: user.photoURL,
            content: comment,
            id: Math.random()
        }

        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })

        if (!response.error) {
            setComment('')
        }
    }

    return (
        <div className="">
            <h4 className="text-gray-700">Project comments</h4>

            <ul>
                {project.comments.length < 1
                    ?
                    <div className="p-4 rounded border border-gray-200 mt-5 shadow-md bg-white">No comments yet!</div>
                    :
                    project.comments.map(comment => (
                        <li className="p-4 rounded border border-gray-200 mt-5 shadow-md bg-white" key={comment.id}>
                            <div className="flex items-center text-gray-500">
                                <Avatar src={comment.photoURL} />
                                <p className="ml-2.5">{comment.name}</p>
                            </div>

                            <div className="m-2">
                                <p>Date here</p>
                            </div>

                            <div className="m-2">
                                <p>{comment.content}</p>
                            </div>
                        </li>
                    ))}
            </ul>

            <form onSubmit={handleSubmit} className="">
                <label className="mb-0">
                    <span>Enter Comment:</span>
                    <textarea
                        className="min-h-[40px] text-lg"
                        required
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    ></textarea>

                    <button className="btn">Add comment</button>
                </label>
            </form>
        </div>
    )
}

export default ProjectComments