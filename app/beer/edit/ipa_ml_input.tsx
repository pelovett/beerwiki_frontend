import { ReactEventHandler, forwardRef } from "react";
import { MutableRefObject } from "react";

type IpaMlInputProps = {
  inputText: string;
  onSelect: ReactEventHandler<HTMLTextAreaElement>;
  setInputText: (payload: string) => void;
  disabled: boolean;
};

export const IpaMlInput = forwardRef<HTMLTextAreaElement, IpaMlInputProps>(
  ({ inputText, setInputText, disabled, onSelect }, ref) => {
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
        onSelect={onSelect}
      />
    );
  },
);
