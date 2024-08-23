"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import Sidebar from "@/app/components/side_bar";
import DragAndDrop from "./drag_and_drop";
import { uploadImage } from "./image_util";

const pageTitles = ["Select Image", "Name Image", "Upload Complete"];

const formStep = (
  step: number,
  setStep: Dispatch<SetStateAction<number>>
): ReactNode => {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageNameField, setImageNameField] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const processImage = (image: File) => {
    setSelectedImage(image);
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
        setStep(1);
      }
    };
    reader.readAsDataURL(image);
  };

  const errorDisplay =
    errorMessage === "Name must be unique"
      ? "Invalid name, please use another"
      : "Failed to upload image, please try again";

  switch (step) {
    case 0:
      return <DragAndDrop setImage={processImage} />;
    case 1:
      if (!selectedImage) {
        return <div>An unknown error occurred</div>;
      }

      return (
        <div className="flex flex-col flex-wrap justify-center items-center w-3/5">
          {isUploading ? (
            <div
              className={
                "flex z-10 absolute left-0 top-0 w-screen h-screen " +
                "opacity-70 bg-slate-600 justify-center items-center"
              }
            >
              <p className="z-10 mt-1/2 text-center text-[8rem] opacity-100 animate-bounce select-none">
                🍺
              </p>
            </div>
          ) : (
            <></>
          )}
          <img
            src={imagePreview}
            className={
              "max-h-80 max-w-80 mb-5 self-start hover:scale-150" +
              (!!selectedImage ? " block" : " hidden")
            }
            alt="Image preview"
          />
          <span className="text-base self-start">Enter Image Title</span>
          <input
            type="text"
            name="image_name"
            id="image_name"
            className={
              "w-full max-w-1/2 py-1.5 pl-3.5 text-gray-900 ring-1 " +
              "rounded-md border-0" +
              "ring-inset ring-gray-300 placeholder:text-gray-400 " +
              "focus:ring-2 focus:ring-inset focus:ring-blue-600 " +
              "sm:text-sm sm:leading-6 self-start text-base border-0"
            }
            onChange={(e) => setImageNameField(e.target.value)}
          />
          {!!errorMessage ? (
            <div
              className={
                "w-full max-w-1/2 bg-red-200 text-red-800 text-center " +
                "align-middle mt-3 mb-2 py-3 rounded-md"
              }
            >
              {errorDisplay}
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-row w-full mt-4">
            <button
              type="submit"
              className="p-2 min-w-32 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => {
                setSelectedImage(undefined);
                setErrorMessage("");
                setStep(0);
              }}
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={
                "p-2 min-w-32 ml-5 bg-blue-500 text-white rounded-md " +
                "hover:bg-blue-600 disabled:bg-gray-600"
              }
              onClick={() => {
                setErrorMessage("");
                uploadImage(selectedImage, imageNameField, setIsUploading).then(
                  (result) => {
                    if (result === "") {
                      setStep(2);
                    } else if (result === "Not logged in") {
                      window.location.href = "/user/login";
                    } else {
                      setErrorMessage(result);
                    }
                  }
                );
              }}
              disabled={isUploading || !imageNameField}
            >
              Submit
            </button>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col flex-wrap justify-center items-center w-3/5">
          <div className="text-[8rem]">✅</div>
          <div>
            You can add your image to a page using the following IPAML snippet:
          </div>
          <div> [{imageNameField}]</div>
        </div>
      );
  }
};

const AddImagePage = (): ReactNode => {
  const [step, setStep] = useState<number>(0);

  return (
    <div className="flex flex-row w-full h-full mt-12 self-center">
      <Sidebar />
      <div className="flex flex-col w-full h-full mx-10 self-start">
        <h1 className="border-solid border-b-2 mb-10 text-3xl font-serif">
          {pageTitles[step]}
        </h1>
        <div className="flex flex-col w-full h-full">
          {formStep(step, setStep)}
        </div>
      </div>
    </div>
  );
};

export default AddImagePage;
