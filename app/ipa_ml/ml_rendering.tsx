import { parseBlock, formattedTextSection } from "./parsing";

export function textSectionToJsx(textSection: formattedTextSection) {
  let style = "";
  if (textSection.lookupTable.get("*")) {
    style += "strong";
  }
  if (textSection.lookupTable.get("`")) {
    style += " italic";
  }

  return (
    <>
      <p className={style}>{textSection.text}</p>
    </>
  );
}
