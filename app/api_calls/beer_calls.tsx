import { BaseNextRequest } from "next/dist/server/base-http";

const BACKEND_SERVER =
  process.env.NEXT_PUBLIC_BACKEND_SERVER || "http://localhost:8888";

export type BeerPageContent = {
  name: string;
  ipaml: string;
};

export async function getBeer(
  beer_name: string,
  reval_timeout_sec: number
): Promise<BeerPageContent | null> {
  let data;
  try {
    const res = await fetch(BACKEND_SERVER + `/beer/name/${beer_name}`, {
      next: { revalidate: reval_timeout_sec },
    });
    data = await res.json();
  } catch (err) {
    console.error(err);
    console.log(`Failed to fetch beer page: ${beer_name} err: ${err}`);
  }

  if (!data?.page_ipa_ml) {
    console.error("No beer description returned from backend!");
    return null;
  }
  if (!data?.name) {
    console.error("No beer message returned from backend!");
    return null;
  }

  return { name: data.name, ipaml: data.page_ipa_ml };
}

export async function randomBeer(): Promise<string | null> {
  let data;
  try {
    const res = await fetch(BACKEND_SERVER + "/beer/random");
    data = await res.json();
  } catch (err) {
    console.error(err);
    console.log("Failed to fetch random beer");
  }

  if (!data?.url_name) {
    console.error(`Server didn't send back url_name: ${data}`);
    return null;
  }
  return data.url_name;
}

export async function newBeer(
  beer_url_name: string,
  beer_name: string,
  brewery_location: string,
  beer_style: string,
  new_description: string
): Promise<Boolean> {
  const info_box = new Map<string, string>();
  if (beer_name !== "") {
    info_box.set("title", beer_name);
  }
  if (brewery_location !== "") {
    info_box.set("location", brewery_location);
  }
  if (beer_style !== "") {
    info_box.set("style", beer_style);
  }

  let info_box_str = "{\n";
  info_box.forEach((value, key) => {
    info_box_str += key + ": " + value + "\n";
  });
  info_box_str += "}\n";

  let data;
  try {
    const res = await fetch(BACKEND_SERVER + "/beer/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url_name: beer_url_name,
        name: beer_name,
        page_ipa_ml: info_box_str + new_description,
      }),
    });
    data = await res.json();
  } catch (err) {
    console.error(err);
    console.log(`Failed to add beer with error: ${err}`);
    return false;
  }

  return true;
}

export async function setBeerIPAML(
  beer_url_name: string,
  new_description: string
): Promise<Boolean> {
  let data;
  try {
    const res = await fetch(BACKEND_SERVER + "/beer/description", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url_name: beer_url_name,
        page_ipa_ml: new_description,
      }),
    });
    data = await res.json();
  } catch (err) {
    console.error(err);
    console.log(`Failed to set beer description with err: ${err}`);
    return false;
  }

  return true;
}
