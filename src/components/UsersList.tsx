import { UsersData } from "@/pages/interfaces";
import { Button, List } from "antd";
import Image from "next/image";

type Props = {
  data: UsersData;
};

export default function UsersList({ data }: Props) {
  return (
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
              <p>
                {item.location.city}, {item.location.state}
              </p>
            }
          />
        </List.Item>
      )}
    />
  );
}