import { Spin } from "antd";
import { useCallback, useState } from "react";
import { useFetchData } from "@/api/ramdomuser.me";
import OffsetControl from "@/components/OffsetControl";
import UsersList from "@/components/UsersList";

export default function Home() {
  const [offset, setOffset] = useState<number | null>(10);
  const [data, isLoading, isError] = useFetchData(offset);

  const handleOffsetChange = useCallback((value: number | null) => {
    if (!value) return setOffset(null);

    setOffset(Math.floor(value));
  }, []);

  return (
    <section className="h-screen w-full max-w-5xl flex flex-col items-center mx-auto">
      <h1 className="text-4xl font-semibold text-center my-8 text-zinc-800">
        Lista de Usuários
      </h1>
      <OffsetControl
        label="Quantidade de Usuários:"
        value={offset}
        onChange={handleOffsetChange}
      />

      {data && <UsersList data={data} />}

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
  );
}
