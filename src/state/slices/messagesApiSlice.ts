import { apiSlice } from "./apiSlice";
import { MESSAGES_URL } from "../constants";
import { IConvo } from "../../@types/messageType";

const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<IConvo[], void>({
      query: () => ({
        url: `${MESSAGES_URL}/`,
        method: "GET",
      }),
      transformResponse: (response: { conversations: any }) =>
        response.conversations,
    }),
    sendMessage: builder.mutation({
      query: (data: { receiverId: string; message: string }) => ({
        url: `${MESSAGES_URL}/send/${data.receiverId}`,
        method: "POST",
        body: { message: data.message },
      }),
    }),
  }),
});

export const { useGetConversationsQuery, useSendMessageMutation } =
  messagesApiSlice;
