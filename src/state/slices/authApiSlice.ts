import { IUserCredentials, IUserPayload } from "../../@types/userType";
import { apiSlice } from "./apiSlice";
import { AUTH_URL } from "../constants";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userCredentials: IUserCredentials) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: userCredentials,
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation<any, IUserPayload>({
      query: (userCredentials: IUserPayload) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: userCredentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApiSlice;
