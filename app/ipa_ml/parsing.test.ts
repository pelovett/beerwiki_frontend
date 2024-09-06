import { describe, expect, test } from "@jest/globals";
import {
  formattedTextSection,
  getLookupTable,
  parseBlock,
  parseInfoBox,
  parseFirstLine,
} from "./parsing";

describe("parser module", () => {
  test("Tests bold in test text", () => {
    const testText = "Testing this text with the *bold* operator in it";
    const defaultTable = getLookupTable();
    const boldTrueTable = getLookupTable().set("*", true);
    const testResult: Map<number, formattedTextSection> = new Map<
      number,
      formattedTextSection
    >();
    testResult.set(0, {
      text: "Testing this text with the ",
      lookupTable: defaultTable,
    });
    testResult.set(27, {
      text: "bold",
      lookupTable: boldTrueTable,
    });
    testResult.set(32, {
      text: " operator in it",
      lookupTable: defaultTable,
    });
    expect(parseBlock(testText)).toStrictEqual(testResult);
  });
  test("Test nested italics and bold", () => {
    const testText = "raw *bold ` italic bold * italic ` raw again";
    const defaultTable = getLookupTable();
    const boldTrueTable = getLookupTable().set("*", true);
    const italicsTrueTable = getLookupTable().set("`", true);
    const boldItalicsTrueTable = getLookupTable().set("*", true).set("`", true);
    const expectedResult: Map<number, formattedTextSection> = new Map<
      number,
      formattedTextSection
    >();
    expectedResult.set(0, {
      text: "raw ",
      lookupTable: defaultTable,
    });
    expectedResult.set(4, {
      text: "bold ",
      lookupTable: boldTrueTable,
    });
    expectedResult.set(10, {
      text: " italic bold ",
      lookupTable: boldItalicsTrueTable,
    });
    expectedResult.set(24, {
      text: " italic ",
      lookupTable: italicsTrueTable,
    });
    expectedResult.set(33, {
      text: " raw again",
      lookupTable: defaultTable,
    });

    expect(parseBlock(testText)).toStrictEqual(expectedResult);
  });
  test("Test single asterisks", () => {
    const testText = "raw *fake bold ` italic` raw again";
    const defaultTable = getLookupTable();
    const boldTrueTable = getLookupTable().set("*", true);
    const italicsTrueTable = getLookupTable().set("`", true);
    const boldItalicsTrueTable = getLookupTable().set("*", true).set("`", true);
    const expectedResult: Map<number, formattedTextSection> = new Map<
      number,
      formattedTextSection
    >();
    expectedResult.set(0, {
      text: "raw ",
      lookupTable: defaultTable,
    });
    expectedResult.set(4, {
      text: "*fake bold ",
      lookupTable: defaultTable,
    });
    expectedResult.set(15, {
      text: " italic",
      lookupTable: italicsTrueTable,
    });
    expectedResult.set(23, {
      text: " raw again",
      lookupTable: defaultTable,
    });

    expect(parseBlock(testText)).toStrictEqual(expectedResult);
  });
  test("First line happy case", () => {
    const testContent = `{
tile: Beer`;

    expect(parseFirstLine(testContent)).toStrictEqual(2);
  });
  test("Test first line has too much content", () => {
    const testContent = `{ asdfasdf
        title: test
    `;

    expect(() => parseFirstLine(testContent)).toThrow();
  });
  test("Test first line has no follow up line", () => {
    const testContent = "{  ";

    expect(() => parseFirstLine(testContent)).toThrow();
  });

  test("Empty parse info box", () => {
    const testContent = "{  }";

    expect(() => parseInfoBox(testContent)).toThrow();
  });

  test("Simple complete info box", () => {
    const testContent = `{
        title: beer
        abv: 7
      }`;

    const expectedResult: Map<string, string> = new Map<string, string>();

    expectedResult.set("title", "beer");
    expectedResult.set("abv", "7");
    expect(parseInfoBox(testContent)).toStrictEqual(expectedResult);
  });
});
