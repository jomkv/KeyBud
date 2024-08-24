import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL });

export const api = createApi({
  baseQuery,
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({}),
});
