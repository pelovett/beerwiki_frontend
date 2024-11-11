import { useRef } from "react";
import { MutableRefObject } from "react"

type IpaMlInputProps = {
  inputText: string;
  setInputText: (payload: string) => void;
  disabled: boolean;
  ref: MutableRefObject<null>
};

export function IpaMlInput({
  inputText,
  setInputText,
  disabled,
  ref,
}: IpaMlInputProps) {
  const handleInputChange = (event: { target: { value: string } }) => {
    setInputText(event.target.value);
  };

  return (
    <textarea
      ref={ref}
      name="IPAML Input"
      autoComplete="off"
      className="block h-full w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      value={inputText}
      onChange={handleInputChange}
      disabled={disabled}
    />
  );
}
