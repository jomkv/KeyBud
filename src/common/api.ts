import axios from "axios";
import { IPost, IPostInput } from "../@types/postType";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

class Api {
  async login(userData: any) {
    try {
      const response = await axios.post("/user/login", userData);
      if (response.status === 200) {
        console.log(response);
      } else {
        console.log("wrong");
      }
    } catch (e) {
      console.log("Error logging in.", e);
    }
  }

  async signup(userData: any) {
    try {
      const response = await axios.post("/user/login", userData);
      if (response.status === 200) {
        console.log(response);
      } else {
        console.log("wrong");
      }
    } catch (e) {
      console.log("Error loggin in.", e);
    }
  }

  async getPosts() {
    const res: any = await axios.get("/posts");

    const posts: IPost[] = res.data.posts;

    return posts;
  }

  async getPost(postId: string) {
    try {
      const response = await axios.get("/posts/" + postId);

      if (response.status === 200) {
        return response;
      } else {
        throw new Error("Could not connect to database");
      }
    } catch (e) {
      console.log("Error fetching Posts ", e);
    }
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
}

export default new Api();
