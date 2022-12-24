/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-typos */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Radio, RadioGroup } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import uuid from "react-uuid";
import ButtonMain from "../components/button/ButtonMain";
import RadioItem from "../components/radio/RadioItem";
import { SocketContext } from "../contexts/socketContext";
import { getAllAnswersByIdQuestion, getAllQuestionByIdSlide, getAnswerById, getQuestionById } from "../handleApi";
import HeaderSlide from "../modules/presentation/HeaderSlide";
import FooterSlide from "../modules/presentation/FooterSlide";
import BarChartPre from "../components/chart/BarChartPre";
import ListReactIcon from "../components/icon/ListReactIcon";
import IconReactQuestion from "../components/icon/IconReactQuestion";
import ChatBox from "../components/chat/ChatBox";
import RadioInputSkeletion from "../components/skeleton/RadioInputSkeletion";
import { getCurrentUser } from "../utils/constants";
import MessageNotify from "../components/chat/MessageNotify";
import DropdownMain from "../modules/presentation/DropdownMain";
import useToggleModal from "../hooks/useToggleModal";
import QAButton from "../components/button/QAButton";
import ListReactSlideMember from "../modules/presentation/ListReactSlideMember";
import useChat from "../hooks/useChat";
import Chat from "../components/chat/Chat";
import TextAreaAutoResize from "../components/textarea/TextAreaAutoResize";

const getData = async id => {
  const data = await getAllQuestionByIdSlide(id);
  return data;
};

// const listQAQuestion = [
//   {
//     description: "Hello my is Lionel Messvan",
//     vote: 1,
//   },
//   {
//     description: "Messi vô địchhhhhhhhhhhhhhhhh",
//     vote: 56,
//   },
//   {
//     description: "Messi vô địchhhhhhhhhhhhhhhhh",
//     vote: 56,
//   },
//   {
//     description: "Messi vô địchhhhhhhhhhhhhhhhh",
//     vote: 56,
//   },
// ];

function SlideShowMemberPage() {
  const socket = useContext(SocketContext);
  const { idSlide } = useParams();
  const [idQuestion, setIdQuestion] = useState("");
  const [value, setValue] = useState("");
  const [question, setQuesion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qaQuestions, setQAQuestions] = useState([]);
  const [statistic, setStatistic] = useState();
  const [answers, setAnswers] = useState([]);
  const [username, setUsername] = useState("");
  const user = getCurrentUser();
  const [isFetching, setIsFetching] = useState(true);
  const [reactCheck, setReactCheck] = useState(0);
  // const [isAnswered, setIsAnswered] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const { open, handleClickOpen, handleClose } = useToggleModal();
  const {
    newMessage,
    setNewMessage,
    countMessages,
    setCountMessages,
    showMessage,
    setShowMessage,
    showNewMessage,
    setShowNewMessage,
    handleNewMessage,
  } = useChat(username);

  const isMultiple = true;

  const getIndexInQuestionList = questionList => {
    for (let i = 0; i < questionList.length; i++) {
      if (idQuestion === questionList[i].id) {
        return questionList[i].index;
      }
    }
    return 1;
  };
  const logStatistic = msg => {
    setStatistic(msg);
  };
  const logRoomState = msg => {
    getAllQuestionByIdSlide(idSlide).then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].index === msg) {
          // console.log("idQuestion in getRoomState", data[i].id);
          setIdQuestion(data[i].id);
        }
      }
      setQuestions(data);
    });
  };
  const logListQA = msg => {
    setQAQuestions(msg);
  };
  const logRoomActive = msg => {};
  const logError = err => {
    console.log("received socket error:");
    console.log(err);
  };

  const getQuestionList = async () => {
    let currentIndex = 0;
    const questionList = await getData(idSlide);
    currentIndex = getIndexInQuestionList(questionList);
  };

  useEffect(() => setUsername(uuid()), [idSlide]);
  useEffect(() => {
    // setIsAnswered(false);
    socket.on("connect", msg => {
      const name = user?.user?.name || uuid();
      setUsername(name);
      socket.emit("join", name, `${idSlide}`);
      getQuestionList();
      socket.emit("getRoomState");
      socket.emit("listUserQuestion");
      console.log("member connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
    socket.on("error", logError);
    socket.on("getRoomActive", logRoomActive);
    socket.on("showStatistic", logStatistic);
    socket.on("getRoomState", logRoomState);
    socket.on("chat", handleNewMessage);
    socket.on("listUserQuestion", logListQA);
    socket.on("reply", function (msg) {
      console.log("reply", msg);
    });
    if (idQuestion) {
      getQuestionById(idQuestion).then(res => {
        setQuesion(res);
      });
      getAllAnswersByIdQuestion(idQuestion).then(res => {
        setIsFetching(false);
        setAnswers(res);
      });
    }
    return () => {
      socket.off("showStatistic", logStatistic);
      socket.off("getRoomActive");
      socket.off("chat", handleNewMessage);
    };
  }, [socket, idQuestion, showMessage, countMessages]);

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      toast.error("Please enter your option");
      return;
    }
    socket.emit("submitAnswer", Number(question.index), Number(value));
    const newList = [...answeredQuestions, question.index];
    setAnsweredQuestions(newList);
    // setIsAnswered(true);
  };

  const handleReaction = () => {
    console.log("Reaction", reactCheck);
    // todo
  };
  useEffect(() => {
    handleReaction();
  }, [reactCheck]);
  const data = {
    socket,
    newMessage,
    setNewMessage,
    countMessages,
    setCountMessages,
    showMessage,
    setShowMessage,
    showNewMessage,
    setShowNewMessage,
    username,
  };
  return (
    <div className="mx-auto  flex flex-col items-center max-w-[600px] m-10 p-2">
      {answeredQuestions.includes(question?.index) === false ? (
        <>
          <div className="max-w-[200px] mb-10">
            <img src="/logo.svg" className="w-full" alt="logo" />
          </div>
          <div className="flex flex-col items-start w-full gap-2">
            <p className="text-gray-400">{question?.meta}</p>
            <h2 className="text-3xl font-bold">{question?.raw_question}</h2>
            <p className="text-md text-gray-400">{question?.long_description}</p>
          </div>
          {!isFetching ? (
            <>
              {isMultiple ? (
                <div className="w-full mt-4">
                  <RadioGroup
                    className="flex flex-col gap-4"
                    name="answer"
                    onChange={handleChange}
                    value={value}
                    defaultValue="first"
                  >
                    {answers?.map(item => (
                      <RadioItem
                        key={item.id}
                        value={`${item.index}`}
                        label={`${item.raw_answer}`}
                        control={<Radio />}
                      />
                    ))}
                  </RadioGroup>
                  <ButtonMain
                    className="w-full mt-4 text-lg py-3"
                    bgColor="bg-blue-500 hover:!bg-blue-600"
                    textColor="text-white-800"
                    onClick={handleSubmit}
                  >
                    Submit
                  </ButtonMain>
                </div>
              ) : (
                <ListReactSlideMember checked={reactCheck} setChecked={setReactCheck} />
              )}
              <QAButton handleClickOpen={handleClickOpen} />
            </>
          ) : (
            <div>
              <RadioInputSkeletion />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[200px] cursor-pointer">
            <img src="/logo.svg" alt="" />
          </div>
          <h2 className="text-3xl font-bold mt-10">Thank you for your participation!</h2>
          <h2 className="text-2xl mt-4">
            Your answer is: <span className="font-bold">{answers[Number(value - 1)].raw_answer}</span>
          </h2>
          <div className="m-auto bg-white flex">
            <div className="">
              <SlideUI statistic={statistic} question={question} />
            </div>
          </div>
          <QAButton handleClickOpen={handleClickOpen} />
        </div>
      )}
      <div
        className="absolute bottom-20 right-10"
        onClick={() => {
          socket.emit("getChatHistory");
          setCountMessages(0);
          setShowMessage(!showMessage);
          setShowNewMessage(false);
        }}
      >
        <div className="relative">
          <IconReactQuestion className="border boder-gray-100">
            <MessageIcon fontSize="large" />
          </IconReactQuestion>
          {countMessages > 0 && !showMessage && (
            <span className="absolute rounded-full text-sm text-white bg-red-500 py-1 px-2 -top-2 right-0 font-bold">
              {countMessages}
            </span>
          )}
        </div>
      </div>
      {showNewMessage && (
        <MessageNotify
          message={newMessage}
          onClose={() => {
            setShowNewMessage(false);
          }}
        />
      )}
      {open && <ModalQAUser qaQuestions={qaQuestions} handleClose={handleClose} socket={socket} userName={username} />}
      {showMessage && <ChatBox socket={socket} username={username} setShowMessage={setShowMessage} />}
      <Chat data={data} />
    </div>
  );
}
ListReactIcon.propTypes = {
  handleClick: PropTypes.func,
};

function ModalQAUser({ qaQuestions, handleClose, socket, userName }) {
  const [selectedSortOption, setSelectedSortOption] = useState(0);
  const handleOnSelectSortOption = sortOption => {
    setSelectedSortOption(sortOption);
  };
  const [askNewQuestion, setAskNewQuestion] = useState(false);
  const [questionDescription, setQuestionDescription] = useState("");
  const [listUnansweredQuestion, setListUnansweredQuestion] = useState([]);
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
  };
  const handleOnUpvoteQuestion = questionId => {
    socket.emit("upvoteQuestion", questionId);
  };
  const logMarkAnswered = msg => {
    socket.emit("listUserQuestion");
  };
  const logUpvoteQuestion = msg => {
    console.log("upvote");
    socket.emit("listUserQuestion");
    // console.log("Mark answered", msg);
  };
  const logListUserQA = msg => {
    const newList = msg.filter(e => e.answered === false);
    setListUnansweredQuestion(newList);
  };
  const logPostQA = msg => {
    console.log("posted");
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
    setListUnansweredQuestion(qaQuestions.filter(e => e.answered === false));
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
  }, []);
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
  qaQuestions: PropTypes.array,
  handleClose: PropTypes.func,
  socket: PropTypes.any,
  userName: PropTypes.string,
};

function SlideUI({ statistic, question }) {
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAnswersByIdQuestion(question.id);
      const newDataChart = res?.map(item => {
        return { name: item.raw_answer, quantity: (statistic && statistic[item.index]) || 0 };
      });

      setDataChart(newDataChart);
    };
    fetchData();
  }, [question, statistic]);
  return (
    <div className=" bg-white flex-1 flex-flex-col relative max-h-[748px] overflow-auto">
      <HeaderSlide meta={question?.meta} question={question?.raw_question} />
      {dataChart.length > 0 ? <BarChartPre data={dataChart} /> : <NoneBarChart />}
      {/* <FooterSlide /> */}
    </div>
  );
}
SlideUI.propTypes = {
  statistic: PropTypes.any,
  question: PropTypes.any,
};

function NoneBarChart() {
  return (
    <div className="h-[395px] flex items-center justify-center flex-col">
      <img src="/barchartV2.png" className="w-[200px]" alt="" />
      <div className="text-gray-500 font-bold text-xl">Please add options</div>
    </div>
  );
}
SlideShowMemberPage.propTypes = {};

export default SlideShowMemberPage;
