import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./Notification/Loader";
import { uploadImagesService } from "../Redux/APIs/ImageUploadService";

function Uploder({ setImageUrl }) {
  const [loading, setLoading] = useState(false);

  // upload file
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = new FormData();
      file.append("file", acceptedFiles[0]);
      const data = await uploadImagesService(file, setLoading);
      setImageUrl(data);
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
    });
  return (
    <div className="w-full text-center flex-colo gap-6">
      { loading ? (
        <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md">
          <Loader />
        </div>
      ) : (
        <div
          { ...getRootProps() }
          className="px-6 w-full py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
        >
          <input { ...getInputProps() } />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          <p className="text-sm mt-2">Перетягніть або виберіть зображення</p>
          <em className="text-xs text-border">
            { isDragActive
              ? "Drop it like it's hot!"
              : isDragReject
                ? "Unsupported file type..."
                : "тільки .jpg та .png файли будуть прийняті" }
          </em>
        </div>
      ) }
    </div>
  );
}

export default Uploder;