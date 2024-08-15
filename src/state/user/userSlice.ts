import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  GetThunkAPI,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import {
  IUser,
  IUserCredentials,
  IUserPayload,
  IUserState,
} from "../../@types/userType";
import IThunkError from "../../@types/thunkErrorType";
import axios, { AxiosError } from "axios";

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk<
  IUser,
  IUserCredentials,
  { rejectValue: IThunkError }
>("user/login", async (userCredentials: IUserCredentials, thunkAPI) => {
  try {
    const user: IUser = await axios.post(
      "http://localhost:4000/api/user/login",
      userCredentials
    );

    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { message: error.response?.data?.message } || "Login failed"
    );
  }
});

export const registerAsync = createAsyncThunk<
  void,
  IUserPayload,
  { rejectValue: IThunkError }
>("user/register", async (userCredentials: IUserPayload, thunkAPI) => {
  try {
    const res: any = await axios.post(
      "http://localhost:4000/api/user/register",
      userCredentials
    );

    console.log(res);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { message: error.response?.data?.message } || "Register failed"
    );
  }
});

const userSlice: Slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state: IUserState) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
    // Login
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An unexpected error occured";
      });

    // Register
    builder
      .addCase(registerAsync.pending, (state) => {
        state.error = null;
        state.user = null;
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An unexpected error occured";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
