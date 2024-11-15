import { ReactElement, useRef, forwardRef } from "react";
import { IpaMlInput } from "../beer/edit/ipa_ml_input";

type IPAMLEditorProps = {
  inputText: string;
  setInputText: (payload: string) => void;
  disabled: boolean;
};

export default function IPAMLEditor({
  inputText,
  setInputText,
  disabled,
}: IPAMLEditorProps) {
  const textRef = useRef(null)
  const bBar = EditorButtonBar();
  const textBox = (
    <IpaMlInput
      inputText={inputText}
      setInputText={setInputText}
      disabled={disabled}
      ref={forwardRef(textRef)}
    />
  );


  return (
    <div className="flex flex-col h-full w-full">
      {bBar}
      {textBox}
    </div>
  );
}

function EditorButtonBar(textRef: MutableRefObject<null>) {
  const boldButton = ButtonChip({ bSymbol: "B", emphasis: "font-bold" , textRef});
  const italicsButton = ButtonChip({
    bSymbol: "i",
    emphasis: "font-style: italic",
    textRef
  });
  return (
    <div className="flex flex-row w-full border-solid border-2 border-gray-300 rounded e-md h-[2rem]">
      {boldButton}
      {italicsButton}
    </div>
  );
}

function ButtonChip({
  bSymbol,
  emphasis = "",
  charInsert = "*",
  textRef,
}: {
  bSymbol: string;
  emphasis: string;
  charInsert: string;
  textRef: MutableRefObject<null>;
}): ReactElement {
  const buttonOnClick = () => {
    const keyPressEvent = new KeyboardEvent('keydown', {
      key: charInsert
    });
    textRef.current.dispatchEvent(keyPressEvent);
  }
  return (
    <button
      className={
        "flex justify-center items-center w-[2rem] h-full hover:bg-stone-300 border-r-2 " +
        emphasis
      }
      onClick={buttonOnClick}
    >
      {bSymbol}
    </button>
  );
}
