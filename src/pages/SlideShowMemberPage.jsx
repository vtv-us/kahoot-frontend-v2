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
import { Radio, RadioGroup } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import ButtonMain from "../components/button/ButtonMain";
import RadioItem from "../components/radio/RadioItem";
import { SocketContext } from "../contexts/socketContext";
import { getAllAnswersByIdQuestion, getAllQuestionByIdSlide, getQuestionById } from "../handleApi";
import HeaderSlide from "../modules/presentation/HeaderSlide";
import BarChartPre from "../components/chart/BarChartPre";
import ListReactIcon from "../components/icon/ListReactIcon";
import RadioInputSkeletion from "../components/skeleton/RadioInputSkeletion";
import { getCurrentUser } from "../utils/constants";
import useToggleModal from "../hooks/useToggleModal";
import QAButton from "../components/button/QAButton";
import ListReactSlideMember from "../modules/presentation/ListReactSlideMember";
import useChat from "../hooks/useChat";
import Chat from "../components/chat/Chat";
import ModalQAUser from "../modules/presentation/ModalQAUser";
import NoneBarChart from "../components/chart/NonBarChart";
import ErrorPage from "./ErrorPage";

const getData = async id => {
  const data = await getAllQuestionByIdSlide(id);
  return data;
};

function SlideShowMemberPage() {
  const socket = useContext(SocketContext);
  const { idSlide } = useParams();
  const [idQuestion, setIdQuestion] = useState("");
  const [value, setValue] = useState("");
  const [question, setQuesion] = useState(null);
  const [questions, setQuestions] = useState([]);
  // const [qaQuestions, setQAQuestions] = useState([]);
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

  const isMultiple = question?.type === "multiple-choice";
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
    // setQAQuestions(msg);
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
    console.log("value", value);
    socket.emit("submitAnswer", question.id, value);
    const newList = [...answeredQuestions, question.index];
    setAnsweredQuestions(newList);
    // setIsAnswered(true);
  };

  const handleReaction = () => {
    // console.log("Reaction", reactCheck);
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
                      <RadioItem key={item.id} value={`${item.id}`} label={`${item.raw_answer}`} control={<Radio />} />
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
              <QAButton
                handleClickOpen={() => {
                  socket.emit("listUserQuestion");
                  handleClickOpen();
                }}
              />
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
            {/* Your answer is: <span className="font-bold">{answers[Number(value - 1)].raw_answer}</span> */}
          </h2>
          <div className="m-auto bg-white flex">
            <div className="">
              <SlideUI statistic={statistic} question={question} />
            </div>
          </div>
          <QAButton handleClickOpen={handleClickOpen} />
        </div>
      )}

      {open && <ModalQAUser handleClose={handleClose} socket={socket} userName={username} />}

      <Chat data={data} />
    </div>
  );
}
ListReactIcon.propTypes = {
  handleClick: PropTypes.func,
};

function SlideUI({ statistic, question }) {
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAnswersByIdQuestion(question.id);
      const newDataChart = res?.map((item, index) => {
        return { name: item.raw_answer, quantity: (statistic && statistic[index])?.Count || 0 };
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

SlideShowMemberPage.propTypes = {};

export default SlideShowMemberPage;
