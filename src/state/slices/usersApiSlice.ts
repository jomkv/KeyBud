import {
  IUser,
  IUserCredentials,
  IUsernameAndId,
  IUserPayload,
} from "../../@types/userType";
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
    getUserLikes: builder.query<IPost[], string>({
      query: (userId: string) => ({
        url: `${USERS_URL}/${userId}/likes`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.likedPosts,
    }),
    getUserPosts: builder.query<IPost[], string>({
      query: (userId: string) => ({
        url: `${USERS_URL}/${userId}/posts`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.userPosts,
    }),
    getUsernamesAndIds: builder.query<IUsernameAndId[], void>({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.users,
    }),
    getProfile: builder.query<IUser, string>({
      query: (userId: string) => ({
        url: `${USERS_URL}/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: { user: IUser }) => response.user,
    }),
    getMe: builder.query<IUser, void>({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "GET",
      }),
      transformResponse: (response: { user: IUser }) => response.user,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useGetUserLikesQuery,
  useGetUserPostsQuery,
  useGetUsernamesAndIdsQuery,
  useGetMeQuery,
} = usersApiSlice;
