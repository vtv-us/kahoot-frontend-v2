/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useContext, useEffect, useState } from "react";
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
import ReationInSlideUI from "../../components/icon/ReationInSlideUI";
import ReactionListInSlideUI from "./ReactionListInSlideUI";
import { useSlide } from "../../contexts/slideContext";
import { QUESTION_TYPE } from "../../utils/constants";
import { SocketContext } from "../../contexts/socketContext";

function FooterSlide({ type = QUESTION_TYPE.MULTIPLE_CHOICE, checkedList = [], listQuestions }) {
  const [ref, hovered] = useHover();
  const { open, handleClickOpen, handleClose } = useToggleModal();

  return (
    <>
      <div className="flex justify-end gap-4 mt-5">
        {type !== QUESTION_TYPE.MULTIPLE_CHOICE && (
          <ReactionListInSlideUI type={type} checkedReactionList={checkedList} />
        )}
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
            {listQuestions?.filter(e => e.answered === false).length}
          </div>
        </div>
        <div className="p-2 bg-gray-200 rounded-full relative">
          <AccountCircleIcon className="text-gray-600" />
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-1 bg-blue-600 rounded-md text-white text-sm">
            0
          </div>
        </div>
      </div>
      {open && <ModalQuestions handleClose={handleClose} listQuestions={listQuestions} />}
    </>
  );
}
FooterSlide.propTypes = {
  type: PropTypes.number,
  checkedList: PropTypes.array,
  listQuestions: PropTypes.array,
};

function ModalQuestions({ handleClose, listQuestions }) {
  if (typeof document === "undefined") return null;
  const socket = useContext(SocketContext);
  const [upvoteRef, upvoteHovered] = useHover();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listAnsweredQuestions, setListAnsweredQuestions] = useState([]);
  const [listUnansweredQuestions, setlistUnansweredQuestions] = useState([]);
  const [listSortByAnswered, setListSortByAnswered] = useState([]);
  const [showSideBar, setShowSideBar] = useState(true);
  const [showUnansweredSideBar, setShowUnansweredSideBar] = useState(true);
  const handleShowUnansweredSideBar = () => {
    setShowUnansweredSideBar(true);
  };
  const handleShowAnsweredSideBar = () => {
    setShowUnansweredSideBar(false);
  };
  const handleClickShowSideBarQA = () => {
    setShowSideBar(!showSideBar);
  };
  const handleOnClickQATitle = item => {
    const index = listSortByAnswered.findIndex(e => e.question_id === item.question_id);
    setCurrentIndex(index);
  };
  const hanldeOnClickCheckAnswered = item => {
    socket.emit("toggleUserQuestionAnswered", item.question_id);
    // const newItem = listQuestions[currentIndex];
    // newItem.answered = true;
    // setListAnsweredQuestions([...listAnsweredQuestions, newItem]);
    socket.emit("listUserQuestion");
  };
  const handleOnClickUncheckAnswered = item => {
    socket.emit("toggleUserQuestionAnswered", item.question_id);
    // setListAnsweredQuestions(
    //   listAnsweredQuestions.filter(e => e.question_id !== listQuestions[currentIndex].question_id)
    // );
    socket.emit("listUserQuestion");
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
  const logMarkAnswered = msg => {};
  useEffect(() => {
    socket.on("toggleUserQuestionAnswered", logMarkAnswered);
    return () => {
      socket.off("markQuestionAsAnswered", logMarkAnswered);
    };
  }, [socket]);
  useEffect(() => {
    const answereds = listQuestions.filter(e => e.answered === true);
    const unAnswereds = listQuestions.filter(e => e.answered === false);
    const listSorted = unAnswereds.concat(answereds);
    setListSortByAnswered([...listSorted]);
    setListAnsweredQuestions([...answereds]);
    setlistUnansweredQuestions([...unAnswereds]);
  }, [listQuestions]);

  return (
    <div className="absolute w-full left-0  top-0 bottom-0  flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-10">
      <div className="relative bg-white flex rounded-lg w-[60%] h-[70%] ">
        <div
          className="p-2 rounded-full absolute top-4 right-4 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </div>
        <div
          className={`absolute top-5 ${
            showSideBar ? "left-[270px]" : "left-5"
          } text-sm bg-gray-300 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200`}
          onClick={handleClickShowSideBarQA}
        >
          {showSideBar ? "Close" : "See all quesitons"}
        </div>
        {showSideBar && (
          <div className="w-[350px] flex flex-col overflow-y-scroll rounded-tl-md rounded-bl-md border border-gray-300 justify-between">
            {showUnansweredSideBar ? (
              listUnansweredQuestions.length > 0 ? (
                <div>
                  {listUnansweredQuestions.map((e, index) => (
                    <div
                      className={`flex justify-between items-center p-2 ${
                        index !== listAnsweredQuestions.length - 1 ? "border-b border-gray-200" : ""
                      }`}
                    >
                      <div className="flex flex-col max-w-[160px]">
                        <h2
                          className={` ${
                            listSortByAnswered[currentIndex] === e ? "text-blue-500" : ""
                          } font-bold text-[14px] text-ellipsis title-slide-menu w-full`}
                          onClick={() => {
                            handleOnClickQATitle(e);
                          }}
                        >
                          {e.content}
                        </h2>
                        <h2
                          className="text-[10px] cursor-pointer hover:text-gray-500"
                          onClick={() => {
                            hanldeOnClickCheckAnswered(e);
                          }}
                        >
                          <CheckIcon className="text-[10px]" /> Mark as answered
                        </h2>
                      </div>
                      <div className="text-[14px] !w-[40px]">
                        <ThumbUpOffAltIcon className="text-[14px] mr-1" />
                        {e.votes}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center px-2">
                  <h2 className="font-bold mt-5">No questions from the audience</h2>
                  <h2>You are doing awsome!</h2>
                </div>
              )
            ) : listUnansweredQuestions.length > 0 ? (
              <div>
                {listAnsweredQuestions.map((e, index) => (
                  <div
                    className={`flex justify-between items-center p-2 ${
                      index !== listAnsweredQuestions.length - 1 ? "border-b border-gray-200" : ""
                    }`}
                  >
                    <div className="flex flex-col max-w-[160px]">
                      <h2
                        className={`${
                          listSortByAnswered[currentIndex] === e ? "text-blue-500" : ""
                        } font-bold text-[14px] text-ellipsi title-slide-menu w-full`}
                        onClick={() => {
                          handleOnClickQATitle(e);
                        }}
                      >
                        {e.content}
                      </h2>
                      <h2
                        className="text-[10px] cursor-pointer hover:text-gray-500"
                        onClick={() => {
                          handleOnClickUncheckAnswered(e);
                        }}
                      >
                        Restore question
                      </h2>
                    </div>
                    <div className="text-[14px] !w-[40px]">
                      <ThumbUpOffAltIcon className="text-[14px] mr-1" />
                      {e.votes}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center px-2">
                <h2 className="font-bold mt-5">No questions from the audience</h2>
                <h2>When you mark questions as answered, you can still see them here.</h2>
              </div>
            )}
            <div className="p-2 border-t border-gray-300 flex text-[10px] sticky bottom-0 bg-white">
              <div
                className={` ${
                  showUnansweredSideBar === true ? "font-bold" : ""
                } grow text-center flex flex-col justify-center cursor-pointer hover:text-gray-500`}
                onClick={handleShowUnansweredSideBar}
              >
                <h2 className="">({listUnansweredQuestions.length})</h2>
                <h2>Questions</h2>
              </div>
              <div
                className={` ${
                  showUnansweredSideBar === false ? "font-bold" : ""
                } grow text-center flex flex-col justify-center cursor-pointer hover:text-gray-500`}
                onClick={handleShowAnsweredSideBar}
              >
                <h2>({listAnsweredQuestions.length})</h2>
                <h2>Answered</h2>
              </div>
            </div>
          </div>
        )}
        {listSortByAnswered?.length > 0 ? (
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
              {currentIndex + 1}/{listSortByAnswered.length}
            </div>
            <div className="text-2xl mt-2">
              <span className="font-bold">Asked on </span>Mutiple choice
            </div>
            <div
              className={`${
                listSortByAnswered[currentIndex]?.content.length < 50 ? "text-4xl" : "text-2xl"
              } font-bold mt-6 text-center`}
            >
              {listSortByAnswered[currentIndex].content}
            </div>
            <div className="text-xl mt-6">
              {listSortByAnswered[currentIndex]?.votes}
              <span ref={upvoteRef} className="ml-2 cursor-pointer">
                {upvoteHovered ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
              </span>
            </div>
            <div
              className={`rounded-full p-2 border border-gray-300 mt-10 cursor-pointer hover:bg-gray-100 ${
                currentIndex === listSortByAnswered.length - 1 ? "invisible" : ""
              }`}
              onClick={handleOnClickNext}
            >
              <ExpandMoreIcon />
            </div>
            {listAnsweredQuestions?.find(e => e.question_id === listSortByAnswered[currentIndex].question_id) !=
            null ? (
              <div
                className="px-4 py-2 flex gap-2 text-white bg-blue-500 rounded-full mt-4 cursor-pointe cursor-pointer"
                onClick={() => {
                  handleOnClickUncheckAnswered(listSortByAnswered[currentIndex]);
                }}
              >
                <div className="rounded-full bg-white">
                  <CheckIcon color="primary" />
                </div>
                Answered
              </div>
            ) : (
              <div
                className="px-4 py-2 rounded-full border border-gray-300 mt-4 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  hanldeOnClickCheckAnswered(listSortByAnswered[currentIndex]);
                }}
              >
                Mark as answered
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl">No questions from the audience!</h2>
            <h3 className="text-xl text-center">
              Incoming questions will show up here so that you can answer them one by one.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
ModalQuestions.propTypes = {
  handleClose: PropTypes.func,
  listQuestions: PropTypes.array,
};

export default FooterSlide;
