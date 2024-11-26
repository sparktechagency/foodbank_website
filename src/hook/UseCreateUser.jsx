import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";


const UseCreateUser = () => {
    const axiosUrl = UseAxios();
    const { data: createUser = [], isLoading, refetch } = useQuery({
        queryKey: ['createUser'],
        queryFn: async () => {
            const res = await axiosUrl.get('/dashboard/all-creators');
            return res.data.creators;
        },
        onError: (err) => {
            console.error("Error fetching category:", err); 
        }
    });
    return [createUser, isLoading, refetch];
};

export default UseCreateUser;