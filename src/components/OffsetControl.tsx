import { InputNumber, InputNumberProps } from "antd";

type OffsetControlProps = {
  label: string;
};

type Props = OffsetControlProps & InputNumberProps<number>;

export default function OffsetControl({ label, ...rest }: Props) {
  return (
    <div className="flex items-center gap-2">
      <label className="cursor-pointer py-2 px-1" htmlFor={rest.id}>
        {label}
      </label>
      <InputNumber type="number" min={0} {...rest} />
    </div>
  );
}
