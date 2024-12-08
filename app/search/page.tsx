"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

import Sidebar from "../components/side_bar";
import SearchBar from "../components/search_bar";
import { NEXT_PUBLIC_BACKEND_SERVER } from "../utils/network/util";
import BLink from "../components/beer_link";
import TopBar from "../components/top_bar";
import BeerStyleTag from "../components/tags/beer_style_tag";
import FlagTag from "../components/tags/country_tag";

interface SearchResult {
  name: string;
  url_name: string;
}

function randomStyle(): string {
  return [
    "Pale Lager",
    "Pilsner",
    "Stout",
    "Dunkel",
    "English Bitter",
    "Douple IPA",
    "India Pale Ale",
    "Saison",
  ][Math.min(7, Math.floor(Math.random() * 8))];
}

function randomCountry(): string {
  return [
    "USA",
    "CAN",
    "JPY",
    "GBR",
    "DEU",
    "FRA",
    "ITA",
    "ESP",
    "CHN",
    "RUS",
    "KOR",
    "IND",
  ][Math.min(11, Math.floor(Math.random() * 12))];
}

function SearchBody() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  // Load search results
  useEffect(() => {
    fetch(
      NEXT_PUBLIC_BACKEND_SERVER +
        `/search/beer?q=${encodeURIComponent(query.trim())}`
    )
      .then((response) => {
        if (response.status === 404) {
          setSearchResults([]);
          throw new Error("Failed to retrieve data");
        } else if (response.status != 200) {
          throw new Error("Failed to retrieve data");
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(
          data.results
            .filter((x: any) => parseFloat(x.similarity_score) > 0.1)
            .map((x: any) => ({
              name: x.name,
              url_name: x.url_name,
            }))
        );
      })
      .catch((err) => {
        console.log(`Error fetching search results: ${query} err: ${err}`);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-row mt-4 w-full">
      <Sidebar />
      <div className="flex flex-col w-full mx-5">
        <h1 className="border-solid border-b-2 mb-3 text-3xl font-serif">
          Search Beers
        </h1>
        <div
          className={
            "mb-5 w-[98%] sm:w-[90%] sm:w-4/5 mt-1 sm:mt-4 sm:ml-5" +
            " sm:max-w-[30rem] self-center sm:self-start"
          }
        >
          <SearchBar startQuery={query} />
        </div>
        {loading ? (
          <p>Loading results...</p>
        ) : (
          <ul className="ml-3 sm:ml-5 list-inside">
            {searchResults?.map((result) => (
              <div
                className={
                  "flex flex-col border-b-[1px] last:border-b-0" +
                  " pt-4 sm:pt-5 first:pt-0 pb-4 sm:pb-5 last:pb-0"
                }
                key={result.url_name}
              >
                <BLink
                  font="font-medium"
                  url={"/beer/" + result.url_name}
                  text={result.name}
                />
                <span className="font-semibold text-xs my-[0.25rem]">
                  Buoy Beer Company
                </span>
                <div
                  className={`
                    flex flex-row align-items justify-start 
                    space-x-1 sm:space-x-2 mb-1
                    `}
                >
                  {/*  TODO get these for real */}
                  <BeerStyleTag style={randomStyle()} />
                  <FlagTag country={randomCountry()} />
                </div>
                <span className="mx-0">
                  Lorem ipsum odor amet, consectetuer adipiscing elit.
                  Feugiat...
                </span>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <TopBar />
      <div className="flex flex-row w-full self-start">
        <Suspense>
          <SearchBody />
        </Suspense>
      </div>
    </>
  );
}
