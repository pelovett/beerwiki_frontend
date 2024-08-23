import { Dispatch, SetStateAction } from "react";

import { NEXT_PUBLIC_BACKEND_SERVER } from "@/app/network/util";

export const uploadImage = async (
  image: File,
  imageName: string,
  setLoadStatus: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>
): Promise<void> => {
  // Get URL for uploading from backend
  setError("");
  setLoadStatus(true);
  let urlInfo;
  try {
    const result = await fetch(
      NEXT_PUBLIC_BACKEND_SERVER +
        "/image/upload" +
        "?name=" +
        encodeURIComponent(imageName.toLowerCase())
    );
    urlInfo = await result.json();
  } catch (err: unknown) {
    let errorString;
    if (typeof err === "string") {
      errorString = err;
    } else if (err instanceof Error) {
      errorString = err.message;
    } else {
      errorString = "Sorry, an error occurred";
    }

    console.error("Failed to retrieve upload url: ", errorString);
    setLoadStatus(false);
    setError(errorString);
    return;
  }

  if (!urlInfo?.url || !urlInfo?.id) {
    console.error("Server response didn't include url", urlInfo);
    setLoadStatus(false);
    setError(urlInfo);
    return;
  }

  // Upload blob to URL
  try {
    const formData = new FormData();
    formData.append("file", image);

    const result = await fetch(urlInfo.url, {
      method: "POST",
      body: formData,
    });
    if (result.status != 200) {
      throw Error("Failed to upload image");
    }
  } catch (err) {
    let errorString;
    if (typeof err === "string") {
      errorString = err;
    } else if (err instanceof Error) {
      errorString = err.message;
    } else {
      errorString = "Sorry, an error occurred";
    }

    console.error("Failed to upload image:", errorString);
    setLoadStatus(false);
    setError(errorString);
    return;
  }

  // Report upload to beer wiki backend
  try {
    const result = await fetch(
      NEXT_PUBLIC_BACKEND_SERVER + "/image/upload/complete",
      {
        method: "POST",
        body: JSON.stringify({ id: urlInfo.id }),
      }
    );
    if (result.status != 200) {
      throw Error(`Failed to confirm upload with backend: ${result.status}`);
    }
  } catch (err) {
    let errorString;
    if (typeof err === "string") {
      errorString = err;
    } else if (err instanceof Error) {
      errorString = err.message;
    } else {
      errorString = "Sorry, an error occurred";
    }

    console.error("Failed to report upload result to backend", errorString);
    setLoadStatus(false);
    setError(errorString);
    return;
  }

  setLoadStatus(false);
  return;
};
