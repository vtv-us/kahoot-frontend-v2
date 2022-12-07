/* eslint-disable default-param-last */
/* eslint-disable camelcase */
import axios from "axios";
import { toast } from "react-toastify";

/* eslint-disable import/prefer-default-export */
export const getSlideById = async (id, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/slide/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const updateSlide = async (slide, filter, accessToken, setSlide) => {
  const newSlide = { slide_id: slide?.id, content: slide?.content, title: filter };
  try {
    await axios.put(`${process.env.REACT_APP_BE_ADDRESS}/slide`, newSlide, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    setSlide({ ...slide, title: filter });
    toast.success("Updated successfully");
  } catch (error) {
    console.log(error);
    toast.error("Error updating");
  }
  return null;
};

export const createQuestion = async (
  slide_id,
  accessToken,
  raw_question = "Multiple Choice",
  meta = "",
  long_description = ""
) => {
  try {
    const data = {
      slide_id,
      raw_question,
      meta,
      long_description,
    };
    const res = await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/question`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createSlide = async (title, content, accessToken) => {
  try {
    const data = {
      title,
      content,
    };
    const res = await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/slide`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const getAlllides = async accessToken => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/slide`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getAllQuestionByIdSlide = async (idSlide, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/question/slide/${idSlide}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
