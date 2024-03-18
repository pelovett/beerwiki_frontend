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
  let textResult: formattedTextSection[] = [];
  textResult.push(newTextSection());
  for (let i = 0; i < rawText.length; i++) {
    const curChar = rawText.at(i) ?? "";
    if (inBlockOpList.includes(curChar)) {
      const prevTextSection =
        i > 0 ? textResult[textResult.length - 1] : undefined;
      textResult.push(newTextSection(curChar, prevTextSection));
    } else {
      textResult[textResult.length - 1].text =
        textResult[textResult.length - 1].text.concat(curChar);
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
