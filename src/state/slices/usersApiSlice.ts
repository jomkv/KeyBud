import { IUser, IUsernameAndId } from "../../@types/userType";
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
    getProfile: builder.query<
      {
        user: IUser;
        posts: IPost[];
        likes: IPost[];
      },
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
      providesTags: ["User", "Post", "Like"],
    }),
    getMe: builder.query<IUser, void>({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "GET",
      }),
      transformResponse: (response: { user: IUser }) => response.user,
    }),
    editProfile: builder.mutation<IUser, FormData>({
      query: (formData) => ({
        url: USERS_URL,
        method: "PUT",
        formData: true,
        body: formData,
      }),
      transformResponse: (response: { user: IUser }) => response.user,
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUserLikesQuery,
  useLazyGetUserLikesQuery,
  useGetUserPostsQuery,
  useLazyGetUserPostsQuery,
  useGetUsernamesAndIdsQuery,
  useGetMeQuery,
  useLazyGetMeQuery,
  useEditProfileMutation,
} = usersApiSlice;
