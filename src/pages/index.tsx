import { Spin } from "antd";
import { useState } from "react";
import OffsetControl from "@/components/OffsetControl";
import UsersList from "@/components/UsersList";
import UserModal from "@/components/UserModal";
import { UserData } from "../types/interfaces";
import { useUserContext } from "@/context/UsersContext";

export default function Home() {
  const [modalData, setModalData] = useState<UserData | null>(null);
  const { users, isError, isLoading } = useUserContext();

  const handleUserClick = (id: string) => {
    if (!users) return;

    const user = users.find((user) => user.login.uuid === id);

    if (!user) return;

    setModalData(user);
  };

  return (
    <>
      <section className="h-screen w-full max-w-5xl flex flex-col items-center mx-auto">
        <h1 className="text-4xl font-semibold text-center my-8 text-zinc-800">
          Lista de Usuários
        </h1>
        <OffsetControl label="Quantidade de Usuários:" />

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
        <UserModal data={modalData} onClose={() => setModalData(null)} />
      )}
    </>
  );
}
