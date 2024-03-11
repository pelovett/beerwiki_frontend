import { describe, expect, test } from "@jest/globals";
import { formattedTextSection, getLookupTable, parseBlock } from "./parsing";

describe("parser module", () => {
  test("Tests bold in test text", () => {
    const testText = "Testing this text with the *bold* operator in it";
    const defaultTable = getLookupTable();
    const boldTrueTable = getLookupTable().set("*", true);
    const testResult: formattedTextSection[] = [
      {
        text: "Testing this text with the ",
        lookupTable: defaultTable,
      },
      {
        text: "bold",
        lookupTable: boldTrueTable,
      },
      {
        text: " operator in it",
        lookupTable: defaultTable,
      },
    ];

    expect(parseBlock(testText)).toStrictEqual(testResult);
  });
  test("Test nested italics and bold", () => {
    const testText = "raw *bold ` italic bold * italic ` raw again";
    const defaultTable = getLookupTable();
    const boldTrueTable = getLookupTable().set("*", true);
    const italicsTrueTable = getLookupTable().set("`", true);
    const boldItalicsTrueTable = getLookupTable().set("*", true).set("`", true);
    const expectedResult: formattedTextSection[] = [
      {
          text: "raw",
          lookupTable: defaultTable,
      },
      {
          text: "bold",
          lookupTable: boldTrueTable,
      },
      {
          text: "italic bold",
          lookupTable: boldItalicsTrueTable,
      },
      {
          text: "italic",
          lookupTable: italicsTrueTable,
      },
      {
          text: "raw again",
          lookupTable: defaultTable,
      }
    ]

    expect(parseBlock(testText)).toStrictEqual(expectedResult);
  });
});
