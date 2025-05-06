import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../@types/userType";
import { useLazyGetMeQuery } from "../state/slices/usersApiSlice";

interface UserContextType {
  user: IUser | null;
  setUser: ((user: IUser | null) => void) | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  isSuccess: false,
  isError: false,
});

const useUserContext = () => {
  return useContext(UserContext);
};

function UserProvider({ children }: PropsWithChildren<unknown>) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [
    getMe,
    {
      data: res,
      isSuccess,
      isLoading: isQueryLoading,
      isError: isQueryError,
      error,
    },
  ] = useLazyGetMeQuery();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (res && isSuccess) {
      setUser(res);
    }
    setIsLoading(isQueryLoading);
  }, [res, isSuccess, isQueryLoading]);

  useEffect(() => {
    if (user) {
      setIsError(false);
    }
  }, [user]);

  useEffect(() => {
    setIsError(isQueryError);
  }, [isQueryError]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, isSuccess, isError }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider, useUserContext };
