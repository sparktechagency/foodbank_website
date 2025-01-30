import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://24.199.120.27:5000/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    // if (refreshToken) {
    //   headers.set("Authorization", `Bearer ${refreshToken}`);
    // }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["overview", "host"],
  endpoints: () => ({}),
});

export const imageUrl = "http://24.199.120.27:5000";
