import { Button } from "@/components/ui/button"
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
import { useState} from "react"
import { useFetch } from "@/hook/useFetch"
import { Angry } from "lucide-react"
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';




const Register = () => {
    let [formData, setFormData] = useState({})
    let { signUp, err, loading } = useFetch();
    const registerHandeler = async () => {
        signUp(formData.email, formData.password)
    }
    const formHandeler = (e) => setFormData((prev) => {
        return { ...prev, [e.target.name]: e.target.value }
    })
    return (
        <>
            <div className="w-1/2 mx-auto mt-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>

                        <CardDescription className="h-4">
                            {
                                err && <div className=" text-red-500 flex gap-2">
                                    <Angry></Angry>
                                    <p>{err}</p>
                                </div>
                            }

                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <Input placeholder="Enter e mail"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={formHandeler} />
                        <Input placeholder="Enter e password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={formHandeler} />
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-[145px] flex gap-2" onClick={registerHandeler}>
                           {loading&& <Spinner animation="border" size="sm" />}
                            register
                        </Button>
                    </CardFooter>
                </Card>
            </div>

        </>
    )
}
export default Register;