import axios from "axios";

const axiosUrl = axios.create({
    baseURL: 'http://192.168.10.220:8000'
})
const UseAxios = () => {
    return axiosUrl;
};

export default UseAxios;