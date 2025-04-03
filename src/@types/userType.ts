import IPhoto from "./photoType";

interface IUser {
  id: string;
  _id?: string;
  username?: string;
  switchType: string;
  password?: string;
  email: string;
  icon?: string;
  usernameEditedAt?: string;
}

interface IUsernameAndId {
  _id: string;
  username: string;
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

export type {
  IUser,
  IUserPayload,
  IUserCredentials,
  IUserState,
  IUsernameAndId,
};
