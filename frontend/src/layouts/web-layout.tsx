import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Header } from "../components/header";
import { BASEURL } from "../config/axiosConfig";
const WebLayout = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    async function checkAuth() {
        // const token = sessionStorage.getItem("access_token");
        // console.log("hit here");
        try {
            const token= sessionStorage.getItem("access_token");
            if (!token) {
                navigate("/home", { replace: true });
                return;
            }
            const response = await axiosPrivate.get(
                `${BASEURL}/api/v1/checkAuth`
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
            navigate("/sign-in", { state: { from: location }, replace: true });

        }
    }

    useEffect(() => {
        checkAuth();
        // console.log("hit");
    }, []);
    

    return (
        <div>
            <Header path={location.pathname}/>
            <Outlet />

        </div>
    );
};

export default WebLayout;
