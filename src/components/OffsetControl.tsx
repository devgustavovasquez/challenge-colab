import { useUserContext } from "@/context/UsersContext";
import { InputNumber, InputNumberProps } from "antd";
import { useCallback } from "react";

type OffsetControlProps = {
  label: string;
};

type Props = OffsetControlProps & InputNumberProps<number>;

export default function OffsetControl({ label, ...rest }: Props) {
  const { offset, setOffset } = useUserContext();

  const handleChange = useCallback(
    (value: number | null) => {
      if (value === null || value <= 0) {
        setOffset(null);
        return;
      }

      if (value) {
        setOffset(Math.floor(value));
      }
    },
    [setOffset]
  );

  return (
    <div className="flex items-center gap-2">
      <label className="cursor-pointer py-2 px-1" htmlFor={rest.id}>
        {label}
      </label>
      <InputNumber
        type="number"
        min={0}
        value={offset}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
}
