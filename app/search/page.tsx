"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

import Sidebar from "../components/side_bar";
import SearchBar from "../components/search_bar";
import { NEXT_PUBLIC_BACKEND_SERVER } from "../network/util";
import BLink from "../components/beer_link";
import TopBar from "../components/top_bar";

interface SearchResult {
  name: string;
  url_name: string;
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
            "mb-5 w-[90%] sm:w-4/5 mt-1 sm:mt-4 ml-4 sm:ml-5" +
            " sm:max-w-[30rem] self-center sm:self-start"
          }
        >
          <SearchBar startQuery={query} />
        </div>
        {loading ? (
          <p>Loading results...</p>
        ) : (
          <ul className="ml-3 space-y-5">
            {searchResults?.map((result) => (
              <div key={result.url_name}>
                <BLink url={"/beer/" + result.url_name} text={result.name} />
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
