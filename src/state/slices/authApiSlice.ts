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
    verify: builder.mutation<
      any,
      { username: string; email: string; verificationCode: string }
    >({
      query: (userCredentials: {
        username: string;
        email: string;
        verificationCode: string;
      }) => ({
        url: `${AUTH_URL}/verify`,
        method: "POST",
        body: userCredentials,
      }),
    }),
    resend: builder.mutation<any, { email: string }>({
      query: (userCredentials: { email: string }) => ({
        url: `${AUTH_URL}/resend`,
        method: "POST",
        body: userCredentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyMutation,
  useResendMutation,
} = authApiSlice;
