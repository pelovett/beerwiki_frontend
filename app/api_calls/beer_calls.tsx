const BACKEND_SERVER =
  process.env.NEXT_PUBLIC_BACKEND_SERVER || "http://localhost:8888";

export async function getBeerIPAML(
  beer_name: string,
  reval_timeout_sec: number
): Promise<string> {
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
    return "";
  }

  return data.page_ipa_ml;
}

export async function getBeerName(
  beer_url_name: string,
  reval_timeout_sec: number
): Promise<string> {
  let data;
  try {
    const res = await fetch(BACKEND_SERVER + `/beer/name/${beer_url_name}`, {
      next: { revalidate: reval_timeout_sec },
    });
    data = await res.json();
  } catch (err) {
    console.error(err);
    console.log(`Failed to fetch beer page: ${beer_url_name} err: ${err}`);
  }

  if (!data?.name) {
    console.error("No beer message returned from backend!");
    return "";
  }

  return data.name;
}

export async function newBeer(
  beer_url_name: string,
  beer_name: string,
  new_description: string
): Promise<Boolean> {
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
        page_ipa_ml: new_description,
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
