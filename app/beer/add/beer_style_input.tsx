import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";

import BeerStyleTag, { pairs } from "../../components/tags/beer_style_tag";
import { levenshtein } from "@/app/utils/strings";

const styles = pairs.map((pair) => pair[0].toLocaleLowerCase());

function findMatches(query: string): string[] {
  const lowerQuery = query.toLocaleLowerCase();
  return styles
    .toSorted((a, b) => levenshtein(a, lowerQuery) - levenshtein(b, lowerQuery))
    .slice(0, 5);
}

export default function BeerStyleInput({
  beerStyle,
  setBeerStyle,
}: {
  beerStyle: string;
  setBeerStyle: Dispatch<SetStateAction<string>>;
}) {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const resultsContainerRef = useRef<any>(null);
  const inputContainerRef = useRef<any>(null);

  // Process entered queries
  const handleInputChange = (event: { target: { value: string } }) => {
    const query = event.target.value;
    setBeerStyle(query);

    setSearchResults(findMatches(query));
    setShowSuggestions(true);
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
      if (selectedIndex !== -1) {
        const result = searchResults[selectedIndex];
        setBeerStyle(result);
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
        !resultsContainerRef.current.contains(event.target) &&
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      } else if (
        (resultsContainerRef.current &&
          resultsContainerRef.current.contains(event.target)) ||
        (inputContainerRef.current &&
          inputContainerRef.current.contains(event.target))
      ) {
        setShowSuggestions(true);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col gap-2">
      <h1 className="border-solid border-b-2 text-xl font-serif">Beer Style</h1>
      <input
        className={
          "border-solid rounded-md border-2 border-gray-300 w-full" +
          " mx-5 ml-0 p-2"
        }
        placeholder="Internet Ale"
        ref={inputContainerRef}
        value={beerStyle}
        onChange={handleInputChange}
      />
      {searchResults.length > 0 && showSuggestions && (
        <div
          tabIndex={-1}
          ref={resultsContainerRef}
          className={
            "absolute flex flex-col z-10 mt-[5.5rem] bg-white rounded-md" +
            " border border-gray-300 shadow-lg w-full sm:w-[28rem] "
          }
        >
          {searchResults.map((result, index) => (
            <span
              key={index}
              className={`px-4 py-2 ${index === selectedIndex ? "bg-gray-200" : ""} ${index === 0 ? "border-b" : index === searchResults.length - 1 ? "border-t" : "border-y"}`}
              onClick={() => {
                setBeerStyle(result);
                setSearchResults([]);
              }}
            >
              {BeerStyleTag({ style: result })}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
