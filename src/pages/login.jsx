// import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useFirebase } from "@/context/firebase"
import { useEffect, useState } from "react"
import { useFetch } from "@/hook/useFetch"
import { Angry, User2 } from "lucide-react"
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import Button from '@mui/material/Button';



const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    let [formData, setFormData] = useState({})
    let { login, signInWithGoogle, err, loading } = useFetch();
    let { user } = useFirebase();
    const registerHandeler = async () => {
        login(formData.email, formData.password)
    }
    const formHandeler = (e) => setFormData((prev) => {
        return { ...prev, [e.target.name]: e.target.value }
    })
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])
    return (
        <>
            <div className="w-1/2 mx-auto mt-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>

                        <CardDescription className="h-4">
                            {
                                err && <div className=" text-red-500 flex gap-2">
                                    <Angry></Angry>
                                    <p>{err}</p>
                                </div>
                            }

                        </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full flex justify-center">
                        <Button variant="outlined" className="w-[145px] flex gap-3 mx-auto" onClick={signInWithGoogle}>
                            login with google
                        </Button>
                    </CardContent>
                </Card>
            </div>

        </>
    )
}
export default Login;