"use client";

import { useEffect } from "react";
import { formatAndRenderText } from "../../ipa_ml/ml_rendering";
import { IpaMlInput } from "../ipa_ml_input";
import { useState } from "react";

const BACKEND_SERVER = process.env.BACKEND_SERVER || "http://localhost:8888";
const REVALIDATION_TIMEOUT_SEC = 60;

export default function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    async function getDescriptionFromAPI() {
      const beerDescription = await getBeerDescription(name);
      setInputText(beerDescription);
    }

    getDescriptionFromAPI();
  }, []);

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

async function getBeerDescription(beer_name: string): Promise<string> {
  let data;
  try {
    const res = await fetch(BACKEND_SERVER + `/beer/name/${beer_name}`, {
      next: { revalidate: REVALIDATION_TIMEOUT_SEC },
    });
    data = await res.json();
  } catch (err) {
    console.error(err);
    console.log(`Failed to fetch beer page: ${beer_name} err: ${err}`);
  }

  console.log("The payload is");
  console.log(data);
  if (!data?.page_ipa_ml) {
    console.error("No beer description returned from backend!");
    return "";
  }

  return data.page_ipa_ml;
}
