import { baseApi } from "./baseApi";



const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClient: builder.query({
      
      query: ({searchTerm,holocaustSurvivor,sortOrder,page,limit}) => {
        
        return {
          url: `/client?searchTerm=${searchTerm}&holocaustSurvivor=${holocaustSurvivor}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAddClients: builder.query({
      
      query: () => {
        
        return {
          url: `/client/all`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
  
    getGroupClient: builder.query({
      query: ({searchTerm}) => {
      
        return {
          url: `/client?searchTerm=${searchTerm}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getGroupModalClient: builder.query({
      query: () => {
        return {
          url: `/client`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getClientGroup: builder.query({
      query: ({searchTerm,sortOrder}) => {
        return {
          url: `/client-group/?types=client&searchTerm=${searchTerm}&sortOrder=${sortOrder}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getallClientGroups: builder.query({
      query: ({searchTerm,sortOrder}) => {
        return {
          url: `/client-group/all/?types=client&searchTerm=${searchTerm}&sortOrder=${sortOrder}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAddClientsGroup: builder.query({
      query: () => {
        return {
          url: `/client-group/?types=client`,
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

    getSingleGroupClientData: builder.query({
      query: ({id,searchTerm,page, limit}) => {
        
        return {
          url: `/client-group/${id}?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
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
          url: `/client-group/${id}`,
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

    addClientGroup: builder.mutation({
      query: ({data,id}) => ({
        
        url: `/events/add-clients/?eventId=${id}`, 
        method: "PATCH",
        body:  data ,
        
      }),
      invalidatesTags: ["updateProfile"],
    }),

    deleteEventClientGroup: builder.mutation({
      query: ({data, id}) => {
      
        return {
          url: `/events/remove-clients/?eventId=${id}`,
          method: "PATCH",
          body:data,
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
useGetGroupClientQuery,
useAddClientGroupMutation,
useDeleteEventClientGroupMutation,
useGetSingleGroupClientDataQuery,
useGetGroupModalClientQuery,
useGetAddClientsGroupQuery,
useGetAddClientsQuery,
useGetallClientGroupsQuery
} = useApi;
