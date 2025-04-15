import { apiSlice } from "./apiSlice";
import { IComment, ICommentInput } from "../../@types/commentType";
import { COMMENTS_URL } from "../constants";

const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<any, ICommentInput>({
      query: (data: ICommentInput) => ({
        url: `${COMMENTS_URL}/${data.repliesTo}`,
        method: "POST",
        body: { comment: data.comment },
      }),
      invalidatesTags: ["Comment", "Post"],
    }),
    editComment: builder.mutation<any, ICommentInput>({
      query: (data: ICommentInput) => ({
        url: `${COMMENTS_URL}/${data.repliesTo}`,
        method: "PUT",
        body: { comment: data.comment },
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation<any, string>({
      query: (commentId) => ({
        url: `${COMMENTS_URL}/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment", "Post"],
    }),
    getPostComments: builder.query<IComment[], string>({
      query: (postId: string) => ({
        url: `${COMMENTS_URL}/all/${postId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: { comments: IComment[] }) =>
        response.comments,
      providesTags: ["Comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
} = commentsApiSlice;
