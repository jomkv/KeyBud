import IPhoto from "./photoType";

interface IUser {
  username: string;
  email: string;
  password: string;
  switchType: string;
  icon?: IPhoto;
}

export default IUser;
