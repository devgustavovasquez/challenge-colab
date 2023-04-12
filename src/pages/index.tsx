import { Button, InputNumber, List, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { APIResponse } from "./interfaces";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState<APIResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState<number | null>(10);

  useEffect(() => {
    if (!offset) return setData(undefined);
    setIsLoading(true);

    fetch(`https://randomuser.me/api/?results=${offset}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .finally(() => setIsLoading(false));

    return () => {
      setData(undefined);
    };
  }, [offset]);

  const handleOffsetChange = useCallback((value: number | null) => {
    if (!value) return setOffset(null);

    setOffset(Math.floor(value));
  }, []);

  return (
    <section className="min-h-screen w-full max-w-5xl flex flex-col items-center mx-auto">
      <h1 className="text-4xl font-semibold text-center my-8 text-zinc-800">
        Lista de Usuários
      </h1>
      <div className="flex items-center gap-2">
        <label className="cursor-pointer py-2 px-1" htmlFor="offset">
          Quantidade de usuários:
        </label>
        <InputNumber
          id="offset"
          onChange={handleOffsetChange}
          type="number"
          value={offset}
          min={0}
          max={100}
        />
      </div>
      {data && (
        <List
          className="w-full p-3"
          itemLayout="horizontal"
          dataSource={data.results}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="default" key={`link-${item.login.uuid}`}>
                  Ver mais
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    className="rounded-full border-2 border-gray-200"
                    src={item.picture.large}
                    width={48}
                    height={48}
                    alt="Picture of the author"
                  />
                }
                title={
                  <p className="font-bold">
                    {item.name.first} {item.name.last}
                  </p>
                }
                description={
                  <p className="text-clip md:block flex-nowrap">
                    {item.location.city}, {item.location.state}
                  </p>
                }
              />
            </List.Item>
          )}
        />
      )}
      {isLoading && (
        <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center">
          <Spin size="large" tip="Carregando..." />
        </div>
      )}
    </section>
  );
}
