export const pairs = [
  ["Pale Lager", "from-[#ffd700] to-[#ffef9d]", "text-[#5e3703]"],
  ["Witbier", "from-[#ffd700] to-[#ffef9d]", "text-[#785101]"],
  ["Pilsner", "from-[#ffd700] to-[#ffef9d]", "text-[#785101]"],
  ["Berliner Weisse", "from-[#ffd700] to-[#ffef9d]", "text-[#785101]"],
  ["Maibock", "from-[#fee669] to-[#feee69]", "text-[#785101]"],
  ["Blonde Ale", "from-[#fee669] to-[#feee69]", "text-[#785101]"],
  ["Weissbier", "from-[#fee669] to-[#feee69]", "text-[#785101]"],
  ["American Pale Ale", "from-[#CB4403] to-[#EF8422]", "text-orange-100"],
  ["India Pale Ale", "from-[#CB4403] to-[#EF8422]", "text-orange-100"],
  ["Saison", "from-[#FAC503] to-[#F4CE43]", "text-[#785101]"],
  ["English Bitter", "from-[#750D02] to-[#C21D06]", "text-orange-100"],
  ["Bière de Garde", "from-[#FF6701] to-[#FBA629]", "text-orange-100"],
  ["Douple IPA", "from-[#BA0A00] to-[#CE5402]", "text-orange-100"],
  ["Dark Lager", "bg-[#8D4C32]", "text-orange-100"],
  ["Vienna Lager", "bg-[#8D4C32]", "text-orange-100"],
  ["Märzen", "bg-[#8D4C32]", "text-orange-100"],
  ["Amber Ale", "bg-[#8D4C32]", "text-orange-100"],
  ["Brown Ale", "bg-[#5D341A]", "text-orange-100"],
  ["Bock", "bg-[#5D341A]", "text-orange-100"],
  ["Dunkel", "bg-[#5D341A]", "text-orange-100"],
  ["Dunkelweizen", "bg-[#5D341A]", "text-orange-100"],
  ["Irish Dry Stout", "bg-[#261716]", "text-orange-100"],
  ["Doppelbock", "bg-[#261716]", "text-orange-100"],
  ["Porter", "bg-[#261716]", "text-orange-100"],
  ["Stout", "bg-[#0F0B0A]", "text-orange-100"],
  ["Foreign Dry Stout", "bg-[#080707]", "text-orange-100"],
  ["Baltic Porter", "bg-[#080707]", "text-orange-100"],
  ["Imperial Stout", "bg-[#030403]", "text-orange-100"],
];

function searchPairs(style: string): string[] {
  const match = pairs.find(
    (pair) => pair[0].toLowerCase() === style.toLowerCase()
  );

  if (match) {
    return match.slice(1);
  } else {
    return ["[#030403]", "orange-100"];
  }
}

export default function BeerStyleTag({ style }: { style: string }) {
  const hazy_list = [
    "pale lager",
    "witbier",
    "pilsner",
    "berliner weisse",
    "maibock",
    "blonde ale",
    "weissbier",
    "american pale ale",
    "india pale ale",
    "saison",
    "english bitter",
    "bière de garde",
    "douple ipa",
  ];

  const hazy = hazy_list.includes(style.toLowerCase());
  const [backgroundColor, textColor, borderColor] = searchPairs(style);

  if (hazy) {
    return (
      <div
        className={`
        relative inline-flex items-center
        px-2 py-1 rounded-full
        bg-gradient-to-b
        ${backgroundColor} backdrop-blur-sm
        shadow-md text-xs font-medium
        text-${textColor}
      `}
      >
        {/* Content layer */}
        <span className={`relative z-10 ${textColor} text-nowrap`}>
          {style}
        </span>
      </div>
    );
  } else {
    return (
      <div
        className={`
          relative inline-flex items-center
          px-2 py-1 rounded-full
          ${backgroundColor} backdrop-blur-sm
          border h-min ${borderColor}
          shadow-lg ${textColor}
          text-xs font-medium text-nowrap
          `}
      >
        {style}
      </div>
    );
  }
}
