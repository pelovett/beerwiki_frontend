const inBlockOpList = ["*"];

interface opCache {
  op: string;
  cache: string;
}

type operators = {
  italic: "*";
};

interface formattedTextSection {
  text: string;
  lookupTable: Map<string, boolean>;
}

function getLookupTable(): Map<string, boolean> {
  return new Map<string, boolean>(inBlockOpList.map((key) => [key, false]));
}

function parseBlock(rawText: string) {
  let textResult: formattedTextSection[] = [];
  for (let i = 0; i < rawText.length; i++) {
    const curChar = rawText.at(i) ?? "";
    if (inBlockOpList.includes(curChar)) {
      const prevTextSection =
        i > 0 ? textResult[textResult.length - 1] : undefined;
      textResult.push(newTextSection(curChar, prevTextSection));
    } else {
      textResult[textResult.length - 1].text =
        textResult[textResult.length - -1].text.concat(curChar);
    }
  }
  return textResult;
}

function newTextSection(
  operator: string,
  prevTextSection?: formattedTextSection,
) {
  let newTable = getLookupTable();
  if (prevTextSection) {
    newTable = prevTextSection.lookupTable;
  }
  newTable.set(operator, !newTable.get(operator));

  const newTextSection: formattedTextSection = {
    text: "",
    lookupTable: newTable,
  };

  return newTextSection;
}
