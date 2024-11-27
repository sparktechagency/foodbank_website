import axios from "axios";

const AdminUrl = () => {
    const token = localStorage.getItem("token"); 
    const adminUrl = axios.create({
        baseURL: "http://192.168.10.220:8000",
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    return adminUrl;
};

export default AdminUrl;