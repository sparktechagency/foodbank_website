import { baseApi } from "./baseApi";



const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    addVolunteerGroup: builder.mutation({
        query: (data) => {
          return {
            url: "/volunteer-group/create-volunteer-group",
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
          url: "/volunteer-group",
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
        url: `/volunteer-group/${id}`, 
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
  useUpdateVolunteerGroupMutation
  
} = useApi;
