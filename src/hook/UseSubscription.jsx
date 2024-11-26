

import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";


const UseSubscription = () => {
    const axiosUrl = UseAxios();
    const { data: subscription = [], isLoading, refetch } = useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            const res = await axiosUrl.get('/plan');
            return res.data.plans;
        },
        onError: (err) => {
            console.error("Error fetching category:", err); 
        }
    });
    return [subscription, isLoading, refetch];
};

export default UseSubscription;