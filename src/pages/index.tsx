import { Button, List } from "antd";
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
    <>
      {data && (
        <List
          className="my-20 mx-80"
          itemLayout="horizontal"
          dataSource={data.results}
          renderItem={(item) => (
            <List.Item
              actions={[<Button key={`link-${item.id.value}`}>Opções</Button>]}
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
                description={item.email}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
}
