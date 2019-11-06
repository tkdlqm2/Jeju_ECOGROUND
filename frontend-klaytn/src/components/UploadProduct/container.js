import React, { useState } from "react";
import UploadProduct from "./presenter";
import imageCompression from "utils/imageCompression";
import ui from "utils/ui";
import useInput from "hooks/useInput";

const Container = props => {
  const title = useInput("");
  const description = useInput("");
  const targetKlay = useInput("");
  const D_day = useInput("");

  const { uploadItem } = props;

  const [isCompressing, setIsCompressing] = useState(false);

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  const MAX_IMAGE_SIZE = 30000; // 30KB
  const MAX_IMAGE_SIZE_MB = 0.03; // 30KB

  const handleFileChange = e => {
    const file = e.target.files[0];

    if (file.size > MAX_IMAGE_SIZE) {
      setIsCompressing(true);
      return compressImage(file);
    }

    setFile(file);
    setFileName(file.name);
  };

  const handleSubmit = e => {
    const titleValue = title.value;
    const descriptionValue = description.value;
    const targetKlayValue = targetKlay.value;
    const D_dayValue = D_day.value;

    e.preventDefault();
    uploadItem(file, titleValue, descriptionValue, targetKlayValue, D_dayValue);
    ui.hideModal();
  };

  const compressImage = async imageFile => {
    try {
      const compressedFile = await imageCompression(
        imageFile,
        MAX_IMAGE_SIZE_MB
      );
      setIsCompressing(false);
      setFile(compressedFile);
      setFileName(compressedFile.name);
    } catch (error) {
      setIsCompressing(false);
    }
  };

  return (
    <UploadProduct
      compressImage={compressImage}
      handleSubmit={handleSubmit}
      handleFileChange={handleFileChange}
      file={file}
      fileName={fileName}
      title={title}
      description={description}
      targetKlay={targetKlay}
      isCompressing={isCompressing}
      D_day={D_day}
    />
  );
};

export default Container;
