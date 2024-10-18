import Sidebar from "@/app/components/side_bar";
import BLink from "../../components/beer_link";
import { getBeer } from "../../api_calls/beer_calls";
import { formatAndRenderText } from "../../ipa_ml/ml_rendering";

const REVALIDATION_TIMEOUT_SEC = 0;

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const pageContent = await getBeer(name, REVALIDATION_TIMEOUT_SEC);
  if (!pageContent) {
    return <div>No beer found</div>;
  }

  const mlContent = formatAndRenderText(pageContent.ipaml);
  const editUrl = `/beer/edit/${name}`;
  return (
    <div className="flex flex-row max-w-[99.75rem] mt-4 sm:mt-12 w-full">
      <Sidebar />
      <div className="w-full max-w-[59.25rem] mr-6 ml-6 sm:ml-0">
        <div
          className={
            "flex flex-column justify-between w-full" +
            " items-start border-solid border-b-2" +
            " pr-4"
          }
        >
          <h1 className="text-3xl font-serif">{pageContent.name}</h1>
          <BLink url={editUrl} text="edit" font="font-medium" />
        </div>
        <div className="font-serif w-full mt-4 block">{mlContent}</div>
      </div>
    </div>
  );
}
