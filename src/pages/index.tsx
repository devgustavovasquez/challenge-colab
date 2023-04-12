import { Button, InputNumber, List } from "antd";
import { useEffect, useState } from "react";
import { APIResponse } from "./interfaces";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState<APIResponse>();

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => setData(data));

    return () => {
      setData(undefined);
    };
  }, []);

  return (
    <section className="flex flex-col items-center justify-center max-w-5xl m-auto">
      <h1 className="text-4xl font-semibold text-center my-8 text-zinc-800">
        Lista de Usuários
      </h1>
      <div className="flex items-center gap-2">
        <label className="cursor-pointer py-2 px-1" htmlFor="users">
          Quantidade de usuários:
        </label>
        <InputNumber defaultValue={10} id="users" />
      </div>
      {data && (
        <List
          className="w-full p-3"
          itemLayout="horizontal"
          dataSource={data.results}
          renderItem={(item) => (
            <List.Item
              className="border-2 border-gray-200 rounded-lg p-4"
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
    </section>
  );
}
