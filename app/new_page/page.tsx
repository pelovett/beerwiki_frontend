"use client";

import { formatAndRenderText } from "../ipa_ml/ml_rendering";
import { IpaMlInput } from "./ipa_ml_input";
import { useState } from "react";

export default function Page() {
  const [inputText, setInputText] = useState("");
  const textText =
    "*This should be bold* this is normal `this is italics *this is italic bold*`";

  const textJsx = formatAndRenderText(inputText);
  console.log("test");
  console.log(textJsx);
  return (
    <div className="flex flex-row self-center w-full h-full my-6">
      <div className="w-2/4 mx-5">
        <IpaMlInput inputText={inputText} setInputText={setInputText} />
      </div>
      <div className="max-w-[50%] w-2/4 mx-5">
        <h1>test!</h1>
        {textJsx}
      </div>
    </div>
  );
}
