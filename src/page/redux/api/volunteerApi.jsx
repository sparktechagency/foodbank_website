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
      query: ({searchTerm , sortOrder, page, limit}) => {
        return {
          url: `/volunteers?searchTerm=${searchTerm}&sortOrder=${sortOrder}&page=${page}&limit${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }), 

    getDriverWarehouse: builder.query({
      query: ({limit,type}) => {
        console.log('rtk',type)
        return {
          url: `/volunteers/driver-warehouse?limit=${limit}&type=${type}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }), 

    getAllDriverVolunteer: builder.query({
      query: ({searchTerm}) => {
        return {
          url: `/driver?searchTerm=${searchTerm}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }), 

    getDriver: builder.query({
      query: ({searchTerm,sortOrder,page,limit}) => {
        return {
          url: `/driver?searchTerm=${searchTerm}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }), 

    getWarehouse: builder.query({
      query: ({searchTerm,sortOrder,page,limit}) => {
        return {
          url: `/warehouse?searchTerm=${searchTerm}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getWarehouseEvent: builder.query({
      query: ({searchTerm}) => {
        return {
          url: `/warehouse?searchTerm=${searchTerm}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getVolunteersGroup: builder.query({
      query: ({types,sortOrder,searchTerm,page,limit}) => {
        console.log(limit)
        return {
          // url: `/client-group/driver-modify-client?volunteerType=${types}&searchTerm=${searchTerm}&sortOrder=${sortOrder}&page=${page}&page=${limit}`,
          url: `/client-group/driver-modify-client?volunteerType=${types}&sortOrder=${sortOrder}&searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
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
  useGetDriverWarehouseQuery,
  useGetAllDriverVolunteerQuery,
  useGetWarehouseEventQuery
} = useApi;
