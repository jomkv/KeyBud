import IPhoto from "./photoType";
import { IUser } from "./userType";

export interface IPost {
  _id: string;
  title: string;
  description: string;
  likeCount: number;
  isLiked: boolean;
  ownerId: IUser;
  isEditted: boolean;
  images: IPhoto[];
  createdAt: string;
  updatedAt: string;
  commentCount: number;
  isPinned: boolean;
}

export interface IPostInput {
  title: string;
  description: string;
  images?: FileList;
}

export interface IPostState {
  posts: IPost[];
  post: IPost | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
}
