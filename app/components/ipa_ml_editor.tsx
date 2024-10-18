
export default function IPAMLEditor() {
  const bBar = EditorButtonBar();

  return (
    <div className="flex-col">
      {bBar} 
    </div>
  );

}

function EditorButtonBar() {
  const boldButton = ButtonChip('B');
  const italicsButton = ButtonChip('I');
  return (
    <div className = "flex flex-row w-full bg-blue-600 rounded e-md h-[2rem]">
      {boldButton}
      {italicsButton}
    </div>
  )
}

function ButtonChip(bSymbol: string) {
    const font = "font-small"
    return (
        <div
          className={
            "flex justify-center items-center w-[2rem] h-full bg-red-600"
          }
        >
          {bSymbol}
        </div>
    );
}
