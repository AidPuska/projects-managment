import { useCollection } from "../hooks/useCollection"
import Avatar from './Avatar'

const AllUsers = () => {
    const { documents, error } = useCollection('users')

    return (
        <div className='w-64 min-w-[256px] p-8 box-border bg-white text-gray-700'>
            <h2 className="text-right mb-10 pb-2.5 border-b border-gray-300 text-lg">All users</h2>

            {error && <div className="error">{error}</div>}
            {documents && documents.map(user => (
                <div key={user.id} className='flex justify-end items-center my-5 mx-auto gap-2'>
                    {user.online && <span className="bg-green-500 rounded-3xl w-2.5 h-2.5 mr-3 mt-0.5"></span>}
                    {!user.online && <span className="bg-red-500 rounded-3xl w-2.5 h-2.5 mr-3 mt-0.5"></span>}
                    <span>{user.name}</span>
                    <Avatar className='ml-2.5 w-10 h-10' src={user.photoURL} />
                </div>
            ))}
        </div>
    )
}

export default AllUsers