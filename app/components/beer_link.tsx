import { ReactElement } from "react";

export default function BLink({
  url,
  text,
  font = "font-small",
}: {
  url: string;
  text: string;
  font?: string;
}): ReactElement {
  return (
    <a
      className={
        font +
        " text-blue-600 hover:underline hover:text-blue-800 visited:text-purple-600"
      }
      href={url}
    >
      {text}
    </a>
  );
}
