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
  useGetProfileQuery,
  useGetUserLikesQuery,
  useGetUserPostsQuery,
  useGetUsernamesAndIdsQuery,
  useGetMeQuery,
  useLazyGetMeQuery,
} = usersApiSlice;
