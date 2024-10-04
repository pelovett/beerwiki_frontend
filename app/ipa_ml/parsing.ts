const inBlockOpList = ["*", "`"];

export type formattedContent = {
    info: Map<string, string>;
    textSections: formattedTextSection[];
};
export type formattedTextSection = {
  text: string;
  lookupTable: Map<string, boolean>;
};

export function getLookupTable(): Map<string, boolean> {
  return new Map<string, boolean>(inBlockOpList.map((key) => [key, false]));
}

export function parseBlock(rawText: string): formattedContent {
  let textResult: Map<number, formattedTextSection> = new Map<
    number,
    formattedTextSection
  >();
  let opLastSeen: Map<string, number> = new Map<string, number>();
  let opCount: Map<string, number> = new Map<string, number>();
  let prevIndex = 0;
  textResult.set(0, newTextSection());
  let infoBox = new Map<string, string>();
  let startIndex = 0;
  try {
    const parseResult = parseInfoBox(rawText);
    startIndex = parseResult[0]
    infoBox = parseResult[1] 
  } catch (error) {
    console.log(`Got an error parsing the info box: ${error}`);
  }
  for (let i = startIndex; i < rawText.length; i++) {
    const curChar = rawText.at(i) ?? "";
    if (inBlockOpList.includes(curChar)) {
      let count = opCount.get(curChar) ? Number(opCount.get(curChar)) + 1 : 1;
      opCount.set(curChar, count);
      opLastSeen.set(curChar, i);
      const prevTextSection = i > 0 ? textResult.get(prevIndex) : undefined;
      textResult.set(i, newTextSection(curChar, prevTextSection));
      prevIndex = i;
    } else {
      let currentText = textResult.get(prevIndex);
      let newText: formattedTextSection = {
        text: currentText ? currentText.text.concat(curChar) : "",
        lookupTable: currentText?.lookupTable ?? getLookupTable(),
      };
      textResult.set(prevIndex, newText);
    }
  }
  fixUnmatchedSections(opLastSeen, opCount, textResult);
  return {
    info: infoBox, 
    textSections: Array.from(textResult.values()),
  }
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
function fixUnmatchedOp(
  operator: string,
  opPos: number,
  textResult: Map<number, formattedTextSection>,
) {
  const prevText = textResult.get(opPos)?.text ?? "";
  const newText = operator + prevText;
  const newTextSection: formattedTextSection = {
    text: newText,
    lookupTable: textResult.get(opPos)?.lookupTable ?? getLookupTable(),
  };
  textResult.set(opPos, newTextSection);

  textResult.forEach((textSection, position) => {
    if (position >= opPos) {
      setOpFalseInTable(operator, textSection.lookupTable);
    }
  });
}

function setOpFalseInTable(
  operator: string,
  lookupTable: Map<string, boolean>,
) {
  lookupTable.set(operator, false);
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

export function parseInfoBox(content: string): [number, Map<string, string>] {
  const resultMap = new Map<string, string>();
  const allowedKeys = ["title", "abv"];
  const state: {
    insideInfoBox: boolean;
    firstNewlineSeen: boolean;
    seenSeparator: boolean;
    seenEndChar: boolean;
    keyStart: null | number;
    keyEnd: null | number;
    valStart: null | number;
    valEnd: null | number;
  } = {
    insideInfoBox: false,
    firstNewlineSeen: false,
    seenSeparator: false,
    seenEndChar: false,
    keyStart: null,
    keyEnd: null,
    valStart: null,
    valEnd: null,
  };
  if (content.length < 4) {
    throw Error("Infobox too short");
  }
  const boxStart = parseFirstLine(content);
  let i = boxStart
  for (; i < content.length; i++) {
    if (content[i] === '}') {
        break;
    }
    if (!state.insideInfoBox) {
    }
    if (content[i] === "\n") {
      state.valEnd = i;
      if (state.keyStart && state.keyEnd && state.valStart && state.valEnd) {
        let key = content.substring(state.keyStart, state.keyEnd);
        key = key.trim();
        if (!allowedKeys.includes(key)) {
          throw Error(`Key ${key} not included in allowed keys.`);
        }
        const val = content.substring(state.valStart, state.valEnd).trim();
        resultMap.set(key, val);
      }
      state.keyStart = null;
      state.keyEnd = null;
      state.valStart = null;
      state.valEnd = null;
      state.seenSeparator = false;
    }
    if (state.keyStart === null) {
      state.keyStart = i;
    }
    if (state.valStart === null && state.seenSeparator === true) {
      state.valStart = i;
    }
    if (content[i] === ":" && !state.seenSeparator) {
      state.keyEnd = i;
      state.seenSeparator = true;
    }
  }
  let index = i;
  return [index, resultMap];
}

export function parseFirstLine(content: string): number {
  let seenOpenParen = false;
  const whiteSpace = [" ", "\t", "\r"];

  for (let i = 0; i < content.length; i++) {
    if (whiteSpace.includes(content[i])) {
      continue;
    } else if (content[i] === "{" && !seenOpenParen) {
      seenOpenParen = true;
    } else if (content[i] === "\n" && seenOpenParen) {
      if (i + 1 === content.length) {
        throw Error("Invalid info box.");
      }
      return i + 1;
    } else {
      throw Error("Invalid info box.");
    }
  }
  throw Error("Invalid info box.");
}
