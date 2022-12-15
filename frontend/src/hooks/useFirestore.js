import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useReducer, useEffect, useState } from "react";
import { db } from '../firebase/config'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
}

const dbReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { document: null, isPending: true, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        case 'UPDATED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

const useFirestore = (coll) => {

    const [response, dispatch] = useReducer(dbReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection ref
    const ref = collection(db, coll)

    // only dispatch if not cancelled
    const dispatchIfNotCanceled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // add document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const addedDocument = await addDoc(ref, {
                ...doc,
                createdAt: serverTimestamp()
            })
            dispatchIfNotCanceled({ type: 'ADDED_DOCUMENT', payload: addDocument })
        } catch (err) {
            dispatchIfNotCanceled({ type: 'ERROR', payload: err.message })
        }
    }

    // delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            await deleteDoc(doc(db, coll, id))
            dispatchIfNotCanceled({ type: 'DELETED_DOCUMENT' })
        } catch (err) {
            dispatchIfNotCanceled({ type: 'ERROR', payload: 'Could not delete the transaction' })
        }
    }

    const updateDocument = async (id, updates) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const updatedDoc = await setDoc(doc(db, coll, id), (updates), { merge: true })
            dispatchIfNotCanceled({ type: 'UPDATED_DOCUMENT', payload: updatedDoc })
            return updatedDoc
        } catch (err) {
            dispatchIfNotCanceled({ type: 'ERROR', payload: err.message })
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response, updateDocument }
}

export default useFirestore