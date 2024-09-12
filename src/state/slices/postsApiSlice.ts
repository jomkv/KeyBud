import { apiSlice } from "./apiSlice";
import { POSTS_URL } from "../constants";
import { IPost, IPostInput } from "../../@types/postType";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => ({
        url: POSTS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: { posts: IPost[] }) => response.posts,
    }),
    getPost: builder.query<IPost, string>({
      query: (postId: string) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: { post: IPost }) => response.post,
    }),
    likePost: builder.mutation<any, string>({
      query: (postId: string) => ({
        url: `${POSTS_URL}/${postId}/like`,
        method: "POST",
      }),
    }),
    createPost: builder.mutation<any, IPostInput>({
      query: (post: IPostInput) => ({
        url: POSTS_URL,
        method: "POST",
        body: post,
        formData: true,
      }),
    }),
    pinPost: builder.mutation<any, string>({
      query: (postId: string) => ({
        url: `${POSTS_URL}/${postId}/pin`,
        method: "POST",
      }),
    }),
    deletePost: builder.mutation<any, string>({
      query: (postId: string) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useLikePostMutation,
  useCreatePostMutation,
  usePinPostMutation,
  useDeletePostMutation,
} = postsApiSlice;
