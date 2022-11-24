/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useRef, useState } from "react";

export default function useUploadImage() {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const handleChangeImage = files => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "qryswafs");
    const config = {
      onUploadProgress: e => {
        const { loaded, total } = e;
        setProgress(Math.floor((loaded / total) * 100));
      },
    };

    axios.post("https://api.cloudinary.com/v1_1/dzflfdnci/image/upload", formData, config).then(response => {
      setImage(response.data.url);
    });
  };
  const handleDeleteImage = () => {};
  return {
    image,
    setImage,
    progress,
    handleChangeImage,
    handleDeleteImage,
  };
}
