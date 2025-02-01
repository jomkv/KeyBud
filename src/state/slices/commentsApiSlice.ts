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
    }),
    editComment: builder.mutation<any, ICommentInput>({
      query: (data: ICommentInput) => ({
        url: `${COMMENTS_URL}/${data.repliesTo}`,
        method: "PUT",
        body: { comment: data.comment },
      }),
    }),
    deleteComment: builder.mutation<any, string>({
      query: (commentId) => ({
        url: `${COMMENTS_URL}/${commentId}`,
        method: "DELETE",
      }),
    }),
    getPostComments: builder.query<IComment[], string>({
      query: (postId: string) => ({
        url: `${COMMENTS_URL}/all/${postId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: { comments: IComment[] }) =>
        response.comments,
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
} = commentsApiSlice;
