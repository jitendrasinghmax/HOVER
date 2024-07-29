import React, { useState } from "react";
import { app } from "@/db/firebase";
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword,
         GoogleAuthProvider,
         signInWithPopup,
         signOut} from 'firebase/auth'

const googleProvider=new GoogleAuthProvider();
export const useFetch = () => {
    let [err, setErr] = useState(null);
    let [loading, setLoading] = useState(false);
    let auth = getAuth(app);
    const signUp = async (email, password) => {
        setErr(null);
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password).
            then((respornse) => {
                setLoading(false)
            }).catch((err) => {
                setErr(err.code.split("/")[1]);
                setLoading(false)
            })
    }
    const login= async (email, password) => {
        setErr(null);
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password).
            then((respornse) => {
                setLoading(false)
            }).catch((err) => {
                setErr(err.code.split("/")[1]);
                setLoading(false)
            })
    }
    const signInWithGoogle=()=>signInWithPopup(auth,googleProvider);
    const logOut=()=>signOut(auth)
    return { signUp,login,signInWithGoogle,logOut, err, loading }
}