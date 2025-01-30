import { apiSlice } from "./apiSlice";
import { SEARCH_URL } from "../constants";
import { IPost } from "../../@types/postType";
import { IUser } from "../../@types/userType";

const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.mutation<{ posts: IPost[]; users: IUser[] }, string>({
      query: (searchTerm: string) => ({
        url: SEARCH_URL,
        method: "POST",
        body: {
          query: searchTerm,
        },
      }),
    }),
    searchPosts: builder.mutation<IPost[], string>({
      query: (searchTerm: string) => ({
        url: `${SEARCH_URL}/posts`,
        method: "POST",
        body: {
          query: searchTerm,
        },
      }),
      transformResponse: (response: { posts: IPost[] }) => response.posts,
    }),
    searchUsers: builder.mutation<IUser[], string>({
      query: (searchTerm: string) => ({
        url: `${SEARCH_URL}/users`,
        method: "POST",
        body: {
          query: searchTerm,
        },
      }),
      transformResponse: (response: { users: IUser[] }) => response.users,
    }),
  }),
});

export const {
  useSearchMutation,
  useSearchPostsMutation,
  useSearchUsersMutation,
} = searchApiSlice;
