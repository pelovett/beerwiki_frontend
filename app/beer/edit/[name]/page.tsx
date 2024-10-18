"use client";

import { useEffect, useState } from "react";

import TopBar from "@/app/components/top_bar";
import SideBar from "@/app/components/side_bar";
import { formatAndRenderText } from "../../../ipa_ml/ml_rendering";
import { IpaMlInput } from "../ipa_ml_input";
import { getBeer, setBeerIPAML } from "../../../api_calls/beer_calls";

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
      const beerContent = await getBeer(name, REVALIDATION_TIMEOUT_SEC);
      if (beerContent === null) {
        throw new Error(`No beer found with name ${name}`);
      }
      setInputText(beerContent.ipaml);
    }

    getDescriptionFromAPI();
    setLoading(false);
  }, []);

  async function saveBeerDescription() {
    const success = await setBeerIPAML(name, inputText);
    if (success) {
      window.location.href = `/beer/${name}`;
    }
  }

  const textJsx = formatAndRenderText(inputText);
  return (
    <>
      <TopBar />
      <div className="flex flex-col w-full h-full my-3 sm:my-6">
        <div className="flex flex-row self-center w-full h-full my-6">
          <SideBar />
          <div className="w-2/4 mx-5">
            <IpaMlInput
              inputText={inputText}
              setInputText={setInputText}
              disabled={loading}
            />
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
    </>
  );
}
