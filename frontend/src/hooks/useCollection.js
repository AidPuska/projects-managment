import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useEffect, useRef, useState } from "react";

export const useCollection = (coll, _q, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    const q = useRef(_q).current
    const orderBy_ = useRef(_orderBy).current

    useEffect(() => {
        let ref = collection(db, coll)

        if (q) {
            ref = query(collection(db, coll), where(...q))
        }
        if (orderBy_) {
            ref = query(collection(db, coll), where(...q), orderBy(...orderBy_))
        }

        const unsub = onSnapshot(ref, (snapshot) => {
            let res = []
            snapshot.docs.forEach(doc => {
                res.push({ ...doc.data(), id: doc.id })
            })

            // update state
            setDocuments(res)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data')
        })

        // unsubscribe on unmount
        return () => unsub()

    }, [collection, q, orderBy_])

    return { documents, error }
}