import Sidebar from "@/app/components/side_bar";
import BLink from "../../components/beer_link";
import { getBeerIPAML, getBeerName } from "../../api_calls/beer_calls";
import { formatAndRenderText } from "../../ipa_ml/ml_rendering";

const REVALIDATION_TIMEOUT_SEC = 60;

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const [beerName, ipaMlContent] = await Promise.all([
    getBeerName(name, REVALIDATION_TIMEOUT_SEC),
    getBeerIPAML(name, REVALIDATION_TIMEOUT_SEC),
  ]);

  const pageContent = formatAndRenderText(ipaMlContent);
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
            {pageContent}
        </p>
      </div>
    </div>
  );
}
