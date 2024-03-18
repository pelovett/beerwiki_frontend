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
  let textResult: Map<number, formattedTextSection> = new Map<
    number,
    formattedTextSection
  >();
  let opLastSeen: Map<string, number> = new Map<string, number>();
  let opCount: Map<string, number> = new Map<string, number>();
  let prevIndex = 0;
  textResult.set(0, newTextSection());
  for (let i = 0; i < rawText.length; i++) {
    const curChar = rawText.at(i) ?? "";
    if (inBlockOpList.includes(curChar)) {
      let count = opCount.get(curChar) ? Number(opCount.get(curChar)) + 1 : 1;
      opCount.set(curChar, count);
      opLastSeen.set(curChar, i);
      const prevTextSection = i > 0 ? textResult.get(prevIndex) : undefined;
      textResult.set(i, newTextSection(curChar, prevTextSection));
      prevIndex = i;
    } else {
      // This all should maybe be extracted
      // Also I don't like it -Ben
      let currentText = textResult.get(prevIndex);
      let newText: formattedTextSection = {
        text: currentText ? currentText.text.concat(curChar) : "",
        lookupTable: currentText?.lookupTable ?? getLookupTable(),
      };
      textResult.set(prevIndex, newText);
    }
  }
  fixUnmatchedSections(opLastSeen, opCount, textResult);
  return textResult;
}

function fixUnmatchedSections(
  opLastSeen: Map<string, number>,
  opCount: Map<string, number>,
  textResult: Map<number, formattedTextSection>,
) {
    opCount.forEach((count, operator) => {
        if (count % 2 === 1) {
            fixUnmatchedOp(operator, opLastSeen.get(operator) ?? 0, textResult);
        }
    });
}

// Inserts operator into text and removes op flag from all following text sections.
function fixUnmatchedOp(operator: string, opPos: number, textResult: Map<number, formattedTextSection>) {
    const prevText = textResult.get(opPos)?.text ?? '';
    const newText = operator + prevText;
    const newTextSection: formattedTextSection = {
       text: newText,
       lookupTable: textResult.get(opPos)?.lookupTable ?? getLookupTable(),
    }
    textResult.set(opPos, newTextSection);
    
    textResult.forEach((textSection, position) => {
        if (position >= opPos) {
            setOpFalseInTable(operator, textSection.lookupTable);
        }
    });
}

function setOpFalseInTable(operator: string, lookupTable: Map<string, boolean>) {
    lookupTable.set(operator, false)
}

function newTextSection(
  operator?: string,
  prevTextSection?: formattedTextSection,
) {
  let newTable = new Map(prevTextSection?.lookupTable ?? getLookupTable());
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
