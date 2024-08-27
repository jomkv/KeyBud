import { IUser } from "./userType";

export interface IComment {
  _id: string;
  comment: string;
  ownerId: IUser;
  repliesTo: string; // ID of the post
  createdAt: string;
  updatedAt?: string;
}

export interface ICommentInput {
  comment: string;
  repliesTo: string;
}
