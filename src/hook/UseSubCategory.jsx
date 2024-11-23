import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";



const UseSubCategory = () => {
    const axiosUrl = UseAxios();
    const { data: subCategory = [], isLoading, refetch } = useQuery({
        queryKey: ['sub-category'],
        queryFn: async () => {
            const res = await axiosUrl.get('/sub-category');
            return res.data.SubCategories;
        },
        onError: (err) => {
            console.error("Error fetching sub-category:", err); 
        }
    });
    return [subCategory, isLoading, refetch];
};

export default UseSubCategory;