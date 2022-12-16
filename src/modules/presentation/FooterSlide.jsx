/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import useHover from "../../hooks/useHover";
import useToggleModal from "../../hooks/useToggleModal";
import ModalMain from "../../components/modal/ModalMain";

function FooterSlide({ quantity = 0 }) {
  const [ref, hovered] = useHover();
  const { open, handleClickOpen, handleClose } = useToggleModal();
  return (
    // <div className="absolute bottom-8 right-4 flex">
    //   <div>
    //   <ChatBubbleIcon />
    // </div>
    //   <div className=" relative flex-1 flex justify-end items-start mt-8">
    //     <AccountCircleIcon className="text-gray-700 absolute" />
    //     <span className="text-white text-[10px] w-2 h-2 flex items-center justify-center bg-blue-600 p-2 rounded-full absolute -top-2 right-0">
    //       {quantity}
    //     </span>
    //   </div>
    // </div>
    <>
      <div className="flex justify-end gap-4 mt-5">
        <div
          ref={ref}
          className={`p-2 rounded-full relative cursor-pointer ${hovered ? "bg-gray-300" : "bg-gray-200"}`}
          onClick={() => {
            handleClickOpen();
          }}
        >
          <QuestionAnswerIcon className="text-gray-600" />
          <div
            // ref={ref}
            className={`absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-1 rounded-md text-white text-sm ${
              hovered ? "bg-blue-700" : "bg-blue-600"
            }`}
          >
            {quantity}
          </div>
        </div>
        <div className="p-2 bg-gray-200 rounded-full relative">
          <AccountCircleIcon className="text-gray-600" />
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-1 bg-blue-600 rounded-md text-white text-sm">
            {quantity}
          </div>
        </div>
      </div>
      {open && <ModalQuestions handleClose={handleClose} />}
    </>
  );
}
FooterSlide.propTypes = {
  quantity: PropTypes.number,
};

function ModalQuestions({ handleClose }) {
  if (typeof document === "undefined") return null;
  const [upvoteRef, upvoteHovered] = useHover();
  const data = [
    { title: "U gud?" },
    { title: "Don't you?" },
    {
      title:
        "Where were you been fqwfwqflwq fwqlnfwqnlfnlwqnlfnlkwqnflkwlqknfnwqlnflwkq fwqf.ưqnflwqjflwqk fqwfwqfwqfwqfqwfwqf ưqfwqfqwfwqfwqfqwfqwfqwfwqfqw?",
    },
  ];
  const [listQuestions, setListQuestions] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listAnsweredQuestions, setListAnsweredQuestions] = useState([]);
  const hanldeOnClickCheckAnswered = () => {
    console.log(listAnsweredQuestions.includes(currentIndex));
    if (listAnsweredQuestions.includes(currentIndex)) return;
    setListAnsweredQuestions([...listAnsweredQuestions, currentIndex]);
  };
  const handleOnClickUncheckAnswered = () => {
    if (listAnsweredQuestions.includes(currentIndex))
      setListAnsweredQuestions(listAnsweredQuestions.splice(currentIndex, 1));
  };
  const handleOnClickNext = () => {
    if (currentIndex < listQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handleOnClickPre = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div className="absolute w-full left-0  top-0 bottom-0  flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-10">
      <div className="relative bg-white rounded-lg w-[60%] h-[70%] ">
        <div
          className="p-2 rounded-full absolute top-4 right-4 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center ">
          <div
            className={`rounded-full p-2 border border-gray-300 cursor-pointer hover:bg-gray-10 ${
              currentIndex === 0 ? "invisible" : ""
            }`}
            onClick={handleOnClickPre}
          >
            <ExpandLessIcon />
          </div>

          <div className="text-lg mt-10">
            {currentIndex + 1}/{listQuestions.length}
          </div>
          <div className="text-2xl mt-2">
            <span className="font-bold">Asked on </span>Mutiple choice
          </div>
          <div
            className={`${
              listQuestions[currentIndex].title.length < 50 ? "text-4xl" : "text-2xl"
            } font-bold mt-6 text-center`}
          >
            {listQuestions[currentIndex].title}
          </div>
          <div className="text-xl mt-6">
            1
            <span ref={upvoteRef} className="ml-2 cursor-pointer">
              {upvoteHovered ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
            </span>
          </div>
          <div
            className={`rounded-full p-2 border border-gray-300 mt-10 cursor-pointer hover:bg-gray-100 ${
              currentIndex === listQuestions.length - 1 ? "invisible" : ""
            }`}
            onClick={handleOnClickNext}
          >
            <ExpandMoreIcon />
          </div>
          {listAnsweredQuestions.includes(currentIndex) ? (
            <div
              className="px-4 py-2 flex gap-2 text-white bg-blue-500 rounded-full mt-4 cursor-pointe cursor-pointer"
              onClick={handleOnClickUncheckAnswered}
            >
              <div className="rounded-full bg-white">
                <CheckIcon color="primary" />
              </div>
              Answered
            </div>
          ) : (
            <div
              className="px-4 py-2 rounded-full border border-gray-300 mt-4 cursor-pointer hover:bg-gray-100"
              onClick={hanldeOnClickCheckAnswered}
            >
              Mark as answered
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
ModalQuestions.propTypes = {
  handleClose: PropTypes.func,
};

export default FooterSlide;
