import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
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
import axios from "axios";

const initialState: IUserState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
};

export const loginAsync = createAsyncThunk<
  IUser,
  IUserCredentials,
  { rejectValue: IThunkError }
>("user/login", async (userCredentials: IUserCredentials, thunkAPI) => {
  try {
    const res: any = await axios.post(
      "http://localhost:4000/api/user/login",
      userCredentials
    );

    const user: IUser = res.data.userPayload;
    const token: string = res.data.token;

    localStorage.setItem("token", token);

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
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      { message: error.response?.data?.message } || "Register failed"
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state: IUserState) => {
      state.user = null;
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
    logout: (state: IUserState) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
    // Login
    builder
      .addCase(loginAsync.pending, (state) => {
        state.user = null;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User logged in";
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.message || "An unexpected error occured";
      });

    // Register
    builder
      .addCase(registerAsync.pending, (state) => {
        state.user = null;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
        state.isLoading = true;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User registered";
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload?.message || "An unexpected error occured";
      });
  },
});

export const { logout, reset, resetToast } = userSlice.actions;

export default userSlice.reducer;
