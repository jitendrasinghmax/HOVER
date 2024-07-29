import { useFirebase } from "@/context/firebase";
import { useGetDoc } from "@/hook/useGetData";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from 'semantic-ui-react'
import {
    CardContent,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react'
import { useAddDoc } from "@/hook/useAddDoc";
import { Navigate, useNavigate } from "react-router-dom";


const Home = () => {
    let navigate=useNavigate();
    let { user } = useFirebase();
    let { getData, doc, loading } = useGetDoc();
    useEffect(() => {
        getData();
    }, [])
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
            </div> : <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {doc.map((item) => {
                    return <div className="w-fit h-fit p-2 mx-auto flex flex-col gap-2 border-gray-300 border-[solid] border-[2px] rounded-lg">
                        <Card>
                            <Image className="h-[300px] overflow-hidden" src={item.imgUrl} wrapped ui={false} />
                            <CardContent>
                                <div className="flex justify-between px-3">
                                    <p className="text-md text-gray-800 font-semibold">{item.ProductName.toUpperCase()}</p>
                                    <p className="text-md text-gray-800 font-extrabold">Rs.{item.price}</p>
                                </div>
                                <div className="w-full flex justify-between">
                                <Button basic color="gray" content="gray">add to cart</Button>
                                <Button basic color="gray" content="gray" onClick={()=>navigate(`/deliveryDetails/${item.id}`)}>buy now</Button>
                                </div>
                            </CardContent> 
                        </Card>
                    </div>

                })}
            </div>
            }

        </>
    )
}
export default Home;