import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api";

class Api {
  constructor() {}

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
}

export default new Api();
