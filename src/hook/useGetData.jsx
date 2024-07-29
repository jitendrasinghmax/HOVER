import { app } from "@/db/firebase"
import {getFirestore,collection,query,doc as document,getDocs, orderBy, getDoc} from "firebase/firestore"
import { useState } from "react";

export const useGetDoc=()=>{
    const [doc,setDoc]=useState([])
    const [loading,setLoding]=useState(false)
    let [products,setProducts]=useState([])
    const firestore=getFirestore(app);
    
    const getOrders=async (id)=>{
        const userCollectionRef=collection(firestore,'users');
        const productsCollectionRef=collection(firestore,'products');
        const respoense=await getDoc(document(userCollectionRef,id));
        const builOrders=async(orders,current,newOrders)=>{
            if(current==orders.length){
                return;
            }
            const resp=await getDoc(document(productsCollectionRef,orders[current].productId))
            if(resp.exists()){
                newOrders.push({...orders[current],productDetails:resp.data()});
            }
           
            builOrders(orders,current+1,newOrders);
            return newOrders;
        }
    return builOrders(respoense.data().orders,0,[]).then((resp)=>resp)
    }
    const getData=async()=>{
        setLoding(true);
        const q=query(collection(firestore,"products"),orderBy("click"))
        const resp=await getDocs(q)
        const docs=[]
        resp.forEach((doc) => {
            docs.push({...doc.data(),id:doc.id,});
        })
        setDoc(docs)
        setLoding(false)
    }
   const getProducts=async(uid)=>{
    setLoding(true)
        const collRef=collection(firestore,'users');
        const docRef=document(collRef,uid);
        const resp=await getDoc(docRef)
        if(resp.exists()){
            let productsId=resp.data()
            productsId.productId.forEach(async(uid)=>{
                const collRef=collection(firestore,"products");
                const docRef=document(collRef,uid);
                const resp=await getDoc(docRef);
                setProducts((prev)=>{
                    console.log(resp.data())
                    prev.push({...resp.data(),id:resp.id});
                    return prev.filter((item)=>{
                        console.log(item)
                        return item.uid?true:false})
                });
            })
        }
       
        setLoding(false)

   }
    return {getData,doc,loading,getProducts,products,getOrders}
}
