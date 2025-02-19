import { Brain, ChevronDown, Plus, User } from "lucide-react";
import { Button } from "./ui/button";
import { setModalState } from "../redux/Slices/modalSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUserModalState } from "../redux/Slices/userModalSlice";
import Avatar from "react-avatar";
import { replace, useNavigate } from "react-router-dom";
import { handleSmoothScroll } from "../services/userService";

interface HeaderProps {
    path: string;
}
export function Header({ path }: HeaderProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleRedirect() {
        navigate('/sign-in');
    }

    function handleReditectToHome(){
        navigate('/',{ replace: true });
    }


    if (path === "/brain") {
        return (
            <div className=" fixed top-0 left-0 z-50 bg-white flex justify-between  py-4 px-4  w-full backdrop-blur-md border-b
             border-gray-300 shadow-md">
                <div className=" p-2 flex gap-2 text-md font-semibold cursor-pointer">
                    <Brain className="h-6 w-6 text-purple-500" />
                    Second Brain
                </div>
                <div className="flex gap-2">
                    <Button variant={"outline"} className="flex items-center rounded-md border-gray-300 shadow-md" onClick={() => { dispatch(setModalState()) }} >
                        <Plus />
                        <div className="font-bold ">
                            Add memory
                        </div></Button>
                    <UserComponent />
                </div>
            </div>
        )
    } else if (path === "/home") {
        return (
            <div className="sticky top-0 left-0 z-50 bg-[#1C1C1C] text-white flex justify-between  py-4 px-8  w-full backdrop-blur-md  shadow-md">
                <div className=" p-2 flex gap-2 text-2xl font-semibold cursor-pointer">
                    <Brain className="h-8 w-8 text-indigo-500" />
                    Second Brain
                </div>
                <div className="flex text-gray text-base gap-12 items-center">
                    <a href="#home" onClick={(e) => handleSmoothScroll({ event: e, sectionId: "home" })} className="hover:text-gray-400">Home</a>
                    <a href="#features" onClick={(e) => handleSmoothScroll({ event: e, sectionId: "features" })} className="hover:text-gray-400">Features</a>

                    <a href="#about" onClick={(e) => handleSmoothScroll({ event: e, sectionId: "about" })} className="hover:text-gray-400">About</a>
                    <button className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 px-4 py-2 rounded-md text-white" onClick={handleRedirect}>
                        Get Started</button>
                </div>
            </div>
        )
    }
    else if (path === "/sign-in" || path === "/sign-up") {
        return (
            <div className=" fixed top-0 left-0 z-50 bg-white flex justify-between  py-4 px-4  w-full backdrop-blur-md border-b
             border-gray-300 shadow-md">
                <div className=" p-2 flex gap-2 text-md font-semibold cursor-pointer" onClick={handleReditectToHome}>
                    <Brain className="h-6 w-6 text-purple-500" />
                    Second Brain
                </div>
            </div>
        )
    }

}

function randomColor() {
    const colors = [
        "#D72638", // Deep Red
        "#3F88C5", // Strong Blue
        "#2E294E", // Dark Purple
        "#1B998B", // Teal Green
        "#F46036", // Bright Orange
        "#6A0572"  // Rich Violet
    ];
    let num = Math.floor(Math.random() * colors.length)
    return colors[num]
}
export const avatorColor = randomColor();

function UserComponent() {
    const dispatch = useDispatch();
    const [username, setUserName] = useState('');
    useEffect(() => {
        const user = sessionStorage.getItem('username');
        if (user) {
            setUserName(user);
        }
    }, [])


    return (
        <div className="flex items-center rounded-md px-2 cursor-pointer " onClick={() => dispatch(setUserModalState())}>
            <Avatar name={username as string} size="40" round={true} color={avatorColor} textSizeRatio={2.5} />
        </div>
    )
}

