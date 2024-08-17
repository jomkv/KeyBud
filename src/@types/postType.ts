import IPhoto from "./photoType";

export interface IPost {
  _id: string;
  title: string;
  description: string;
  likeCount: number;
  comments: string[];
  ownerId: {
    _id: string;
    username: string;
  };
  isEditted: boolean;
}

export interface IPostInput {
  title: string;
  description: string;
  images?: IPhoto[];
}

export interface IPostState {
  posts: IPost[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
}
