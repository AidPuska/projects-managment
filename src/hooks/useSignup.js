import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase
import { db, auth } from '../firebase/config'
import { setDoc, collection, deleteDoc, doc } from "firebase/firestore";

import axios from 'axios'

export const useSignup = () => {

    const { dispatch } = useAuthContext()

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)



    const signup = async (email, password, name, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            // signup user
            const res = await createUserWithEmailAndPassword(auth, email, password)

            /* if (!res) {
                throw new Error('Could not complete signup')
            } */

            // upload user thumbnail
            const formData = new FormData()
            formData.append('file', thumbnail)
            formData.append('upload_preset', 'vydlqnr9')

            const response = await axios.post('https://api.cloudinary.com/v1_1/dseufa3sg/image/upload', formData)
            console.log(response.data.url)
            const photoURL = response.data.url


            // add name to user
            await updateProfile(res.user, { displayName: name, photoURL })

            // create a user document
            setDoc(doc(db, 'users', res.user.uid), {
                online: true,
                name,
                photoURL
            })

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch (e) {
            if (!isCancelled) {
                setError(e.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}
