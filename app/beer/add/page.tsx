"use client";

import Sidebar from "@/app/components/side_bar";
import BLink from "../../components/beer_link";
import { newBeer } from "../../api_calls/beer_calls";
import { IpaMlInput } from "../edit/ipa_ml_input";
import { useState } from "react";
import { formatAndRenderText } from "../../ipa_ml/ml_rendering";
import TopBar from "@/app/components/top_bar";

const REVALIDATION_TIMEOUT_SEC = 60;

export default function Page({}: {}) {
  const [ipaMlText, setIpaMlText] = useState("");
  const [beerUrlName, setBeerUrlName] = useState("");
  const [beerName, setBeerName] = useState("");

  async function saveBeer() {
    const success = await newBeer(beerUrlName, beerName, ipaMlText);
    if (success) {
      window.location.href = `/beer/${beerUrlName}`;
    }
  }

  return (
    <>
      <TopBar />
      <div className="flex flex-row max-w-[99.75rem] mt-4">
        <Sidebar />
        <div className="flex flex-col w-full mx-5 my-1 gap-5">
          <h1 className="border-solid border-b-2 mb-3 text-3xl font-serif">
            Add A New Beer
          </h1>
          <div className="flex flex-col justify-between gap-5 w-full max-w-[40rem]">
            <div className="flex flex-col gap-4">
              <h1 className="border-solid border-b-2 text-xl font-serif">
                Enter Beer Name
              </h1>
              <input
                className="border-solid rounded-md border-2 mx-5"
                value={beerName}
                onChange={(e) => setBeerName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="border-solid border-b-2 text-xl font-serif">
                Enter Unique URL Name
              </h1>
              <input
                className="border-solid rounded-md border-2 mx-5"
                value={beerUrlName}
                onChange={(e) => setBeerUrlName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="border-solid border-b-2 text-xl font-serif">
                Enter Beer Description
              </h1>
              <div className="w-full min-h-[10rem] pl-5">
                <IpaMlInput
                  inputText={ipaMlText}
                  setInputText={setIpaMlText}
                  disabled={false}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={
              "p-2 bg-blue-500 text-white self-center sm:self-start rounded-md" +
              " hover:bg-blue-600 max-w-[30rem] mt-2 ml-4"
            }
            onClick={saveBeer}
          >
            Create Beer
          </button>
        </div>
      </div>
    </>
  );
}
