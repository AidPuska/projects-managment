import { useState } from 'react'
import axios from 'axios'
import { Image } from 'cloudinary-react'
import { useSignup } from '../../hooks/useSignup'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const { signup, isPending, error, getImage } = useSignup()


    const handleImageChange = async (e) => {
        setSelectedImage(null)
        let selected = thumbnail


        if (!selected) {
            setThumbnailError('Please select image')
            return
        }

        if (!selected.type.includes('image')) {
            setThumbnailError('Not allowed, please select an image')
            return
        }

        if (selected.size > 100000) {
            setThumbnailError('Image to huge, please select smaller image')
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, name, thumbnail)
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-[400px] my-[60px] p-10 mx-auto border border-gray-200 shadow-xl bg-white'>
            <h2 className='font-bold text-2xl'>Sign up</h2>

            <label>
                <span>Email:</span>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            </label>

            <label>
                <span>Password:</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            </label>

            <label>
                <span>Username:</span>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} required />
            </label>


            <label>
                <span>Profile thumbnail:</span>
                {thumbnailError && <p className='error'>{thumbnailError}</p>}
                <input type="file" required onChange={(e) => setThumbnail(e.target.files[0])} />
            </label>


            {!isPending && <button className='btn'>Sign up</button>}
            {isPending && <button disabled className='btn'>Loading...</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup