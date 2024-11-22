import { ReactElement, useRef, forwardRef, MutableRefObject } from "react";
import { IpaMlInput } from "../beer/edit/ipa_ml_input";

type IPAMLEditorProps = {
  inputText: string;
  setInputText: (payload: string) => void;
  disabled: boolean;
};

// Keep track of selection
interface SelectionState {
  start: number;
  end: number;
}

export default function IPAMLEditor({
  inputText,
  setInputText,
  disabled,
}: IPAMLEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textBox = (
    <IpaMlInput
      ref={textareaRef}
      inputText={inputText}
      setInputText={setInputText}
      disabled={disabled}
    />
  );
  const bBar = EditorButtonBar(textareaRef);

  return (
    <div className="flex flex-col h-full w-full">
      {bBar}
      {textBox}
    </div>
  );
}

function EditorButtonBar(textRef: React.RefObject<HTMLTextAreaElement>) {
  const boldButton = ButtonChip({
    bSymbol: "B",
    charInsert: "*",
    emphasis: "font-bold",
    textRef,
  });
  const italicsButton = ButtonChip({
    bSymbol: "i",
    charInsert: "`",
    emphasis: "font-style: italic",
    textRef,
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
  textRef: React.RefObject<HTMLTextAreaElement>;
}): ReactElement {
  const buttonOnClick = () => {
    console.log("Attempting click");
    if (textRef.current) {
      console.log("ref exists");
      const keyPressEvent = new KeyboardEvent("keydown", {
        key: charInsert,
        bubbles: true,
        cancelable: true,
      });
      textRef.current.dispatchEvent(keyPressEvent);
    }
  };
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
