import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = (props: ButtonProps) => {
  const { label, ...rest } = props;

  return (
    <button
      data-testid="buttonApp"
      className="bg-indigo-500 py-2 px-4 text-white font-semibold rounded-lg"
      {...rest}
    >
      {label}
    </button>
  );
};
