import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate ,useLocation} from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const WebLayout = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const axiosPrivate=useAxiosPrivate();
    const location =useLocation();
    async function checkAuth() {
        // const token = sessionStorage.getItem("access_token");
        // console.log("hit here");
        try {
            const response = await axiosPrivate.get(
                "http://localhost:3000/api/v1/checkAuth",
                // {
                //     headers: {
                //         "authorization":token, 
                //     },
                // }
            );

            if (response.data.valid) {
                navigate("/brain");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.error("Error verifying token:", error);
            navigate("/sign-in",{state:{from:location},replace:true});

        }
    }

    useEffect(() => {
        checkAuth();
        // console.log("hit");
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default WebLayout;
