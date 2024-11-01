import {ReactElement} from "react";

export default function IPAMLEditor() {
  const bBar = EditorButtonBar();

  return (
    <div className="flex flex-col">
      {bBar} 
    </div>
  );

}

function EditorButtonBar() {
  const boldButton = ButtonChip({bSymbol: 'B', emphasis: 'font-bold'});
  const italicsButton = ButtonChip({bSymbol: 'i', emphasis: 'font-style: italic'});
  return (
    <div className = "flex flex-row w-full border-solid border-2 border-gray-300 rounded e-md h-[2rem]">
      {boldButton}
      {italicsButton}
    </div>
  )
}

function ButtonChip({
    bSymbol, 
    emphasis = "", 
}: {
    bSymbol: string;
    emphasis: string;
}): ReactElement {
    return (
        <button
          className={
            "flex justify-center items-center w-[2rem] h-full hover:bg-stone-300 border-r-2 "
            + emphasis
          }
        >
          {bSymbol}
        </button>
    );
}
