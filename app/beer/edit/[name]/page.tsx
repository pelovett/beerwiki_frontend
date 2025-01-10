"use client";

import { useEffect, useState, ReactElement } from "react";

import TopBar from "@/app/components/top_bar";
import SideBar from "@/app/components/side_bar";
import { formatAndRenderText } from "../../../ipa_ml/ml_rendering";
import { getBeer, setBeerIPAML } from "../../../api_calls/beer_calls";
import IPAMLEditor from "../../../components/ipa_ml_editor";

const REVALIDATION_TIMEOUT_SEC = 60;

export default function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    window.addEventListener("resize", ()=> {setIsMobile(window.innerWidth < 640)});
  });

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

  const editor = IPAMLEditor({ inputText, setInputText, disabled: loading });

  const [checked, setChecked] = useState(false);

  const editTopBar = (
    <nav className="flex sm:hidden justify-between items-center py-2 mx-3">
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={saveBeerDescription}
      >
        Save
      </button>
      <CheckHeader checked={checked} setChecked={setChecked} />
    </nav>
  );

  function CheckHeader({
    checked,
    setChecked,
  }: {
    checked: boolean;
    setChecked: (checked: boolean) => void;
  }): ReactElement {
    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          value=""
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
          className="peer sr-only"
        />
        <div
          className={
            "peer flex h-10 items-center gap-5 " +
            "rounded-full bg-blue-200 px-7 after:absolute " +
            "after:left-1 after: after:h-8 after:w-16 after:rounded-full " +
            "after:bg-blue-500 after:transition-all after:content-[''] " +
            "peer-checked:bg-blue-200 peer-checked:after:translate-x-full " +
            "peer-focus:outline-none text-sm text-white"
          }
        >
          <span className="z-10 select-none">Edit</span>
          <span className="z-10 select-none">Preview</span>
        </div>
      </label>
    );
  }

  const textJsx = formatAndRenderText(inputText);
  return (
    <>
      <TopBar />
      {editTopBar}
      <div className="flex flex-col w-full h-full my-3 sm:my-6">
        <div className="flex flex-row self-center w-full h-full my-0 sm:my-6">
          <SideBar />
          {checked && isMobile ? (
            <div className="flex w-full mx-4">{textJsx}</div>
          ) : (
            <div className="flex flex-col w-full mx-4 sm:max-w-[50%] sm:w-2/4 sm:mx-5">
              {editor}
            </div>
          )}
          <div className="hidden sm:flex max-w-[50%] w-2/4 mx-5">{textJsx}</div>
        </div>
        <div className="hidden sm:flex flex-row-reverse w-4/5">
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
