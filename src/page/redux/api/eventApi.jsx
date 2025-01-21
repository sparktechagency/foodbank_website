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
        },invalidatesTags: ['updateProfile']
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

    updateEvent: builder.mutation({
      query: ({ id, data}) => ({
        url: `/events/update/${id}`, 
        method: "PATCH",
        body:  data ,
      }),
      invalidatesTags: ["updateProfile"],
    }),

    deleteEvent: builder.mutation({
      query: (id) => {
        return {
          url: `/events/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
  }),
});

export const {
  useEventAddMutation,
  useGetEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation
} = useApi;
