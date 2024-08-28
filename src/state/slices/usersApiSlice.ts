import { IUser, IUserCredentials, IUserPayload } from "../../@types/userType";
import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
import { IPost } from "../../@types/postType";

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
    getProfile: builder.query<
      { user: IUser; posts: IPost[]; likes: IPost[] },
      string
    >({
      query: (userId: string) => ({
        url: `${USERS_URL}/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: {
        user: IUser;
        posts: IPost[];
        likes: IPost[];
      }) => ({
        user: response.user,
        posts: response.posts,
        likes: response.likes,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProfileQuery,
} = usersApiSlice;
