
import { privateAxios } from '../config/axiosConfig';
import useRefreshToken from './useRefresh';
import { useEffect } from 'react';




const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const token = sessionStorage.getItem('access_token');

    useEffect(() => {

        const requestIntercept = privateAxios.interceptors.request.use(
            config => {
                if (!config.headers['authorization']) {
                    config.headers['authorization'] =token;
                }
                return config;
            },(error)=>Promise.reject(error)
        );


        const responseIntercept = privateAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status ==401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    // console.log("sent to refresh");
                    prevRequest.headers['authorization'] = newAccessToken;
                    return privateAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            privateAxios.interceptors.response.eject(responseIntercept);
            privateAxios.interceptors.request.eject(requestIntercept);
           
        }
    }, [token, refresh])

    return privateAxios;
}

export default useAxiosPrivate;
