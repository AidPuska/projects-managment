import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/config"

const useDocument = (coll, projectId) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = doc(db, coll, projectId)

        const unsub = onSnapshot(ref, (snapshot) => {

            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            } else {
                setError('No such document exists')
            }
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data')
        })

        return () => unsub()
    }, [coll, projectId])

    return { document, error }
}

export default useDocument