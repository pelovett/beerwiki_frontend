import Sidebar from "@/app/components/side_bar";
import BLink from "../../components/beer_link";
import { getBeerName } from "../../api_calls/beer_calls";

const REVALIDATION_TIMEOUT_SEC = 60;

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const beerName = await getBeerName(name, REVALIDATION_TIMEOUT_SEC);
  return (
    <div className="flex flex-row max-w-[99.75rem] mt-12 self-center">
      <Sidebar />
      <div>
        <div className="flex flex-column justify-between">
          <h1 className="border-solid border-b-2 text-3xl font-serif">
            {beerName}
          </h1>
          <BLink url="/" text="test" font="font-medium" />
        </div>
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
