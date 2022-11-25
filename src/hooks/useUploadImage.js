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
    formData.append("upload_preset", process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET);
    const config = {
      onUploadProgress: e => {
        const { loaded, total } = e;
        setProgress(Math.floor((loaded / total) * 100));
      },
    };

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
        formData,
        config
      )
      .then(response => {
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
