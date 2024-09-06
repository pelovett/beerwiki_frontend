import BLink from "./beer_link";

export default function TopBar() {
  return (
    <>
      <nav className="flex sm:hidden justify-between items-center py-2 mx-3">
        <a href="/" className="text-[2.5rem] font-bold select-none">
          🍺
        </a>
        <a href="/">
          <h1 className="text-3xl font-serif">Hop Wiki</h1>
        </a>
        <div className="flex items-center relative cursor-pointer">
          <label>
            <svg
              className="h-7 w-7"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 18h18" />
              <path d="M3 6h18" />
              <path d="M3 12h18" />
            </svg>
          </label>
          <input
            className="peer absolute z-1 w-6 h-6 opacity-0"
            type="checkbox"
          />
          <div
            className={
              "peer-checked:flex hidden flex-col items-start" +
              " absolute top-8 right-1 z-1" +
              " w-max px-4 py-3 space-y-3" +
              " bg-white border-solid border-2 rounded-sm"
            }
          >
            <BLink url="/" text="Home" font="font-medium" />
            <BLink url="/search" text="Search" font="font-medium" />
            <BLink url="/user/login" text="Login" font="font-medium" />
            <BLink url="/user/profile" text="Profile" font="font-medium" />
            <BLink url="/beer/add" text="Add Beer" font="font-medium" />
            <BLink url="/image/add" text="Add Image" font="font-medium" />
          </div>
        </div>
      </nav>
    </>
  );
}
