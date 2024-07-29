import { useFirebase } from "@/context/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDoc } from "@/hook/useGetData";
import { Skeleton } from "@/components/ui/skeleton"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteDocument } from "@/hook/deleteDoc";

export const MyProduct = () => {
    const { user } = useFirebase();
    const navigate = useNavigate()
    const { getProducts, products, loading } = useGetDoc();
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    },[user])
    useEffect(()=>{
        if(user){
            getProducts(user.uid)
        }
    },[])
    return (
        <>
            {loading ? <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(() => <div className="flex flex-col gap-2">
                    <Skeleton className="w-[300px] h-[250px] rounded-xl bg-gray-200 mx-auto" />
                    <div className="flex flex-col gap-2 w-[400px] mx-auto items-center">
                        <Skeleton className="w-[300px] h-[20px] rounded-xl bg-gray-200" />
                        <Skeleton className="w-[300px] h-[20px] rounded-xl  bg-gray-200" />
                    </div>
                </div>)}
            </div> : products.length > 0 ? <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {products.map((item) => {
                    
                    return <div className="w-fit h-fit p-2 mx-auto flex flex-col gap-3x border-gray-300 border-[solid] border-[2px] rounded-lg">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img style={{}} className="h-[300px]" variant="top" src={item.imgUrl} />
                            <Card.Body>
                                <Card.Title>{item.productName}</Card.Title>
                                <Card.Text>
                                    Rs.{item.price}
                                </Card.Text>
                                <div className="flex flex-col">
                                    <Button className="border-black" variant="default" onClick={()=>deleteDocument(item.id)}>delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                })}
            </div> : <div className="flex flex-col items-center gap-4">
                        <p className="text-2xl">OOOps No Product</p>
                        <Button className="w-[200px] border-black" variant="default" 
                        onClick={()=>navigate('/sell')}
                        >Add Product</Button>
                    </div>
            }
        </>
    )
}