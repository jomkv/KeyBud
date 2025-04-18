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
      providesTags: ["Post"],
    }),
    getPost: builder.query<IPost, string>({
      query: (postId: string) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: { post: IPost }) => response.post,
      providesTags: ["Post"],
    }),
    likePost: builder.mutation<any, string>({
      query: (postId: string) => ({
        url: `${POSTS_URL}/${postId}/like`,
        method: "POST",
      }),
    }),
    createPost: builder.mutation<any, FormData>({
      query: (post: FormData) => ({
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
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation<any, { post: FormData; postId: string }>({
      query: ({ post, postId }) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "PUT",
        body: post,
        formData: true,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<any, string>({
      query: (postId: string) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useLikePostMutation,
  useCreatePostMutation,
  usePinPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = postsApiSlice;
