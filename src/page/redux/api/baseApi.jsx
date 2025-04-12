import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://172.0.1.108:5000/api/v1",
  // https://backend.volunhelp.com/api/v1
  // http://172.0.1.108:5000/api/v1
  
  prepareHeaders: (headers, { getState }) => {
    const token = getState().logInUser.token;
  
    if (token) {
      headers.set("authorization", `${token}`);
    }
   
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["overview", "host"],
  endpoints: () => ({}),
});



export const imageUrl = "https://backend.volunhelp.com";
