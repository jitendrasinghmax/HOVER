import { app } from "@/db/firebase"
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore"
export const deleteDocument=async(productId)=>{
    console.log(productId)
    const firestore=getFirestore(app);
    const productCollection=collection(firestore,'products');
    const document=doc(productCollection,productId)
    const resp=await deleteDoc(document);
}