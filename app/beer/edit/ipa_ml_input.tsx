type IpaMlInputProps = {
  inputText: string;
  setInputText: (payload: string) => void;
  disabled: boolean;
};

export function IpaMlInput({
  inputText,
  setInputText,
  disabled,
}: IpaMlInputProps) {
  const handleInputChange = (event: { target: { value: string } }) => {
    setInputText(event.target.value);
  };

  return (
    <textarea
      name="IPAML Input"
      autoComplete="off"
      className="block h-full w-full rounded-md border-0 py-1.5 pl-3.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 mx-5"
      value={inputText}
      onChange={handleInputChange}
      disabled={disabled}
    />
  );
}
