import { parseBlock, formattedTextSection } from "./parsing";
import { ReactElement } from 'react'

export function textSectionToJsx(textSection: formattedTextSection) {
  let style = "";
  if (textSection.lookupTable.get("*")) {
    style += "font-bold";
  }
  if (textSection.lookupTable.get("`")) {
    style += " italic";
  }

  return (
    <>
      <span className={style}>{textSection.text}</span>
    </>
  );
}

export function formatAndRenderText(text: string) {
    const formattedText = parseBlock(text);

    let jsxSections: ReactElement[] = [];

    formattedText.forEach((textSection, _) => {
        jsxSections.push(textSectionToJsx(textSection))
    });

    return (
        <div>
            {jsxSections}
        </div>
    );
}
