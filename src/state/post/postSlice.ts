import { IPost, IPostInput, IPostState } from "../../@types/postType";
import IThunkError from "../../@types/thunkErrorType";
import Api from "../../common/Api";

import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

const initialState: IPostState = {
  posts: [],
  post: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
};

export const getAllPostsAsync = createAsyncThunk<
  IPost[],
  null,
  { rejectValue: IThunkError }
>("post/getAll", async (_, thunkAPI) => {
  try {
    return await Api.getPosts();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { message: error.response?.data?.message } || "Get all posts failed"
    );
  }
});

export const getPostAsync = createAsyncThunk<
  IPost,
  string,
  { rejectValue: IThunkError }
>("post/get", async (postId: string, thunkAPI) => {
  try {
    return await Api.getPost(postId);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { message: error.response?.data?.message } || "Get post failed"
    );
  }
});

export const createPostAsync = createAsyncThunk<
  void,
  IPostInput,
  { rejectValue: IThunkError }
>("post/create", async (data: IPostInput, thunkAPI) => {
  try {
    await Api.createPost(data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { message: error.response?.data?.message } || "Create post failed"
    );
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state: IPostState) => {
      state.posts = [];
      state.post = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    },
    resetToast: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IPostState>) => {
    // Get all posts
    builder
      .addCase(getAllPostsAsync.pending, (state) => {
        state.posts = [];
        state.post = null;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
        state.isLoading = true;
      })
      .addCase(
        getAllPostsAsync.fulfilled,
        (state, action: PayloadAction<IPost[]>) => {
          state.posts = action.payload;
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "Get all posts success";
        }
      )
      .addCase(getAllPostsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.message || "An unexpected error occured";
      });

    // Get post
    builder
      .addCase(getPostAsync.pending, (state) => {
        state.post = null;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
        state.isLoading = true;
      })
      .addCase(
        getPostAsync.fulfilled,
        (state, action: PayloadAction<IPost>) => {
          state.post = action.payload;
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "Get post success";
        }
      )
      .addCase(getPostAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.message || "An unexpected error occured";
      });

    // Create post
    builder
      .addCase(createPostAsync.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
        state.isLoading = true;
      })
      .addCase(createPostAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Create post success";
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.message || "An unexpected error occured";
      });
  },
});

export const { reset, resetToast } = postSlice.actions;

export default postSlice.reducer;
