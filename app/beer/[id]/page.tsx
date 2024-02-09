const BACKEND_SERVER = process.env.BACKEND_SERVER || "http://localhost:8888";
const REVALIDATION_TIMEOUT_SEC = 60;

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const beerName = await getBeerInfo(id);
  return <div>Beer Name: {beerName}</div>;
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
    throw new Error("No beer message returned from backend!");
  }

  return data.message;
}
