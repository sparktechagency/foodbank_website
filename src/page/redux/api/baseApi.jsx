import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.0.60.118:7000/api/v1",
  // https://backend.volunhelp.com/api/v1
  // 10.0.60.118:7000
  
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

export const imageUrl = "http://10.0.60.118:7000";
