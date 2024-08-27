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

export const { useCreateCommentMutation, useGetPostCommentsQuery } =
  commentsApiSlice;
