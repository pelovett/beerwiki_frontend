import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";

import { NEXT_PUBLIC_BACKEND_SERVER } from "../../utils/network/util";

type CityResult = {
  name: string;
  flag: string;
  admin_name: string;
};

function cityDisplayName(city: CityResult): string {
  return city.name + ", " + city.admin_name + "  " + city.flag;
}

export default function BrewerLocationInput({
  breweryLocation,
  setBreweryLocation,
}: {
  breweryLocation: string;
  setBreweryLocation: Dispatch<SetStateAction<string>>;
}) {
  const [lastSearchTime, setLastSearchTime] = useState(Date.now());
  const [searchResults, setSearchResults] = useState<CityResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const resultsContainerRef = useRef<any>(null);

  // Process entered queries
  const handleInputChange = (event: { target: { value: string } }) => {
    const query = event.target.value;
    const runTime = Date.now();
    setBreweryLocation(query);

    // Only send request every 500ms
    if (
      query !== "" &&
      query.length > 2 &&
      new Date(lastSearchTime + 500).getTime() < runTime
    ) {
      setLastSearchTime(runTime);
      fetch(
        NEXT_PUBLIC_BACKEND_SERVER +
          `/util/city-search?q=${encodeURIComponent(query.trim())}`
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
            data.results.map(
              (x: any): CityResult => ({
                name: x.name,
                flag: x.flag,
                admin_name: x.admin_name,
              })
            )
          );
          console.log(searchResults);
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
      if (selectedIndex !== -1) {
        const result = searchResults[selectedIndex];
        setBreweryLocation(cityDisplayName(result));
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
    <div className="relative flex flex-col gap-2">
      <h1 className="border-solid border-b-2 text-xl font-serif">
        Brewery Location
      </h1>
      <input
        className={
          "border-solid rounded-md border-2 border-gray-300 w-full" +
          " mx-5 ml-0 p-2"
        }
        placeholder="Beertown, USA"
        value={breweryLocation}
        onChange={handleInputChange}
      />
      {searchResults.length > 0 && (
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
                setBreweryLocation(cityDisplayName(result));
                setSearchResults([]);
              }}
            >
              {cityDisplayName(result)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
