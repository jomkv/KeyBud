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
      query: (post: IPostInput) => {
        // let bodyFormData = new FormData()
        // bodyFormData.append("images", post?.images)
        // * TODO: Fix this
        return {
          url: POSTS_URL,
          method: "POST",
          body: post,
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useLikePostMutation,
  useCreatePostMutation,
} = postsApiSlice;
