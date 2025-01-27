import axios from "axios";

const BASEURL='http://localhost:3000';

const privateAxios=axios.create({
    baseURL: BASEURL,
    headers:{'Content-Type':'application/json'},
    withCredentials: true,
})

export {privateAxios,BASEURL}