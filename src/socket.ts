import { io } from "socket.io-client";

const URL = process.env.REACT_APP_API_URL;

export const socket = io(URL, {
  withCredentials: true,
});
