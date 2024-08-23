import SearchBar from "./components/search_bar";
import "./globals.css";
import BLink from "./components/beer_link"

export default function Home() {
  return (
    <main style={{ height: "100%" }}>
      <div className="flex justify-center h-full w-full">
        <div className="block mt-[13rem] w-[28rem]">
          <h1 className="text-center text-[4.5rem]">Beer Wiki</h1>
          <p className="text-center text-[10rem]">🍺</p>
          <SearchBar />
          <p className="text-center mt-6">Drink responsibly!</p>
          <div className="text-center mt-6">
            <BLink url="/beer/add" text="Add Beer" font="font-medium" />
          </div>
        </div>
      </div>
    </main>
  );
}
