import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";





const WebLayout = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    async function checkAuth() {
        const response = await axios.post("http://localhost:3000/api/v1/verifyJWT");
        if (!response.data.valid) {
            navigate("/home");
        } else {
            navigate("/brain");
        }
    }

    useEffect(() => {
        checkAuth();
        console.log("hit")
    }, [])
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default WebLayout;
