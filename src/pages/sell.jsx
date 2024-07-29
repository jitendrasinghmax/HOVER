import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useState,useEffect } from "react"
import { useAddDoc } from "@/hook/useAddDoc"
import { useFirebase } from "@/context/firebase"
import { useNavigate } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sell = () => {
    const navigate=useNavigate();
    let {user}=useFirebase();
    let [formData,setFormData]=useState({});
    let {addProduct,sucess,err,loading}=useAddDoc()
    useEffect(()=>{
        if(!user){
            navigate('/')
        }
        if(sucess){
          navigate("/confirmed/Product Added")
        }
    },[user,sucess])
   
    return (
        <>
            <div className="flex justify-center mt-4">
                <Card className="w-[80%]">
                    <CardHeader>
                        <CardTitle>Add Yr Product</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                        <Input placeholder="product name" value={formData.productName} onChange={(e)=>setFormData((prev)=>{
                            return {...prev,productName:e.target.value}
                        })}></Input>
                        <Select name="type" onValueChange={(value)=>setFormData((prev)=>{
                            return {...prev,type:value}
                        })}>
                            <SelectTrigger className="w-2/3">
                                <SelectValue placeholder="type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="shirt">shirt</SelectItem>
                                <SelectItem value="T shirt">T shirt</SelectItem>
                                <SelectItem value="over sized">over sized</SelectItem>
                            </SelectContent>
                        </Select>
                        <div>
                            <RadioGroup name="gender"  onValueChange={(value)=>setFormData((prev)=>{
                            return {...prev,gender:value}
                        })}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female">Female</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <Input id="picture" type="file" name="image"  onChange={(e)=>setFormData((prev)=>{
                            return {...prev,image:e.target.files[0]}
                        })}/>
                        <Input placeholder="price" value={formData.price} onChange={(e)=>setFormData((prev)=>{
                            return {...prev,price:e.target.value}
                        })}></Input>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                       <button onClick={()=>addProduct({formData,user})} className="bg-gray-700 px-4 text-white w-[80px] h-9 flex justify-center items-center">
                         {loading?<Spinner animation="border" size="sm"  />:"Add"}
                      </button>
                    </CardFooter>
                </Card>
                {/* {...formData,uid:user.uid,name:user.displayName,email:user.email} */}
            </div>
        </>
    )
}
export default Sell;