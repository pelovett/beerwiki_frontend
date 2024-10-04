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
    const expectedResult: formattedTextSection[] = [];
    expectedResult.push({
      text: "Testing this text with the ",
      lookupTable: defaultTable,
    });
    expectedResult.push({
      text: "bold",
      lookupTable: boldTrueTable,
    });
    expectedResult.push({
      text: " operator in it",
      lookupTable: defaultTable,
    });
    expect(parseBlock(testText).textSections).toStrictEqual(expectedResult);
  });
  test("Test nested italics and bold", () => {
    const testText = "raw *bold ` italic bold * italic ` raw again";
    const defaultTable = getLookupTable();
    const boldTrueTable = getLookupTable().set("*", true);
    const italicsTrueTable = getLookupTable().set("`", true);
    const boldItalicsTrueTable = getLookupTable().set("*", true).set("`", true);
    const expectedTextSections: formattedTextSection[] = [];
    expectedTextSections.push({
      text: "raw ",
      lookupTable: defaultTable,
    });
    expectedTextSections.push({
      text: "bold ",
      lookupTable: boldTrueTable,
    });
    expectedTextSections.push({
      text: " italic bold ",
      lookupTable: boldItalicsTrueTable,
    });
    expectedTextSections.push({
      text: " italic ",
      lookupTable: italicsTrueTable,
    });
    expectedTextSections.push({
      text: " raw again",
      lookupTable: defaultTable,
    });

    expect(parseBlock(testText).textSections).toStrictEqual(
      expectedTextSections
    );
  });
  test("Test single asterisks", () => {
    const testText = "raw *fake bold ` italic` raw again";
    const defaultTable = getLookupTable();
    const boldTrueTable = getLookupTable().set("*", true);
    const italicsTrueTable = getLookupTable().set("`", true);
    const boldItalicsTrueTable = getLookupTable().set("*", true).set("`", true);
    const expectedResult: formattedTextSection[] = [];
    expectedResult.push({
      text: "raw ",
      lookupTable: defaultTable,
    });
    expectedResult.push({
      text: "*fake bold ",
      lookupTable: defaultTable,
    });
    expectedResult.push({
      text: " italic",
      lookupTable: italicsTrueTable,
    });
    expectedResult.push({
      text: " raw again",
      lookupTable: defaultTable,
    });

    expect(parseBlock(testText).textSections).toStrictEqual(expectedResult);
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
        ibu: 70
        abv: 7
      }`;

    const expectedResult: Map<string, string> = new Map<string, string>();

    expectedResult.set("title", "beer");
    expectedResult.set("abv", "7");
    expect(parseInfoBox(testContent)).toStrictEqual(expectedResult);
  });
});
