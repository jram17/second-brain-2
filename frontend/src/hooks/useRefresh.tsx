import axios from "axios";

const useRefreshToken=()=>{
    const refresh=async()=>{
        try {
            const response= await axios.get('http://localhost:3000api/v1/refresh',{
                withCredentials:true
            });
            return response.data.accessToken;
        } catch (error) {
            throw new Error(error as string);
        }
    }
    return refresh;
}

export default useRefreshToken;