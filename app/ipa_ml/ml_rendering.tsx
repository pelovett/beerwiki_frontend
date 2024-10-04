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
  const parsedML = parseBlock(text);

  let jsxSections: ReactElement[] = [];

  parsedML.textSections.forEach((textSection) => {
    jsxSections.push(textSectionToJsx(textSection));
  });

  return (
    <>
      {renderInfoBox(parsedML.info)}
      <div
        className="text-pretty text-base max-w-full break-all"
        style={{ wordBreak: "break-word" }}
      >
        {jsxSections}
      </div>
    </>
  );
}

function capitalizeInfoBoxTitle(title: string): string {
  if (title === "brewer") {
    return "Brewer";
  } else if (title === "abv") {
    return "ABV";
  } else if (title === "ibu") {
    return "IBU";
  } else {
    return title;
  }
}

function renderInfoBox(info: Map<string, string>) {
  if (info.size === 0) {
    return null;
  }
  const title = info.get("title");
  info.delete("title");

  return (
    <table
      className={
        "table float-right align-middle justify-between" +
        " w-80 border border-[#A2A9B1]"
      }
    >
      <tbody>
        <tr>
          <th
            colSpan={2}
            className={
              "text-center bg-[#f8f9fa] pt-[0.4rem]" +
              " px-[0.6rem] border border-[#A2A9B1]"
            }
          >
            {title}
          </th>
        </tr>
        {Array.from(info, (value, _) => {
          return (
            <tr key={value[0]} className="table-row text-left align-top">
              <th className="w-2/4 pt-[0.4rem] px-[0.6rem]">
                {capitalizeInfoBoxTitle(value[0])}
              </th>
              <td className="w-2/4 pt-[0.4rem] px-[0.6rem]">{value[1]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
