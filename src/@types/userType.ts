import IPhoto from "./photoType";

interface IUser {
  _id?: string;
  id?: string;
  username: string;
  email: string;
  switchType?: string;
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
  userInfo: IUser | null;
}

export type { IUser, IUserPayload, IUserCredentials, IUserState };
