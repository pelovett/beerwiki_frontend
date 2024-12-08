export default function FlagTag({ country }: { country: string }) {
  const pairs = [
    ["CAN", "🇨🇦"],
    ["USA", "🇺🇸"],
    ["JPY", "🇯🇵"],
    ["GBR", "🇬🇧"],
    ["DEU", "🇩🇪"],
    ["FRA", "🇫🇷"],
    ["ITA", "🇮🇹"],
    ["ESP", "🇪🇸"],
    ["CHN", "🇨🇳"],
    ["RUS", "🇷🇺"],
    ["KOR", "🇰🇷"],
    ["IND", "🇮🇳"],
    ["BRA", "🇧🇷"],
    ["ARG", "🇦🇷"],
    ["MEX", "🇲🇽"],
    ["COL", "🇨🇴"],
    ["PER", "🇵🇪"],
    ["VIE", "🇻🇳"],
    ["THA", "🇹🇭"],
    ["PHL", "🇵🇭"],
    ["MYA", "🇲🇾"],
    ["IDN", "🇮🇩"],
    ["SIN", "🇸🇬"],
    ["THA", "🇹🇭"],
    ["PHL", "🇵🇭"],
    ["MYA", "🇲🇾"],
    ["IDN", "🇮🇩"],
    ["BEL", "🇧🇪"],
    ["LUX", "🇱🇺"],
    ["NLD", "🇳🇱"],
    ["AUT", "🇦🇹"],
    ["CZE", "🇨🇿"],
    ["SVK", "🇸🇰"],
    ["POL", "🇵🇱"],
    ["HRV", "🇭🇷"],
    ["SRB", "🇷🇸"],
    ["CHE", "🇨🇭"],
    ["ROU", "🇷🇴"],
    ["TUR", "🇹🇷"],
    ["IRL", "🇮🇪"],
    ["DNK", "🇩🇰"],
    ["FIN", "🇫🇮"],
    ["NOR", "🇳🇴"],
    ["SWE", "🇸🇪"],
  ]; // TODO: Add more countries

  const countryMap = pairs.reduce(
    (acc, [key, value]) => acc.set(key, value),
    new Map<string, string>()
  );
  return (
    <div
      className={`
        inline rounded-full px-[0.25rem] border-2 
        text-xs content-center shadow-md`}
    >
      {countryMap.get(country)}
    </div>
  );
}
