import { Brain, Lock, User } from "lucide-react"
import { avatorColor } from "../components/header"
import Avatar from "react-avatar"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { BASEURL } from "../config/axiosConfig"
import { toast } from "sonner"
import { replace, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetUserModalState } from "../redux/Slices/userModalSlice"

export function Profile() {
    return (
        <div className="bg-gray-50 ">
            <ProfileHeader />

            <div className="flex mt-20">
                <ProfileSidebar />
                <ProfileContent />
            </div>
        </div>
    )
}

function ProfileHeader() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    return (
        <div className=" fixed top-0 left-0 z-50 bg-white flex justify-between  py-4 px-4  w-full backdrop-blur-md border-b
         border-gray-300 shadow-md cursor-pointer">
            <div className=" p-2 flex gap-2 text-md font-semibold " onClick={()=>{
                dispatch(resetUserModalState());
                navigate('/')}}> 
                <Brain className="h-6 w-6 text-purple-500 " />
                Second Brain
            </div>
        </div>
    )
}

function ProfileSidebar() {
    return (
        <div className="h-full w-1/6 mt-14 space-y-1 p-2">
            <div className="text-md p-4 flex items-center hover:bg-gray-200 rounded-md hover:shadow-md font-normal">
               <User className="h-5 w-5 mr-2"/> Profile
            </div>
            <div className="text-md p-4 flex items-center hover:bg-gray-200 rounded-md hover:shadow-md font-normal">
               <Lock className="h-5 w-5 mr-2"/> Security
            </div>
        </div>
    )
}

function ProfileContent() {
    const [username, setUserName] = useState('');
    const dispatch=useDispatch();
    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmNewPasswordRef = useRef<HTMLInputElement>(null);
    const navigate=useNavigate();

    async function handleUpdatePassword(e: React.FormEvent) {
        e.preventDefault();
        const currentPassword = currentPasswordRef.current?.value;
        const newPassword = newPasswordRef.current?.value;
        const confirmNewPassword = confirmNewPasswordRef.current?.value;

        console.log(username,currentPassword, newPassword, confirmNewPassword)

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            alert("Please fill out all fields.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match!");
            return;
        }

        try{
            const response= await axios.post(`${BASEURL}/api/v1/forgot-password`,{
                username,
                currentPassword,
                newPassword
            });
            if(response.data.status){
                toast.success(`${username} , Your password was successfully updated`);
                dispatch(resetUserModalState());
                navigate('/')
            }else{
                toast.error(`${username}, Failed to update password. Please try again.`);
            }

        }catch(error){
            console.error("Error updating password:", error);
            alert("Failed to update password. Please try again.");
        }
    }



    useEffect(() => {
        const user = sessionStorage.getItem('username');
        if (user) {
            setUserName(user);
        }
    }, [])
    return (
        <div className="h-full w-4/6 ">
            <div className="p-4">
                <h1 className="font-bold  text-2xl pb-2">User Details</h1>

                <div className="rounded-xl bg-white shadow-md flex gap-4 items-center text-2xl font-bold w-2/3 p-6">
                    <Avatar name={username as string} size="40" round={true} color={avatorColor} textSizeRatio={2.5} />
                    <div>{username}</div>
                </div>


                <div className="rounded-lg mt-6 shadow-md bg-white w-2/3">
                    <div className="p-6 border-b border-gray-200 ">
                        <div className="flex items-center mb-2 gap-2 ">
                            <Lock />
                            <div className="font-semibold text-xl text-gray-900">Change Password </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-400 text-sm">Update your password to keep your account secure</p>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleUpdatePassword} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 pb-2">Current Password</label>
                                <input
                                    type="password"
                                    ref={currentPasswordRef}
                                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-gray-700 pb-2">New Password</label>
                                <input
                                    type="password"
                                    ref={newPasswordRef}
                                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>

                            {/* Confirm New Password */}
                            <div>
                                <label className="block text-gray-700 pb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    ref={confirmNewPasswordRef}
                                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-1/3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}