"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Sidebar from "../components/side_bar";
import SearchBar from "../components/search_bar";
import { BACKEND_SERVER } from "../network/util";
import BLink from "../components/beer_link";

interface SearchResult {
  name: string;
  url_name: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  // Load search results
  useEffect(() => {
    fetch(BACKEND_SERVER + `/search/beer?q=${encodeURIComponent(query.trim())}`)
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
    <div className="flex flex-row w-full self-start">
      <Sidebar />
      <div className="flex flex-col w-2/5 mt-10 ml-10 self-start">
        <div className="mb-5">
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
