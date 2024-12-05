import { InputHTMLAttributes } from "react";

export const InputText = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { ...rest } = props;
  return (
    <input
      data-testid="inputText"
      className="border border-gray-500 rounded-lg py-1 px-2"
      {...rest}
    />
  );
};
