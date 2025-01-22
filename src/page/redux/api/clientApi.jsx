import { baseApi } from "./baseApi";



const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClient: builder.query({
      query: ({searchTerm,sortBy}) => {
        return {
          url: `/client?searchTerm=${searchTerm}&sortBy=${sortBy}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getGroupClient: builder.query({
      query: () => {
        return {
          url: "/client",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getClientGroup: builder.query({
      query: () => {
        return {
          url: "/client-group/",
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

    clientGroupAdd: builder.mutation({
      query: (data) => {
        return {
          url: "/client-group/create-client-group",
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

    updateClientGroup: builder.mutation({
      query: ({ id, data}) => ({
        url: `/client-group/${id}`, 
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

    getSingleGroupData: builder.query({
      query: ({id}) => {
        return {
          url: `/client/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    deleteDriver: builder.mutation({
      query: (id) => {
        return {
          url: `/driver/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteWarehouse: builder.mutation({
      query: (id) => {
        return {
          url: `/warehouse/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteVolunteers: builder.mutation({
      query: (id) => {
        return {
          url: `/volunteers/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteVolunteersGroup: builder.mutation({
      query: (id) => {
        return {
          url: `/volunteer-group/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteClient: builder.mutation({
      query: (id) => {
        return {
          url: `/client/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteClientGroup: builder.mutation({
      query: (id) => {
        return {
          url: `/client-group/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
  }),
});

export const {
  
  useGetClientQuery,
useClientAddMutation,
useUpdateClientMutation,
useGetSingleDataQuery,
useClientGroupAddMutation,
useGetClientGroupQuery,
useUpdateClientGroupMutation,
useGetSingleGroupDataQuery,
useDeleteDriverMutation,
useDeleteWarehouseMutation,
useDeleteVolunteersMutation,
useDeleteVolunteersGroupMutation,
useDeleteClientMutation,
useDeleteClientGroupMutation,
useGetGroupClientQuery
} = useApi;
