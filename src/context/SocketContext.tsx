import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocketContext = () => {
  return useContext(SocketContext);
};

function SocketContextProvider({ children }: PropsWithChildren<unknown>) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useSelector((state: RootState) => state.auth).userInfo;

  useEffect(() => {
    if (user) {
      const socket = io(process.env.REACT_APP_SOCKET_URL, {
        withCredentials: true,
      });

      setSocket(socket);

      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
