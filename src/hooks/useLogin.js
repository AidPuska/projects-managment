import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const { dispatch, user } = useAuthContext()
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)


    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await signInWithEmailAndPassword(auth, email, password)

            setDoc(doc(db, 'users', res.user.uid), {
                online: true
            }, { merge: true })

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }


        } catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }


    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { isPending, error, login, user }

}