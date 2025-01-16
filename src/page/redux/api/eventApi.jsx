import { baseApi } from "./baseApi";



const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    eventAdd: builder.mutation({
        query: (data) => {
          return {
            url: "/events/create",
            method: "POST",
            body: data,
          };
        },
      }),
    
    getEvent: builder.query({
      query: () => {
        return {
          url: "/events/get-all",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }), 
  }),
});

export const {
  useEventAddMutation,
  useGetEventQuery
} = useApi;
