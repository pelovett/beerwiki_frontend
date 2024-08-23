import BLink from "./beer_link";

export default function Sidebar() {
  return (
    <div className="flex flex-col min-w-44 mx-2">
      <div className="flex flex-col items-center">
        <p className="text-center text-[4rem] select-none">🍺</p>
        <p className="text-center text-[2rem] mb-2">Beer Wiki</p>
        <hr className="self-center w-3/4" />
      </div>
      <div className="flex flex-col items-center mt-5 space-y-5">
        <BLink url="/" text="Home" font="font-medium" />
        <BLink url="/search" text="Search" font="font-medium" />
        <BLink url="/beer/add" text="Add Beer" font="font-medium" />
      </div>
    </div>
  );
}
