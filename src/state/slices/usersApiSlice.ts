import { IUserCredentials, IUserPayload } from "../../@types/userType";
import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userCredentials: IUserCredentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: userCredentials,
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation<any, IUserPayload>({
      query: (userCredentials: IUserPayload) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: userCredentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
