import axios from "axios";
import { BASEURL } from "../config/axiosConfig";

const useRefreshToken = () => {
    const refresh = async () => {
        console.log("refreshing...");
        try {
            const response = await axios.get(`${BASEURL}/api/v1/refresh`, {
                withCredentials: true,
            });
            console.log(response.data);
            sessionStorage.setItem('access_token', response.data.accessToken); 
            return response.data.accessToken;
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw new Error("Unable to refresh token");
        }
    };
    return refresh;
};

export default useRefreshToken;