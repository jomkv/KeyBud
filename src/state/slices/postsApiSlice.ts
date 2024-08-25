import { apiSlice } from "./apiSlice";
import { POSTS_URL } from "../constants";
import { IPost } from "../../@types/postType";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => ({
        url: POSTS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response: { posts: IPost[] }) => response.posts,
    }),
    getPost: builder.query<IPost, string>({
      query: (postId: string) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response: { post: IPost }) => response.post,
    }),
    likePost: builder.mutation<any, string>({
      query: (postId: string) => ({
        url: `${POSTS_URL}/${postId}/like`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useLikePostMutation } =
  postsApiSlice;
