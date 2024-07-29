import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@mui/material"
import { useState } from "react"
import { Oval } from "react-loader-spinner"
import { FcApproval } from "react-icons/fc";
import { FaCircleExclamation } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom"
import { useFirebase } from "@/context/firebase"
import { useAddDoc } from "@/hook/useAddDoc"

export const DeliveryDetails = () => {
    const navigate=useNavigate();
    const {productId}=useParams();
    let [formData, setFormData] = useState({ pincode: "", Name: "", District: "", State: "", Address: "" });
    let [loading, setLoading] = useState(false);
    let [orderLoading,setOrderLoding]=useState(false);
    let [validate,setValidate]=useState({fetched:false,sucess:false});
    const {user}=useFirebase();
    let {orderNow}=useAddDoc();
    const formHandeler = async (e) => {
        const { name, value } = e.target;
        if (name == "pincode") {
            if (value.length < 6) {
                setFormData({ [name]: value });
            }
            if (value.length == 6) {
                setFormData({ [name]: value });
                setLoading(true)

                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };
                fetch(`https://api.postalpincode.in/pincode/${value}`, requestOptions)
                    .then((response) => response.json())
                    .then((response) => response[0].PostOffice[0])
                    .then((result) => {
                        setFormData({ ...formData, [name]: value, Name: result.Name, District: result.District, State: result.State });
                        setLoading(false)
                        setValidate({fetched:true,sucess:true})
                    })
                    .catch((error) => {
                        setValidate({...validate,fetched:true})
                        console.error(error.message);
                        setLoading(false)
                    });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }
    const placeOrder=async()=>{
        
        try{
            setOrderLoding(true);
            await orderNow({...formData,productId:productId},user.uid)
            setOrderLoding(false);
            navigate('/confirmed/Order confirmed')
        }catch(error){
            console.log(error.message);
            setOrderLoding(false);
        }
    }
    return (<>
        <div className="w-full flex justify-center ">
            <Card className='w-2/3 sm:w-1/2 h-fit p-4 grid grid-row-4 grid-col-2 gap-2'>
            <Input type="text" name="fullName" value={formData.fullName} onChange={formHandeler} className='col-span-2' placeholder="Enter Full Name"></Input>
                <input type="text" value={formData.pincode} onChange={formHandeler} name="pincode" 
                 className='border-solid border-[2px] border-gray-200 rounded-md px-3 h-10'
                 placeholder="Enter Pincode"/>
                <div className="flex flex-col justify-center items-start">
                {loading ? <Oval
                        visible={true}
                        height="20"
                        width=""
                        color="black"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /> : validate.fetched?validate.sucess?<FcApproval className="text-2xl" />:<FaCircleExclamation className="text-red-500 text-2xl"/>:""}
                </div>
                <Input type="text" value={formData.Name} onChange={formHandeler} name="Area" className='' placeholder="Area" />
                <Input type="text" value={formData.District} onChange={formHandeler} name="District" className='' placeholder="District" />
                <Input type="text" value={formData.State} onChange={formHandeler} name="State" className='' placeholder="State" />
                <Input type="text" value={formData.Address} onChange={formHandeler} name="Address" className='' placeholder="Address" />
                <Button variant="outlined" color="success" onClick={placeOrder} className="col-span-2 w-2/3 mx-auto" >{orderLoading? <Oval
                        visible={true}
                        height="20"
                        width=""
                        color="black"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /> :"Confirm Order"}</Button>
            </Card>
        </div>
    </>)
}


