import { ReactElement, useRef, useState} from "react";
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
  const [selection, setSelection] = useState<SelectionState>({
    start: 0,
    end: 0,
  });

  const handleSelect = () => {
    if (textareaRef.current) {
      setSelection({
        start: textareaRef.current.selectionStart,
        end: textareaRef.current.selectionEnd,
      });
    }
  };
  const textBox = (
    <IpaMlInput
      ref={textareaRef}
      inputText={inputText}
      setInputText={setInputText}
      disabled={disabled}
      onSelect={handleSelect}
    />
  );
  const bBar = EditorButtonBar(textareaRef, selection);

  return (
    <div className="flex flex-col h-full w-full">
      {bBar}
      {textBox}
    </div>
  );
}

function EditorButtonBar(textRef: React.RefObject<HTMLTextAreaElement>, selection: SelectionState) {
  const boldButton = ButtonChip({
    bSymbol: "B",
    charInsert: "*",
    emphasis: "font-bold",
    textRef,
    selection,
  });
  const italicsButton = ButtonChip({
    bSymbol: "i",
    charInsert: "`",
    emphasis: "font-style: italic",
    textRef,
    selection,
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
  selection,
}: {
  bSymbol: string;
  emphasis: string;
  charInsert: string;
  textRef: React.RefObject<HTMLTextAreaElement>;
  selection: SelectionState;
}): ReactElement {
  const buttonOnClick = (e: React.MouseEvent) => {
    console.log("Attempting click");
    e.preventDefault();
    if (textRef.current) {
      console.log("ref exists");
      // Restore the previous selection
      textRef.current.setSelectionRange(selection.start, selection.end);
      const keyPressEvent = new KeyboardEvent("keydown", {
        key: "a",
        bubbles: true,
      });
      textRef.current.dispatchEvent(keyPressEvent);
      console.log("Trying to print selection start of ref");
      console.log(textRef.current.selectionStart);
    }
  };
  return (
    <button
      className={
        "flex justify-center items-center w-[2rem] h-full hover:bg-stone-300 border-r-2 " +
        emphasis
      }
      onMouseDown={(e) => {e.preventDefault();}}
      onClick={buttonOnClick}
    >
      {bSymbol}
    </button>
  );
}
