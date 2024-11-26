import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";


const UseAdminProfile = () => {
    const axiosUrl = UseAxios();
    const { data: admin = [], isLoading, refetch } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const res = await axiosUrl.get('/dashboard/admin');
            return res.data.data;
        },
        onError: (err) => {
            console.error("Error fetching category:", err); 
        }
    });
    return [admin, isLoading, refetch];
};

export default UseAdminProfile;
