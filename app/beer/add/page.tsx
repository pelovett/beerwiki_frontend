"use client";

import Sidebar from "@/app/components/side_bar";
import BLink from "../../components/beer_link";
import { newBeer } from "../../api_calls/beer_calls";
import { IpaMlInput } from "../edit/ipa_ml_input";
import { useState } from "react";
import { formatAndRenderText } from "../../ipa_ml/ml_rendering";

const REVALIDATION_TIMEOUT_SEC = 60;

export default function Page({}: {}) {
  const [ipaMlText, setIpaMlText] = useState("");
  const [beerUrlName, setBeerUrlName] = useState("");
  const [beerName, setBeerName] = useState("");

  async function saveBeer() {
    const success = await newBeer(beerUrlName, beerName, ipaMlText);
    if(success){
        window.location.href = `/beer/${beerUrlName}`;
    }
  }

  return (
    <div className="flex flex-row max-w-[99.75rem] mt-12">
      <Sidebar />
      <div className="flex flex-col w-full mx-5 my-7 gap-5">
        <div className="flex flex-row justify-between w-3/4">
          <div className="flex flex-col gap-4">
            <h1 className="border-solid border-b-3 text-xl font-serif">
              Enter Beer Name
            </h1>
            <input
              className="bord-solid border-b-2"
              value={beerName}
              onChange={(e) => setBeerName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="border-solid border-b-2 text-xl font-serif">
              Enter Unique URL Name
            </h1>
            <input
              className="bord-solid border-b-2"
              value={beerUrlName}
              onChange={(e) => setBeerUrlName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="border-solid border-b-2 text-xl font-serif">
            Enter Beer Description
          </h1>
          <IpaMlInput
            inputText={ipaMlText}
            setInputText={setIpaMlText}
            disabled={false}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={saveBeer}
        >
          Create Beer
        </button>
      </div>
    </div>
  );
}
