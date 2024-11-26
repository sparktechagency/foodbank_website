import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";


const UseUserManagement = () => {
    const axiosUrl = UseAxios();
    const { data: alluser = [], isLoading, refetch } = useQuery({
        queryKey: ['alluser'],
        queryFn: async () => {
            const res = await axiosUrl.get('/dashboard/all-users');
            return res.data.users;
        },
        onError: (err) => {
            console.error("Error fetching category:", err); 
        }
    });
    return [alluser, isLoading, refetch];
};

export default UseUserManagement;
