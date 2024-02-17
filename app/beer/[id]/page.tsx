const BACKEND_SERVER = process.env.BACKEND_SERVER || "http://localhost:8888";
const REVALIDATION_TIMEOUT_SEC = 60;

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const beerName = await getBeerInfo(id);
  return (
    < div className="flex flex-row">
      <div className="flex flex-column">
        <img src="/beer.jpg" alt="A nice glass of beer"></img>
      </div>
      <div className="ms-5">
        <h1 className="border-solid border-b-2 text-3xl font-serif">{beerName}</h1>
        <p className="font-serif">Pabst Blue Ribbon, commonly abbreviated PBR, is an American lager beer sold by Pabst Brewing Company, established in Milwaukee, Wisconsin, in 1844 and currently based in San Antonio. Originally called Best Select, and then Pabst Select, the current name comes from the blue ribbons tied around the bottle’s neck between 1882 and 1916.</p>
      </div >
    </div>
  );
}

async function getBeerInfo(beer_id: string): Promise<string> {
  let data;
  try {
    const res = await fetch(BACKEND_SERVER + `/beer/${beer_id}`, {
      next: { revalidate: REVALIDATION_TIMEOUT_SEC },
    });
    data = await res.json();
  } catch (err) {
    console.error(err);
    console.log(`Failed to fetch beer page: ${beer_id} err: ${err}`);
  }

  if (!data.message) {
    console.error("No beer message returned from backend!");
  }

  return data.message;
}
