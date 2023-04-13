import { Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useFetchData } from "@/api/ramdomuser.me";
import OffsetControl from "@/components/OffsetControl";
import UsersList from "@/components/UsersList";
import UserModal from "@/components/UserModal";
import { UserData } from "./interfaces";

export default function Home() {
  const [offset, setOffset] = useState<number | null>(10);
  const [modalData, setModalData] = useState<UserData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [data, isLoading, isError] = useFetchData(offset);

  useEffect(() => {
    if (!data) return;

    setUsers((prevUsers) => [...prevUsers, ...data]);
  }, [data]);

  const handleOffsetChange = useCallback((value: number | null) => {
    if (!value) return setOffset(null);

    setOffset(Math.floor(value));
  }, []);

  const handleUserClick = (id: string) => {
    if (!users) return;

    const user = users.find((user) => user.login.uuid === id);

    if (!user) return;

    setModalData(user);
  };

  const handleRemoveUser = (id: string) => {
    if (!users) return;

    const newUsers = users.filter((user) => user.login.uuid !== id);

    setUsers(newUsers);
  };

  return (
    <>
      <section className="h-screen w-full max-w-5xl flex flex-col items-center mx-auto">
        <h1 className="text-4xl font-semibold text-center my-8 text-zinc-800">
          Lista de Usuários
        </h1>
        <OffsetControl
          label="Quantidade de Usuários:"
          value={offset}
          onChange={handleOffsetChange}
        />

        {users && <UsersList data={users} onUserClick={handleUserClick} />}

        {isLoading && (
          <div className="h-full w-full flex items-center justify-center">
            <Spin size="large" tip="Carregando..." />
          </div>
        )}

        {isError && (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-2xl font-semibold text-center text-zinc-800">
              Ocorreu um erro ao carregar os dados..
            </p>
          </div>
        )}
      </section>
      {modalData && (
        <UserModal
          data={modalData}
          onClose={() => setModalData(null)}
          onToggleUser={handleRemoveUser}
        />
      )}
    </>
  );
}
