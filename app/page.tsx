import SearchBar from "./components/search-bar";
import "./globals.css";

export default function Home() {
  return (
    <main style={{ height: "100%" }}>
      <div className="flex justify-center h-full w-full">
        <div className="block mt-[13rem]">
          <h1 className="text-center text-[200px]">🍺</h1>
          <SearchBar />
          <p className="text-center mt-6">Drink responsibly!</p>
        </div>
      </div>
    </main>
  );
}
