import { parseBlock, formattedTextSection } from "./parsing";
import { ReactElement } from "react";

export function textSectionToJsx(
  textSection: formattedTextSection,
  key: Number
) {
  let style = "text-pretty inline-block ";
  if (textSection.lookupTable.get("*")) {
    style += "font-bold";
  }
  if (textSection.lookupTable.get("`")) {
    style += " italic";
  }

  return (
    <span key={key.toString()} className={style}>
      {textSection.text.replaceAll(" ", "\u00A0")}
    </span>
  );
}

export function formatAndRenderText(text: string) {
  const formattedText = parseBlock(text);

  let jsxSections: ReactElement[] = [];

  let i = 0;
  formattedText.forEach((textSection, _) => {
    jsxSections.push(textSectionToJsx(textSection, i));
    i += 1;
  });

  return (
    <p
      className="text-pretty max-w-full break-all"
      style={{ wordBreak: "break-word" }}
    >
      {jsxSections}
    </p>
  );
}
