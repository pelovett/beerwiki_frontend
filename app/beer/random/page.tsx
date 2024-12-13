import { redirect } from "next/navigation";
import { randomBeer } from "../../api_calls/beer_calls";

export default async function Page({}: {}) {
  const beer = await randomBeer();
  if (!beer) {
    return <div>No beer found</div>;
  }
  redirect(`/beer/${beer}`);
}
