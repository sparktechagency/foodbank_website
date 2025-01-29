import { baseApi } from "./baseApi";


const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    
    getProfile: builder.query({
      query: () => {
        return {
          url: "/admin/profile",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllUser: builder.query({
      query: ({searchTerm,sortOrder}) => {
        return {
          url: `/user?searchTerm=${searchTerm}&sortOrder=${sortOrder}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSuperAdmin: builder.query({
      query: () => {
        return {
          url: "/user/super-admin",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addUser: builder.mutation({
      query: (data) => {
        return {
          url: "/user/create-user",
          method: "POST",
          body: data,
        };
      },invalidatesTags: ["updateProfile"]
    }),

    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),


    forgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: email,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/check-otp",
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: ({id,data}) => {
        return {
          url: `/user/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: data,
        };
      },
    }),
   
  }),
});

export const {
  useLoginAdminMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetSuperAdminQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useAddUserMutation
} = useApi;
