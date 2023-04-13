import { createContext, useContext, useEffect, useState } from "react";
import { useFetchData } from "@/api/ramdomuser.me";
import { UserData } from "@/types/interfaces";

type UserContextData = {
  users: UserData[];
  isLoading: boolean;
  isError: boolean;
  offset: number | null;
  setOffset: (offset: number | null) => void;
  toggleUser: (id: string) => Promise<void>;
};

const UserContext = createContext<UserContextData>({
  users: [],
  isLoading: false,
  isError: false,
  offset: 10,
  setOffset: () => void 0,
  toggleUser: () => Promise.resolve(),
});

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [offset, setOffset] = useState<number | null>(10);
  const [data, isLoading, isError, fetchData] = useFetchData(offset);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const toggleUser = async (id: string) => {
    const usersWithoutUser = users.filter((user) => user.login.uuid !== id);

    await fetchData(1, usersWithoutUser);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        isError,
        offset,
        setOffset,
        toggleUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
}
