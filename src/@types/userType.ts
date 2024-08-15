import IPhoto from "./photoType";

interface IUser {
  username: string;
  email: string;
  switchType: string;
  icon?: IPhoto;
}

interface IUserPayload {
  username: string;
  email: string;
  password: string;
  switchType?: string;
}

interface IUserCredentials {
  usernameOrEmail: string;
  password: string;
}

interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
}

export type { IUser, IUserPayload, IUserCredentials, IUserState };
