import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { doc, updateDoc } from "firebase/firestore";

export const useLogout = () => {
    const { dispatch, user } = useAuthContext()
    const [error, setError] = useState(null)
    const [loading, isLoading] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)

    const logout = async () => {
        setError(null)
        isLoading(true)

        // sign the user out
        try {
            // update online status
            const { uid } = user
            updateDoc(doc(db, 'users', uid), {
                online: false
            })

            signOut(auth)

            // dispatch logout action
            dispatch({ type: 'LOGOUT' })

            // update state
            if (!isCancelled) {
                isLoading(false)
                setError(null)
            }


        } catch (err) {
            if (!isCancelled) {
                setError(err.message)
                isLoading(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, loading }

}