import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { io, Socket } from "socket.io-client";
import { useUserContext } from "./UserContext";
import { IConvo, INewMessageEvent } from "../@types/messageType";

interface SocketContextType {
  socket: Socket | null;
  newMessageEvent: INewMessageEvent | null;
  newConversationEvent: IConvo | null;
  setNewConversationEvent: React.Dispatch<React.SetStateAction<IConvo | null>>;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  newMessageEvent: null,
  newConversationEvent: null,
  setNewConversationEvent: () => {},
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

function SocketContextProvider({ children }: PropsWithChildren<unknown>) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useUserContext();
  const [newMessageEvent, setNewMessageEvent] =
    useState<INewMessageEvent | null>(null);
  const [newConversationEvent, setNewConversationEvent] =
    useState<IConvo | null>(null);

  useEffect(() => {
    if (user) {
      const socket = io(process.env.REACT_APP_SOCKET_URL, {
        withCredentials: true,
      });

      setSocket(socket);

      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      socket.on("newMessage", (message: INewMessageEvent) => {
        setNewMessageEvent(message);
      });

      socket.on("newConversation", (data: { newConversation: IConvo }) => {
        setNewConversationEvent(data.newConversation);
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
    <SocketContext.Provider
      value={{
        socket,
        newMessageEvent,
        newConversationEvent,
        setNewConversationEvent,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
