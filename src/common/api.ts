import axios from "axios";

import { IPost, IPostInput } from "../@types/postType";
import { IUser, IUserCredentials, IUserPayload } from "../@types/userType";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

class Api {
  async login(userCredentials: IUserCredentials) {
    const res: any = await axios.post("/user/login", userCredentials);

    const user: IUser = res.data.userPayload;
    const token: string = res.data.token;

    localStorage.setItem("token", token);

    return user;
  }

  async signup(userData: IUserPayload) {
    const res: any = await axios.post(
      "http://localhost:4000/api/user/register",
      userData
    );

    return res;
  }

  async getPosts() {
    const res: any = await axios.get("/posts");

    const posts: IPost[] = res.data.posts;

    return posts;
  }

  async getPost(postId: string) {
    const res = await axios.get(`/posts/${postId}`);

    const post: IPost = res.data.post;

    return post;
  }

  async createPost(data: IPostInput) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res: any = await axios.post("/posts", data, config);

    return res;
  }

  async likePost(postId: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res: any = await axios.post(`/posts/${postId}/like`, {}, config);

    return res;
  }

  async getUserLikes() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res: any = await axios.get("/user/likes", config);

    console.log(res);

    const likes: string[] = res.data.likedPosts;

    return likes;
  }
}

export default new Api();
