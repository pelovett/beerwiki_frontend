export default function BeerStyleTag({ style }: { style: string }) {
  const pairs = [
    ["pale ale", "border-amber-700 bg-amber-700 text-orange-100"],
    ["lager", "border-amber-300 bg-amber-300 text-gray-900"],
    ["stout", "border-[#361d0a] bg-[#361d0a] text-orange-100"],
  ];

  const styleMap = pairs.reduce(
    (acc, [key, value]) => acc.set(key, value),
    new Map<string, string>()
  );
  return (
    <div
      className={
        "rounded-full px-[0.5rem] border-2 text-xs " +
        styleMap.get(style.toLowerCase())
      }
    >
      {style}
    </div>
  );
}
