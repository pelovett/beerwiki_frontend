"use client";

import Sidebar from "@/app/components/side_bar";
import { newBeer } from "../../api_calls/beer_calls";
import { IpaMlInput } from "../edit/ipa_ml_input";
import { useState } from "react";
import TopBar from "@/app/components/top_bar";

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
      <div className="flex flex-row max-w-[99.75rem] mt-4 h-full">
        <Sidebar />
        <div className="flex flex-col w-full mx-5 my-1 gap-5 h-full">
          <h1 className="border-solid border-b-2 mb-3 text-3xl font-serif">
            Add A Beer!
          </h1>
          <div className="flex flex-col justify-start gap-5 w-full max-w-[40rem] h-full">
            <div className="flex flex-col gap-4">
              <h1 className="border-solid border-b-2 text-xl font-serif">
                Enter Beer Name
              </h1>
              <input
                className={
                  "border-solid rounded-md border-2 border-gray-300" +
                  " mx-5 ml-0 p-2"
                }
                placeholder="Beer Name"
                value={beerName}
                onChange={(e) => setBeerName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="border-solid border-b-2 text-xl font-serif">
                Enter Unique URL Name
              </h1>
              <p className="font-sm text-slate-500">
                Replace spaces with underscores and choose a unique name.
              </p>
              <input
                className={
                  "border-solid rounded-md border-2 border-gray-300 w-full" +
                  " mx-5 ml-0 p-2"
                }
                placeholder="beer_url_name"
                value={beerUrlName}
                onChange={(e) => setBeerUrlName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 h-[90%]">
              <h1 className="border-solid border-b-2 text-xl font-serif">
                Enter Beer Description
              </h1>
              <div className="w-full h-[90%] min-h-[10rem]">
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
              " hover:bg-blue-600 w-full max-w-[30rem] mt-2 mb-5"
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
