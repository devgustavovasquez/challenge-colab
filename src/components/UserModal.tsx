import { useUserContext } from "@/context/UsersContext";
import { UserData } from "@/types/interfaces";
import { Button } from "antd";
import Image from "next/image";

type Props = {
  data: UserData;
  onClose: () => void;
};

export default function UserModal({ data, onClose }: Props) {
  const { toggleUser } = useUserContext();

  const handleGender = (value: string) => {
    if (value === "female") {
      return "🚺";
    } else if (value === "male") {
      return "🚹";
    } else {
      return "⚧️";
    }
  };

  const handleToggleUser = (id: string) => {
    toggleUser(id);
    onClose();
  };

  return (
    <section className="w-screen h-screen absolute top-0 bottom-0 bg-black bg-opacity-20 z-10 flex items-center justify-center">
      <div className="relative w-full h-full max-w-4xl md:max-h-[24rem] max-h-[75%] bg-white rounded-lg shadow-lg py-3 m-4">
        <Button
          type="default"
          className="absolute top-0 right-0 mt-4 mr-4"
          onClick={onClose}
        >
          Fechar
        </Button>
        <div className="h-1/2 flex md:flex-row flex-col justify-center md:justify-normal items-center gap-2 md:px-8 px-2">
          <Image
            className="border-2 border-gray-200"
            src={data.picture.large}
            width={128}
            height={128}
            alt="Picture of the author"
          />
          <div>
            <p className="font-bold text-ellipsis">
              {data.name.title} {data.name.first} {data.name.last}
            </p>
            <p>
              {data.location.city}, {data.location.state}
            </p>
            <p>{data.dob.age} anos</p>
            <p>{handleGender(data.gender)}</p>
          </div>
        </div>
        <hr />
        <div className="h-1/2 w-full flex md:flex-row flex-col justify-center md:justify-normal items-center md:px-8">
          <ul className="w-full py-4 flex flex-col md:items-start items-center gap-1.5">
            <li>
              📞 <span>{data.phone}</span>
            </li>
            <li>
              📧 <span>{data.email}</span>
            </li>
            <li>
              🏠{" "}
              <span>
                {data.location.street.name}, {data.location.street.number}
              </span>
            </li>
            <li>
              🌐 <span>{data.location.country}</span>
            </li>
            <li>
              🪪 <span>{data.id.value || "Sem registro"}</span>
            </li>
          </ul>
          <hr className="h-full border-r-2 border-gray-200 hidden md:block" />
          <div className="w-full flex flex-col justify-center items-center">
            <span>Quer trocar esse usuário?</span>
            <div className="flex gap-2">
              <Button
                type="dashed"
                className="mt-4"
                onClick={() => handleToggleUser(data.login.uuid)}
              >
                ✅
              </Button>
              <Button type="dashed" className="mt-4" onClick={onClose}>
                ❌
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
