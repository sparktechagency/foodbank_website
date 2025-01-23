import { baseApi } from "./baseApi";



const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    addVolunteerGroup: builder.mutation({
        query: (data) => {
          return {
            url: "/client-group/create-client-group",
            method: "POST",
            body: data,
          };
        },invalidatesTags: ['updateProfile']
      }),
    
    getAllVolunteer: builder.query({
      query: () => {
        return {
          url: "/volunteers",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }), 

    getDriverWarehouse: builder.query({
      query: () => {
        return {
          url: "/volunteers/driver-warehouse",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }), 

    getDriver: builder.query({
      query: () => {
        return {
          url: "/driver",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }), 

    getWarehouse: builder.query({
      query: () => {
        return {
          url: "/warehouse",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getVolunteersGroup: builder.query({
      query: () => {
        return {
          url: "/client-group/driver-client",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    
    getSingleVolunteer: builder.query({
      query: ({id}) => {
        return {
          url: `/volunteers/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSingleGroupVolunteer: builder.query({
      query: ({id}) => {
        return {
          url: `/volunteer-group/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSingleDriver: builder.query({
      query: ({id}) => {
        return {
          url: `/driver/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateVolunteers: builder.mutation({
      query: ({ id, data}) => ({
        url: `/volunteers/${id}`, 
        method: "PATCH",
        body:  data ,
      }),
      invalidatesTags: ["updateProfile"],
    }),

    updateDriver: builder.mutation({
      query: ({ id, data}) => ({
        url: `/driver/${id}`, 
        method: "PATCH",
        body:  data ,
      }),
      invalidatesTags: ["updateProfile"],
    }),

    updateWarehouse: builder.mutation({
      query: ({ id, data}) => ({
        url: `/warehouse/${id}`, 
        method: "PATCH",
        body:  data ,
      }),
      invalidatesTags: ["updateProfile"],
    }),

    updateVolunteerGroup: builder.mutation({
      query: ({ id, data}) => ({
        url: `/client-group/${id}`, 
        method: "PATCH",
        body:  data ,
      }),
      invalidatesTags: ["updateProfile"],
    }),

  }),
});

export const {
  useAddVolunteerGroupMutation,
  useGetAllVolunteerQuery,
  useGetDriverQuery,
  useGetWarehouseQuery,
  useGetSingleVolunteerQuery,
  useUpdateVolunteersMutation,
  useUpdateDriverMutation,
  useUpdateWarehouseMutation,
  useGetVolunteersGroupQuery,
  useUpdateVolunteerGroupMutation,
  useGetSingleDriverQuery,
  useGetSingleGroupVolunteerQuery,
  useGetDriverWarehouseQuery
  
} = useApi;
