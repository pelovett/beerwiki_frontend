import SearchBar from "./components/search-bar";
import "./globals.css";
import Message from "@/app/components/user_message";

export default function Home() {
  return (
    <main style={{ height: "100%" }}>
      <Message />
      <div className="flex justify-center h-full w-full">
        <div className="block mt-[13rem]">
          <h1 className="text-center text-[4.5rem]">Beer Wiki</h1>
          <h1 className="text-center text-[10rem]">🍺</h1>
          <SearchBar />
          <p className="text-center mt-6">Drink responsibly!</p>
        </div>
      </div>
    </main>
  );
}
