import { ReactElement, useRef, useState, SyntheticEvent } from "react";
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

  const handleSelect = (event: SyntheticEvent<HTMLTextAreaElement, Event>) => {
    console.log(`Handling select event: ${event.target}`);
    setSelection({
      start: event.currentTarget.selectionStart,
      end: event.currentTarget.selectionEnd,
    });
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
  const bBar = EditorButtonBar(textareaRef, selection, inputText, setInputText);

  return (
    <div className="flex flex-col h-full w-full">
      {bBar}
      {textBox}
    </div>
  );
}

function EditorButtonBar(
  textRef: React.RefObject<HTMLTextAreaElement>,
  selection: SelectionState,
  inputText: string,
  setInputText: (payload: string) => void,
) {
  const boldButton = ButtonChip({
    bSymbol: "B",
    charInsert: "*",
    emphasis: "font-bold",
    textRef,
    selection,
    inputText,
    setInputText,
  });
  const italicsButton = ButtonChip({
    bSymbol: "i",
    charInsert: "`",
    emphasis: "font-style: italic",
    textRef,
    selection,
    inputText,
    setInputText,
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
  inputText,
  setInputText,
}: {
  bSymbol: string;
  emphasis: string;
  charInsert: string;
  textRef: React.RefObject<HTMLTextAreaElement>;
  selection: SelectionState;
  inputText: string;
  setInputText: (payload: string) => void;
}): ReactElement {
  const buttonOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Restore the previous selection
    let text1 = inputText.slice(0, selection.start);
    let text2 = inputText.slice(selection.start, selection.end);
    let text3 = inputText.slice(selection.end);
    setInputText(text1 + charInsert + text2 + charInsert + text3);
    console.log(`Text ref current value is ${textRef.current}`);
    console.log(textRef.current)

    const newRef = textRef.current;
    const newStart = selection.start+ 1;  // +1 for the first asterisk
    const newEnd = selection.end + 1;      // +1 for the first asterisk

    setTimeout(() => {
      if (newRef) {
        console.log("Reached if statement");
        newRef.setSelectionRange(
          newStart,
          newEnd,
        );
        newRef.focus();
        console.log(`Text ref current value is ${newRef}`);
        console.log(newRef)
      }
    }, 0);
  };
  return (
    <button
      className={
        "flex justify-center items-center w-[2rem] h-full hover:bg-stone-300 border-r-2 select-none" +
        emphasis
      }
      onMouseDown={(e) => {
        e.preventDefault();
        console.log(textRef.current);
      }}
      onClick={buttonOnClick}
    >
      {bSymbol}
    </button>
  );
}
