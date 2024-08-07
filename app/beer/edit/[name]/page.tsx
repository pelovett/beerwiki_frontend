"use client";

import { useEffect } from "react";
import { formatAndRenderText } from "../../../ipa_ml/ml_rendering";
import { IpaMlInput } from "../ipa_ml_input";
import { useState } from "react";
import { getBeerIPAML, setBeerIPAML } from "../../../api_calls/beer_calls";

const REVALIDATION_TIMEOUT_SEC = 60;

export default function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getDescriptionFromAPI() {
      const beerDescription = await getBeerIPAML(
        name,
        REVALIDATION_TIMEOUT_SEC,
      );
      setInputText(beerDescription);
    }

    getDescriptionFromAPI();
    setLoading(false);
  }, []);

  async function saveBeerDescription() {
    await setBeerIPAML(name, inputText);
    window.location.href = `/beer/${name}`;
  }

  const textJsx = formatAndRenderText(inputText);
  return (
    <div className="flex flex-col w-full h-full my-6">
      <div className="flex flex-row self-center w-full h-full my-6">
        <div className="w-2/4 mx-5">
          <IpaMlInput inputText={inputText} setInputText={setInputText} disabled={loading}/>
        </div>
        <div className="max-w-[50%] w-2/4 mx-5">{textJsx}</div>
      </div>
      <div className="flex flex-row-reverse w-4/5 mx-8">
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={saveBeerDescription}
        >
          Save
        </button>
      </div>
    </div>
  );
}
