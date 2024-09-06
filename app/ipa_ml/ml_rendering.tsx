import { parseBlock, formattedTextSection } from "./parsing";
import { ReactElement } from "react";

export function textSectionToJsx(textSection: formattedTextSection) {
  let style = "text-pretty inline-block ";
  if (textSection.lookupTable.get("*")) {
    style += "font-bold";
  }
  if (textSection.lookupTable.get("`")) {
    style += " italic";
  }

  return (
    <span className={style}>{textSection.text.replaceAll(" ", "\u00A0")}</span>
  );
}

export function formatAndRenderText(text: string) {
  const formattedText = parseBlock(text);

  let jsxSections: ReactElement[] = [];

  formattedText.textSections.forEach((textSection) => {
    jsxSections.push(textSectionToJsx(textSection));
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
