import { Brain, ChevronDown, Plus, User } from "lucide-react";
import { Button } from "./ui/button";
import { setModalState } from "../redux/Slices/modalSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUserModalState } from "../redux/Slices/userModalSlice";
import Avatar from "react-avatar";

export function Header() {
    const dispatch = useDispatch();

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
                {/* <Button variant={"outline"} className="flex items-center rounded-md border-gray-300 shadow-md" onClick={() => dispatch(setUserModalState())}>
                    <ChevronDown />
                    <Avatar name={username as string} size="30" round={true} color={avatorColor} />
                </Button> */}
                <UserComponent />
            </div>
        </div>
    )
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

