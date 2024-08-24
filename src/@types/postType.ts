import IPhoto from "./photoType";

export interface IPost {
  _id: string;
  title: string;
  description: string;
  likeCount: number;
  isLiked: boolean;
  ownerId: {
    _id: string;
    username: string;
  };
  isEditted: boolean;
  images: IPhoto[];
  createdAt: string;
  updatedAt: string;
}

export interface IPostInput {
  title: string;
  description: string;
  images?: IPhoto[];
}

export interface IPostState {
  posts: IPost[];
  post: IPost | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
}
