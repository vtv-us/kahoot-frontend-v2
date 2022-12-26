/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { toast } from "react-toastify";
import DropdownMain from "../../modules/presentation/DropdownMain";
import ButtonMain from "../button/ButtonMain";
import TextAreaAutoResize from "../textarea/TextAreaAutoResize";

const SORT_BY_RECENT = 0;
function ModalQAUser({ handleClose, socket, userName }) {
  const [selectedSortOption, setSelectedSortOption] = useState(0);
  const [askNewQuestion, setAskNewQuestion] = useState(false);
  const [questionDescription, setQuestionDescription] = useState("");
  const [listUnansweredQuestion, setListUnansweredQuestion] = useState([]);
  const handleOnSelectSortOption = sortOption => {
    setSelectedSortOption(sortOption);
  };
  const sortByTopVote = (a, b) => {
    if (a.votes > b.votes) return -1;
    if (a.votes < b.votes) return 1;
    return 0;
  };
  const sortByRecent = (a, b) => {
    if (Date.parse(a.created_at) > Date.parse(b.created_at)) return -1;
    if (Date.parse(a.created_at) < Date.parse(b.created_at)) return 1;
    return 0;
  };
  const sortQA = newList => {
    if (selectedSortOption === SORT_BY_RECENT) {
      newList.sort(sortByRecent);
    } else {
      newList.sort(sortByTopVote);
    }
    setListUnansweredQuestion([...newList]);
  };
  const handleOnClickAskNewQuestion = () => {
    setAskNewQuestion(true);
  };
  const handleOnClickBack = () => {
    setAskNewQuestion(false);
  };
  const handleOnSubmitQuestion = () => {
    socket.emit("postQuestion", questionDescription);
    socket.emit("listUserQuestion");
    toast.success("Submit question successfully");
    setAskNewQuestion(false);
    setQuestionDescription("");
  };
  const handleOnUpvoteQuestion = questionId => {
    socket.emit("upvoteQuestion", questionId);
  };
  const logMarkAnswered = msg => {
    socket.emit("listUserQuestion");
  };
  const logUpvoteQuestion = msg => {
    socket.emit("listUserQuestion");
    // console.log("Mark answered", msg);
  };
  const logListUserQA = msg => {
    const newList = msg.filter(e => e.answered === false);

    sortQA(newList);
    // setListUnansweredQuestion(newList);
  };
  const logPostQA = msg => {
    socket.emit("listUserQuestion");
  };
  const listItem = [
    {
      value: 0,
      label: "Recent",
    },
    {
      value: 1,
      label: "Top questions",
    },
  ];
  useEffect(() => {
    // const listUnanswred = qaQuestions.filter(e => e.answered === false);
    // sortQA(listUnanswred);
    // setListUnansweredQuestion(qaQuestions.filter(e => e.answered === false));
    socket.on("toggleUserQuestionAnswered", logMarkAnswered);
    socket.on("upvoteQuestion", logUpvoteQuestion);
    socket.on("listUserQuestion", logListUserQA);
    socket.on("postQuestion", logPostQA);
    return () => {
      socket.off("toggleUserQuestionAnswered", logMarkAnswered);
      socket.off("upvoteQuestion", logUpvoteQuestion);
      socket.off("listUserQuestion", logListUserQA);
      socket.off("postQuestion", logPostQA);
    };
  }, [socket, selectedSortOption]);
  useEffect(() => {
    sortQA(listUnansweredQuestion);
  }, [selectedSortOption]);
  return (
    <div className="absolute w-full left-0  top-0 bottom-0  flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-10">
      <div className="relative bg-white rounded-lg w-[40%]">
        {!askNewQuestion ? (
          <div className="px-4 py-8 flex flex-col gap-4">
            <div
              className="p-2 rounded-full absolute top-4 right-4 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </div>
            <h1 className="ml-4 font-bold">Questions from audience</h1>
            <DropdownMain
              listItem={listItem}
              selectedValue={selectedSortOption}
              handleOnSelect={handleOnSelectSortOption}
            />
            <div className={`h-[200px] ${listUnansweredQuestion.length > 3 ? "overflow-y-scroll" : ""}`}>
              {listUnansweredQuestion.map(e => (
                <div key={e.question_id}>
                  <div className="mx-4 my-4 flex justify-between">
                    <div className="flex flex-col">
                      <h2>{e.content}</h2>
                      {userName === e.username && (
                        <div className="py-[2px] px-1 bg-blue-600 text-[10px] text-white rounded-lg w-fit">
                          Your question
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div
                        className="p-2 bg-gray-200 cursor-pointer hover:bg-gray-100 rounded-full "
                        onClick={() => {
                          handleOnUpvoteQuestion(e.question_id);
                        }}
                      >
                        <ThumbUpIcon />
                      </div>
                      <h2>{e.votes}</h2>
                    </div>
                  </div>
                  <div className="h-[1px] bg-gray-300 w-full" />
                </div>
              ))}
            </div>
            <ButtonMain onClick={handleOnClickAskNewQuestion}>
              <ChatBubbleOutlineIcon className="mr-2" /> Ask new question
            </ButtonMain>
          </div>
        ) : (
          <div className="px-4 py-4 flex flex-col ">
            <div className="flex justify-between">
              <h2 className="text-blue-500 font-bold cursor-pointer hover:text-blue-600" onClick={handleOnClickBack}>
                <ArrowBackIcon /> Back{" "}
              </h2>
              <div
                className="p-2 rounded-full absolute top-4 right-4 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon />
              </div>
            </div>
            <h2 className="mt-10 font-bold">Write your question here ...</h2>
            <div>
              <TextAreaAutoResize className="w-full" text={questionDescription} setText={setQuestionDescription} />
            </div>
            <ButtonMain onClick={handleOnSubmitQuestion} className="mt-4">
              {" "}
              Submit{" "}
            </ButtonMain>
          </div>
        )}
      </div>
    </div>
  );
}
ModalQAUser.propTypes = {
  // qaQuestions: PropTypes.array,
  handleClose: PropTypes.func,
  socket: PropTypes.any,
  userName: PropTypes.string,
};
export default ModalQAUser;
