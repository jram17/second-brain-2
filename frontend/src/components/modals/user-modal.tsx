
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { useEffect, useState } from "react";
import { GitBranch, Github, LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetUserModalState } from "../../redux/Slices/userModalSlice";
import { avatorColor } from "../header";
import { toast } from "sonner";

export function UserModal() {
    const dispatch = useDispatch();



    const navigate = useNavigate();
    const [user, setUser] = useState<String | null>('');
   
    function handleLogout() {
        // const token = sessionStorage.getItem("access_token");
        // const user = sessionStorage.getItem("username");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("username");

        // console.log({ token: token, user: user });
        toast.success("LogOut successfull!!")
        navigate("/home", { replace: true });
    }
    function handleProfile() {
        navigate("/profile", { replace: true });
    }

    // function randomColor() {
    //     const colors = [
    //         "#D72638", // Deep Red
    //         "#3F88C5", // Strong Blue
    //         "#2E294E", // Dark Purple
    //         "#1B998B", // Teal Green
    //         "#F46036", // Bright Orange
    //         "#6A0572"  // Rich Violet
    //     ];
    //     let num= Math.floor(Math.random()*colors.length)
    //     return colors[num]
    // }
    // const avatorColor= randomColor();
    useEffect(() => {
        const username = sessionStorage.getItem("username");
        setUser(username);  
        
    }, [])
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-end  pt-24 pr-6 z-50"
            onClick={() => dispatch(resetUserModalState())}>



            {/* <div className="bg-white p-6 rounded-lg shadow-lg w-auto" onClick={(e) => e.stopPropagation()}>
                <div>
                    

                </div>
            </div> */}

            <div className="absolute  top-4 right-4 max-w-md  overflow-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}>
                <div className="  mt-16 w-64 bg-white dark:bg-zinc-800 border dark:border-gray-600 rounded-lg shadow-lg ">
                    <div className="p-4 border-b flex items-center">
                        <div className="mr-3">
                            <Avatar name={user as string} size="30" round={true} color={avatorColor} />
                        </div>
                        <div className="font-lg">{user}</div>
                    </div>
                    <div className="py-1">
                        <button className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={handleProfile}>
                            <User className="h-4 w-4 mr-3 " />
                            Profile
                        </button>
                        <button className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                            <Github className="h-4 w-4 mr-3 " />
                            Github
                        </button>
                        <button className="w-full flex items-center px-4 py-2 text-red-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-3 text-red-600" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}


