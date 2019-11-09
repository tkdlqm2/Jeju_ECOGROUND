import React, { useState } from "react";
import UploadProduct from "./presenter";
import imageCompression from "utils/imageCompression";
import ui from "utils/ui";
import useInput from "hooks/useInput";
import makerApi  from '../../api/maker';

const Container = props => {
  const title       = useInput("");
  const description = useInput("");
  const targetKlay  = useInput("");
  const price    = useInput("");
  const D_day    = useInput("");
  // const filePath = useInput("");
  const { uploadItem } = props;
  const [isCompressing, setIsCompressing] = useState(false);

  const [filePath, setFilePath] = useState("");
  const [file, setFile]         = useState("");
  const [fileName, setFileName] = useState("");

  const MAX_IMAGE_SIZE    = 30000; // 30KB
  const MAX_IMAGE_SIZE_MB = 0.03; // 30KB

  // TODO: 이미지 임시저장
  const handleFileChange = e => {
    const file = e.target.files[0];
    let data = makerApi.tempSave(file)
                       .then(data => {
                         return data[0].location;
                       })
                       .then(data => {
                          setFile(file);
                          setFileName(file.name);
                          setFilePath(data);
                       });

  };

  const handleSubmit = e =>  {
    e.preventDefault();

    const titleValue       = title.value;
    const descriptionValue = description.value;
    const targetKlayValue  = targetKlay.value;
    const priceValue = price.value;
    const D_dayValue = D_day.value;

    makerApi.register({
      title      : titleValue ,
      description: descriptionValue ,
      price      : priceValue,
      targetKlay : targetKlayValue,
      DDay       : D_dayValue,
      imgArr     : [filePath]
    });

    // TODO: 상품 등록 - 피드
    uploadItem(
      file,
      filePath,
      titleValue,
      descriptionValue,
      targetKlayValue,
      D_dayValue,
      priceValue
    );

    ui.hideModal();
  };

  const compressImage = async imageFile => {
    try {
      const compressedFile = await imageCompression(
        imageFile,
        MAX_IMAGE_SIZE_MB
      );
      setIsCompressing(false);
      
      const tempImg = await makerApi.tempSave(file);

      setFile(file);
      setFileName(file.name);
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
      filePath={filePath}
      fileName={fileName}
      title={title}
      description={description}
      targetKlay={targetKlay}
      price={price}
      isCompressing={isCompressing}
      D_day={D_day}
    />
  );
};

export default Container;