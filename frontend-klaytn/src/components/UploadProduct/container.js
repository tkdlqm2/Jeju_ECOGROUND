import React, { useState } from "react";
import UploadProduct from "./presenter";
import imageCompression from "utils/imageCompression";
import ui from "utils/ui";
import useInput from "hooks/useInput";
import makerApi from "../../api/maker";

const Container = props => {
  const title = useInput("");
  const description = useInput("");
  const targetKlay = useInput("");
  const price = useInput("");
  const filePath = useInput("");

  const { uploadItem } = props;
  const [isCompressing, setIsCompressing] = useState(false);

  const [D_day] = useState("");

  // const MAX_IMAGE_SIZE = 30000; // 30KB
  // const MAX_IMAGE_SIZE_MB = 0.03; // 30KB

  // TODO: 이미지 임시저장
  // const handleFileChange = e => {
  //   const file = e.target.files[0];
  //   makerApi
  //     .tempSave(file)
  //     .then(data => {
  //       return data[0].location;
  //     })
  //     .then(data => {
  //       setFile(file);
  //       setFileName(file.name);
  //       setFilePath(data);
  //     });
  // };

  const today = new Date();

  const [selectedDate, setSelectedDate] = React.useState(today);

  const handleDateChange = date => {
    const yearValue = date.getYear() + 1900;
    const monthValue = date.getMonth() + 1;
    const dateValue = date.getDate();

    if (monthValue >= 10 && dateValue >= 10) {
      const selectedValue = `${yearValue}-${monthValue}-${dateValue}`;
      setSelectedDate(selectedValue);
    } else if (monthValue >= 10 && dateValue < 10) {
      const selectedValue = `${yearValue}-${monthValue}-0${dateValue}`;
      setSelectedDate(selectedValue);
    } else if (monthValue < 10 && dateValue >= 10) {
      const selectedValue = `${yearValue}-0${monthValue}-${dateValue}`;
      setSelectedDate(selectedValue);
    } else if (monthValue < 10 && dateValue < 10) {
      const selectedValue = `${yearValue}-0${monthValue}-0${dateValue}`;
      setSelectedDate(selectedValue);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const titleValue = title.value;
    const descriptionValue = description.value;
    const targetKlayValue = targetKlay.value;
    const priceValue = price.value;
    const filePathValue = filePath.value;

    // makerApi.register({
    //   title: titleValue,
    //   description: descriptionValue,
    //   price: priceValue,
    //   targetKlay: targetKlayValue,
    //   DDay: D_day,
    //   imgArr: [filePath]
    // });

    try {
      uploadItem(
        filePathValue,
        titleValue,
        descriptionValue,
        targetKlayValue,
        selectedDate,
        priceValue
      );
    } catch (error) {}

    // TODO: 상품 등록 - 피드

    ui.hideModal();
  };

  // const compressImage = async imageFile => {
  //   try {
  //     await imageCompression(imageFile, MAX_IMAGE_SIZE_MB);
  //     setIsCompressing(false);

  //     await makerApi.tempSave(file);

  //     setFile(file);
  //     setFileName(file.name);
  //   } catch (error) {
  //     setIsCompressing(false);
  //   }
  // };

  return (
    <UploadProduct
      handleSubmit={handleSubmit}
      filePath={filePath}
      title={title}
      description={description}
      targetKlay={targetKlay}
      price={price}
      D_day={selectedDate}
      handleDateChange={handleDateChange}
      selectedDate={selectedDate}
    />
  );
};

export default Container;
