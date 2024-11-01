export default function FlagTag({ country }: { country: string }) {
  const pairs = [
    ["CAN", "🇨🇦"],
    ["USA", "🇺🇸"],
  ]; // TODO: Add more countries

  const countryMap = pairs.reduce(
    (acc, [key, value]) => acc.set(key, value),
    new Map<string, string>()
  );
  return (
    <div className={"inline rounded-full px-[0.25rem] border-2 text-xs"}>
      {countryMap.get(country)}
    </div>
  );
}
