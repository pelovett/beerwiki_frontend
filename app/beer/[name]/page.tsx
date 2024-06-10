import Sidebar from "@/app/components/side_bar";

const NEXT_PUBLIC_BACKEND_SERVER  = process.env.NEXT_PUBLIC_BACKEND_SERVER  || "http://localhost:8888";
const REVALIDATION_TIMEOUT_SEC = 60;

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const beerName = await getBeerInfo(name);
  return (
    <div className="flex flex-row max-w-[99.75rem] mt-12 self-center">
      <Sidebar />
      <div>
        <h1 className="border-solid border-b-2 text-3xl font-serif">
          {beerName}
        </h1>
        <p className="font-serif">
          Pabst Blue Ribbon, commonly abbreviated PBR, is an American lager beer
          sold by Pabst Brewing Company, established in Milwaukee, Wisconsin, in
          1844 and currently based in San Antonio. Originally called Best
          Select, and then Pabst Select, the current name comes from the blue
          ribbons tied around the bottle’s neck between 1882 and 1916.
        </p>
      </div>
    </div>
  );
}

async function getBeerInfo(beer_name: string): Promise<string> {
  let data;
  try {
    const res = await fetch(NEXT_PUBLIC_BACKEND_SERVER  + `/beer/name/${beer_name}`, {
      next: { revalidate: REVALIDATION_TIMEOUT_SEC },
    });
    data = await res.json();
  } catch (err) {
    console.error(err);
    console.log(`Failed to fetch beer page: ${beer_name} err: ${err}`);
  }

  if (!data?.name) {
    console.error("No beer message returned from backend!");
    return "";
  }

  return data.name;
}
