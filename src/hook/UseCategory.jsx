import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";


const UseCategory = () => {
    const axiosUrl = UseAxios();
    const { data: category = [], isLoading, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosUrl.get('/category');
            return res.data.data;
        },
        onError: (err) => {
            console.error("Error fetching category:", err); 
        }
    });
    return [category, isLoading, refetch];
};

export default UseCategory;