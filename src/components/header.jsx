import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFetch } from '@/hook/useFetch';
import { useFirebase } from '@/context/firebase';
import { Button } from 'semantic-ui-react';
import { FaTshirt } from "react-icons/fa";



const Header = () => {
    const navigate = useNavigate();
    const { logOut } = useFetch();
    let { user } = useFirebase();
    return (
        <>
            <nav className='flex justify-between mx-6 mt-2'>
                <div type="button" className='flex text-2xl py-2 gap-2' onClick={() =>navigate('/')}><FaTshirt /><p className="text-lg">HOVER</p></div>
                {
                    user ? <div className='flex gap-3'>
                        <button className='px-4 py-1' onClick={() => navigate('/sell')}>Sell</button>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={user.photoURL} alt={user.photoURL} />
                                    <AvatarFallback>{user.reloadUserInfo.displayName.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user.reloadUserInfo.displayName}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate('/myproducts')}>My Product</DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => logOut()}><div className='text-red-500 flex'>log out</div></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div> : <div className='flex gap-2'>
                        <Button className='px-2' basic color='gray' content="gray" onClick={() => navigate("/register")}>sign up</Button>
                        <Button className='px-2'  basic color='gray' content="gray" onClick={() => navigate("/login")}>login</Button>
                    </div>

                }

            </nav>

        </>
    )
}
export default Header;