import { baseApi } from "./baseApi";



const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    
    getClient: builder.query({
      query: () => {
        return {
          url: "/client",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    clientAdd: builder.mutation({
      query: (data) => {
        return {
          url: "/volunteers/create-transport-volunteer",
          method: "POST",
          body: data,
        };
      },invalidatesTags: ['updateProfile']
    }),
    updateClient: builder.mutation({
      query: ({ id, data}) => ({
        url: `/client/${id}`, 
        method: "PATCH",
        body:  data ,
      }),
      invalidatesTags: ["updateProfile"],
    }),

    getSingleData: builder.query({
      query: ({id}) => {
        return {
          url: `/client/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
  }),
});

export const {
  
  useGetClientQuery,
useClientAddMutation,
useUpdateClientMutation,
useGetSingleDataQuery
} = useApi;
