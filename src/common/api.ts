import axios from "axios";
import IUser from "../types/userType";

axios.defaults.baseURL = "http://localhost:4000/api";

class Api {
  constructor() {}

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
    try {
      const response = await axios.get("/posts");
      if (response.status === 200) {
        return response;
      } else {
        throw new Error("Could not connect to database");
      }
    } catch (e) {
      console.log("Error fetching Posts ", e);
    }
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
}

export default new Api();
