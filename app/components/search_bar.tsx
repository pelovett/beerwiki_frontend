"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useRef, useState } from "react";

import { NEXT_PUBLIC_BACKEND_SERVER } from "../network/util";

type SearchResult = {
  name: string;
  url_name: string;
};

export default function SearchBar({
  startQuery,
}: {
  startQuery?: string;
}): ReactElement {
  const router = useRouter();
  const [query, setQuery] = useState(startQuery || "");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [lastSearchTime, setLastSearchTime] = useState(Date.now());
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const resultsContainerRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  // Process entered queries
  const handleInputChange = (event: { target: { value: string } }) => {
    const query = event.target.value;
    const runTime = Date.now();
    setQuery(query);

    // Only send request every 500ms
    if (
      query !== "" &&
      query.length > 2 &&
      new Date(lastSearchTime + 500).getTime() < runTime
    ) {
      setLastSearchTime(runTime);
      fetch(
        NEXT_PUBLIC_BACKEND_SERVER +
          `/search/beer?q=${encodeURIComponent(query.trim())}`
      )
        .then((response) => {
          if (response.status === 404) {
            setSelectedIndex(-1);
            setSearchResults([]);
            throw new Error("Failed to retrieve data");
          } else if (response.status != 200) {
            throw new Error("Failed to retrieve data");
          }
          return response.json();
        })
        .then((data) => {
          setSelectedIndex(-1);
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
        });
    }
  };

  // Key control for search suggestions
  const handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "ArrowDown") {
      event.preventDefault(); // Prevent default arrow key behavior (scrolling)
      setSelectedIndex((prevIndex) => (prevIndex + 1) % searchResults.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault(); // Prevent default arrow key behavior (scrolling)
      setSelectedIndex(
        (prevIndex) =>
          (prevIndex - 1 + searchResults.length) % searchResults.length
      );
    } else if (event.key === "Escape") {
      event.preventDefault();
      setSelectedIndex(-1);
      setSearchResults([]);
    } else if (event.key === "Enter") {
      event.preventDefault();
      console.log(`Detected 'enter' press! ${selectedIndex}`);
      if (selectedIndex !== -1) {
        const result = searchResults[selectedIndex];
        router.push(`/beer/${result.url_name}`);
      } else {
        router.push(`/search?query=${query}`);
      }
    }
  };

  // When rows are selected by keyboard, focus results
  useEffect(() => {
    if (resultsContainerRef.current && selectedIndex !== -1) {
      resultsContainerRef.current.focus();
    }
  }, [selectedIndex]);

  // Listen for keydown events
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchResults, selectedIndex]); // Reattach event listener when search results change

  // If user clicks outside of search results, clear them
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (
        resultsContainerRef.current &&
        !resultsContainerRef.current.contains(event.target)
      ) {
        setSelectedIndex(-1);
        setSearchResults([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative mt-2 mb-1 rounded-md shadow-sm w-full h-[2rem]">
        <input
          type="text"
          name="price"
          id="price"
          autoComplete="off"
          value={query}
          ref={inputRef}
          onChange={handleInputChange}
          className="block w-full rounded-md border-0 py-1.5 pl-3.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex items-center h-9">
          <button
            className={
              "flex rounded-e-md justify-center items-center bg-blue-600" +
              " py-4 w-[3rem] h-full"
            }
            type="submit"
            onClick={() => router.push(`/search?query=${query}`)}
          >
            <Image
              src="/search.svg"
              alt="Submit search"
              width={25}
              height={25}
            />
          </button>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div
          tabIndex={-1}
          ref={resultsContainerRef}
          className={
            "absolute flex flex-col z-10 mt-1 bg-white rounded-md" +
            " border border-gray-300 shadow-lg w-[90%] sm:w-[28rem] "
          }
        >
          {searchResults.map((result, index) => (
            <Link
              key={index}
              href={`/beer/${result.url_name}`}
              className={`px-4 py-2 ${index === selectedIndex ? "bg-gray-200" : ""} ${index === 0 ? "border-b" : index === searchResults.length - 1 ? "border-t" : "border-y"}`}
            >
              {result.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
