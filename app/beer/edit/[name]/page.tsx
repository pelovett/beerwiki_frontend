"use client";

import { useEffect, useState } from "react";

import TopBar from "@/app/components/top_bar";
import SideBar from "@/app/components/side_bar";
import { formatAndRenderText } from "../../../ipa_ml/ml_rendering";
import { IpaMlInput } from "../ipa_ml_input";
import { getBeerIPAML, setBeerIPAML } from "../../../api_calls/beer_calls";
import IPAMLEditor from "../../../components/ipa_ml_editor";

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
    const success = await setBeerIPAML(name, inputText);
    if (success) {
      window.location.href = `/beer/${name}`;
    }
  }

  const editor = IPAMLEditor();

  const textJsx = formatAndRenderText(inputText);
  return (
    <>
      <TopBar />
      <nav className="flex sm:hidden justify-between items-center py-2 mx-3">
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={saveBeerDescription}
        >
          Save
        </button>
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" value="" defaultChecked className="peer sr-only" />
          <div className="peer flex h-8 items-center gap-5 rounded-full bg-orange-600 px-7 after:absolute after:left-1 after: after:h-6 after:w-16 after:rounded-full after:bg-white/40 after:transition-all after:content-[''] peer-checked:bg-stone-600 peer-checked:after:translate-x-full peer-focus:outline-none dark:border-slate-600 dark:bg-slate-700 text-sm text-white">
            <span>Edit</span>
            <span>Preview</span>
          </div>
        </label>{" "}
      </nav>
      <div className="flex flex-col w-full h-full my-3 sm:my-6">
        <div className="flex flex-row self-center w-full h-full my-6">
          <SideBar />
          <div className="w-2/4 mx-5">
            {editor}
            <IpaMlInput
              inputText={inputText}
              setInputText={setInputText}
              disabled={loading}
            />
          </div>
          <div className="max-w-[50%] w-2/4 mx-5">{textJsx}</div>
        </div>
        <div className="hidden sm:flex flex-row-reverse w-4/5 mx-8">
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
