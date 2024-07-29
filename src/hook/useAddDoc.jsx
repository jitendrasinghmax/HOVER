import { useState } from 'react'
import { app } from '../db/firebase'
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage"

export const useAddDoc = () => {
    let [sucess, setSucess] = useState(false);
    let [err, setErr] = useState(null);
    let [loading, setLoading] = useState(false);
    const firestore = getFirestore(app);
    const storage=getStorage(app);
    const productCollection = collection(firestore, "products");
    const userCollection = collection(firestore, "users")

    const orderNow=async (data,userId)=>{
        const docRef=doc(userCollection,userId);
            try{
                const resp=await updateDoc(docRef,{
                    orders:arrayUnion(data)
                }).then((resp)=>console.log(resp))
                console.log(resp)
            }catch(error){
                console.log(error);
            }
    }

    const addProduct = async ({ formData, user }) => {
        try {
            setLoading(true)
            const imgRef=ref(storage,`uploads/images/${Date.now()}${formData.image.name}`)
            let path=await uploadBytes(imgRef,formData.image)
            const imgUrl= await getDownloadURL(ref(storage,path.ref.fullPath))
        
            const respoense = await addDoc(productCollection, {
                ProductName:formData.productName,
                price:formData.price,
                type: formData.type,
                gender: formData.gender,
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                click:10,
                imgUrl:imgUrl,
            });
            const docRef = doc(userCollection, user.uid)
            const document = await getDoc(docRef)
            if (document.exists()) {
                await updateDoc(docRef, {
                    productId: arrayUnion(respoense.id)
                })
                
            } else {
                await setDoc(docRef, {
                    productId: arrayUnion(respoense.id)
                })
            }
            setLoading(false)
            setSucess(true)
        } catch (err) {
            setErr(err)
            console.log(err)
            setLoading(false)
        }
    }
    return { addProduct, sucess, err, loading,orderNow }
}
