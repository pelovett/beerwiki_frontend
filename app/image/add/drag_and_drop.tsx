import React from "react";
import { useDrop, DropTargetMonitor, DndProvider } from "react-dnd";
import { HTML5Backend, NativeTypes } from "react-dnd-html5-backend";
import type { FC, LegacyRef } from "react";

const VALID_FILE_TYPES = ["image/jpeg", "image/png"];

interface FileSelection {
  files: any[];
}

interface DragAndDropProp {
  setImage: (image: File) => void;
}

const FileTarget: FC<DragAndDropProp> = ({ setImage }: DragAndDropProp) => {
  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleBrowseFilesClick = () => {
    if (!fileInputRef) {
      return;
    }

    fileInputRef?.current?.click();
  };
  const handleBrowseSelection = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (!VALID_FILE_TYPES.includes(file["type"])) {
        alert("Image must be jpeg or png");
      } else {
        setImage(file);
      }
    }
  };

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: FileSelection) {
        if (!VALID_FILE_TYPES.includes(item.files[0]["type"])) {
          alert("Image must be jpeg or png");
        } else {
          setImage(item.files[0]);
        }
      },
      canDrop(_: any) {
        return true;
      },
      collect: (monitor: DropTargetMonitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [(e: any) => setImage(e?.target.files[0])]
  );

  return (
    <div // Typescript is complaining so I added casting
      ref={drop as unknown as LegacyRef<HTMLDivElement>}
      className={
        "flex flex-col flex-wrap justify-center items-center py-5 gap-6" +
        " w-3/5 h-3/5 max-w-[40rem] max-h-[40rem] border-dashed border-2 rounded-lg"
      }
    >
      {canDrop ? (
        <>
          <div className="text-lg">Release to drop</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4em"
            height="4em"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="m553.1 509.1l-77.8 99.2l-41.1-52.4a8 8 0 0 0-12.6 0l-99.8 127.2a7.98 7.98 0 0 0 6.3 12.9H696c6.7 0 10.4-7.7 6.3-12.9l-136.5-174a8.1 8.1 0 0 0-12.7 0M360 442a40 40 0 1 0 80 0a40 40 0 1 0-80 0m494.6-153.4L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7M790.2 326H602V137.8zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216z"
            />
          </svg>
        </>
      ) : (
        <>
          <div className="text-lg">Drag and Drop Image</div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleBrowseSelection}
            style={{ display: "none" }}
            accept="image/*"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4em"
            height="4em"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M518.3 459a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9z"
            />
            <path
              fill="currentColor"
              d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7c-23.5-24.2-36-56.8-34.9-90.6c.9-26.4 9.9-51.2 26.2-72.1c16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9l13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9c15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5l37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3"
            />
          </svg>
          <button
            type="submit"
            onClick={handleBrowseFilesClick}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Browse Files
          </button>
        </>
      )}
    </div>
  );
};

const DragAndDrop = (props: DragAndDropProp) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <FileTarget setImage={props.setImage} />
    </DndProvider>
  );
};

export default DragAndDrop;
