import SearchBar from "./components/search_bar";
import "./globals.css";
import BLink from "./components/beer_link";

export default function Home() {
  return (
    <main style={{ height: "100%" }}>
      <div className="flex justify-center items-center h-full w-full">
        <div className="block">
          <h1 className="text-center text-[4.5rem] font-serif">Hop Wiki</h1>
          <p className="text-center text-[10rem]">🍺</p>
          <div className="min-w-[21rem] sm:min-w-[30rem]">
            <SearchBar />
          </div>
          <div className="text-center mt-6 space-x-4">
            <BLink url="/beer/random" text="Random Beer" font="font-medium" />
            <BLink url="/beer/add" text="Add Beer" font="font-medium" />
          </div>
          <p className="text-center mt-6 mb-11">Drink responsibly!</p>
        </div>
      </div>
    </main>
  );
}
