import { Brain, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { setModalState } from "../redux/Slices/modalSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export function Header() {
    const dispatch = useDispatch();
    const [username,setUserName]=useState('');
    useEffect(()=>{
        const user= sessionStorage.getItem('username');
        if(user){
            setUserName(user);
        }
    },[])
    return (
        <div className=" fixed top-0 left-0 z-50 bg-white flex justify-between  py-4 px-4  w-full backdrop-blur-md border-b
         border-gray-300 shadow-md">
            <div className="hover:text-gray-600 p-2">
                <Brain className="h-6 w-6 " />
            </div>
            <div className="flex gap-2">
                <Button variant={"outline"} className="flex items-center rounded-md border-gray-300 shadow-md" onClick={()=>{dispatch(setModalState())}} >
                    <Plus/>
                    <div className="font-bold ">
                        Add memory
                    </div></Button>
                <Button variant={"outline"} className="flex items-center rounded-full border-gray-300 shadow-md" >{username}</Button>
            </div>
        </div>
    )
}