import Sidebar from "@/app/components/side_bar";
import TopBar from "@/app/components/top_bar";
import BLink from "../../components/beer_link";
import { getBeerIPAML, getBeerName } from "../../api_calls/beer_calls";
import { formatAndRenderText } from "../../ipa_ml/ml_rendering";

const NEXT_PUBLIC_BACKEND_SERVER =
  process.env.NEXT_PUBLIC_BACKEND_SERVER || "http://localhost:8888";
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
  const editUrl = `/beer/edit/${name}`;
  return (
    <>
      <TopBar />
      <div className="flex flex-row max-w-[99.75rem] mt-4 w-full">
        <Sidebar />
        <div className="w-full mx-3 sm:mx-5">
          <div
            className={
              "flex flex-column justify-between w-full" +
              " items-start border-solid border-b-2" +
              " pr-4"
            }
          >
            <h1 className="text-3xl font-serif">{beerName}</h1>
            <BLink url={editUrl} text="edit" font="font-medium" />
          </div>
          <div className="font-serif w-full">{pageContent}</div>
        </div>
      </div>
    </>
  );
}

async function getBeerInfo(beer_name: string): Promise<string> {
  let data;
  try {
    const res = await fetch(
      NEXT_PUBLIC_BACKEND_SERVER + `/beer/name/${beer_name}`,
      {
        next: { revalidate: REVALIDATION_TIMEOUT_SEC },
      }
    );
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
