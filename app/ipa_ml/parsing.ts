const inBlockOpList = ["*", "`"];

interface opCache {
  op: string;
  cache: string;
}

type operators = {
  italic: "*";
};

export interface formattedTextSection {
  text: string;
  lookupTable: Map<string, boolean>;
}

export function getLookupTable(): Map<string, boolean> {
  return new Map<string, boolean>(inBlockOpList.map((key) => [key, false]));
}

export function parseBlock(rawText: string) {
  let textResult: Map<number, formattedTextSection> = new Map<number, formattedTextSection>;
  let opLastSeen: Map<string, number> = new Map<string, number>();
  let prevIndex = 0;
  textResult.set(0, newTextSection());
  for (let i = 0; i < rawText.length; i++) {
    const curChar = rawText.at(i) ?? "";
    if (inBlockOpList.includes(curChar)) {
      const prevTextSection =
        i > 0 ? textResult.get(prevIndex) : undefined;
      textResult.set(i, newTextSection(curChar, prevTextSection));
      prevIndex = i;
    } else {
        // This all should maybe be extracted
        // Also I don't like it -Ben
      let currentText = textResult.get(prevIndex);
      let newText: formattedTextSection = {
         text: currentText ? currentText.text.concat(curChar) : '',
         lookupTable: currentText?.lookupTable ?? getLookupTable(),
      }
      textResult.set(prevIndex, newText);
    }
  }
  return textResult;
}

function newTextSection(
  operator?: string,
  prevTextSection?: formattedTextSection,
) {
  let newTable = getLookupTable();
  if (!!operator && inBlockOpList.includes(operator)) {
    const opBoolean = prevTextSection
      ? !prevTextSection.lookupTable.get(operator)
      : true;
    newTable.set(operator, !!opBoolean);
  }

  const newTextSection: formattedTextSection = {
    text: "",
    lookupTable: newTable,
  };

  return newTextSection;
}
