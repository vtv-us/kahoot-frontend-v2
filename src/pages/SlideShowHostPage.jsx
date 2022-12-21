/* eslint-disable spaced-comment */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import PropTypes from "prop-types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState, useEffect, useContext } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router";
import HeaderSlide from "../modules/presentation/HeaderSlide";
import BarChartPre from "../components/chart/BarChartPre";
import FooterSlide from "../modules/presentation/FooterSlide";
import { getAllAnswersByIdQuestion, getAllQuestionByIdSlide, getQuestionById } from "../handleApi";
import { getCurrentUser, QUESTION_TYPE } from "../utils/constants";
import { SocketContext } from "../contexts/socketContext";

const getData = async id => {
  const data = await getAllQuestionByIdSlide(id);
  return data;
};

// const socket = io.connect(process.env.REACT_APP_BE_ADDRESS);
function SlideShowHostPage() {
  const socket = useContext(SocketContext);
  const { idSlide, idQuestion } = useParams();
  const [statistic, setStatistic] = useState();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const handleOnClickNext = () => {
    socket.emit("showStatistic", currentQuestion + 1);
    setCurrentQuestion(currentQuestion + 1);
    socket.emit("next");
    questions.forEach((item, index) => {
      if (currentQuestion === index) {
        //index cua question lon hon index 1 so
        navigate(`/presentation/${idSlide}/${item.id}`);
      }
    });
  };
  const handleOnClickPre = () => {
    socket.emit("showStatistic", currentQuestion - 1);
    setCurrentQuestion(currentQuestion - 1);
    socket.emit("prev");
    questions.forEach((item, index) => {
      if (currentQuestion - 1 === index + 1) {
        navigate(`/presentation/${idSlide}/${item.id}`);
      }
    });
  };
  const handleOnBack = () => {
    socket.emit("manualDisconnect");
    navigate(`/presentation/${idSlide}/${idQuestion}/edit`);
  };
  const getIndexInQuestionList = questionList => {
    for (let i = 0; i < questionList.length; i++) {
      if (idQuestion === questionList[i].id) {
        return questionList[i].index;
      }
    }
    return 1;
  };

  useEffect(() => {
    questions?.forEach((item, index) => {
      if (item.id === idQuestion) {
        setCurrentQuestion(item.index);
      }
    });
    socket.emit("getRoomState");
  }, [idQuestion, questions]);
  useEffect(() => {
    getData(idSlide).then(res => {
      setQuestions(res);
    });
  }, [idSlide]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("host", user?.user?.name, `${idSlide}`);
    socket.emit("chatHistory");

    const getQuestionList = async () => {
      let currentIndex = 0;
      const questionList = await getData(idSlide);
      currentIndex = getIndexInQuestionList(questionList);
      socket.emit("showStatistic", currentIndex);
      socket.emit("getRoomAcitve");
      socket.emit("setRoomState", currentIndex);
    };
    getQuestionList();
    // const currentIndex = getQuestionList();
    // console.log("currentIndex: ", currentIndex);
    const logConnect = async msg => {
      // const questionList = await getData(idSlide, user?.access_token);
      // const currentIndex = getIndexInQuestionList(questionList);
      socket.emit("host", user?.user?.name, `${idSlide}`);

      // socket.emit("showStatistic", currentIndex);
      console.log("host connected");
      // setCurrentQuestion(currentIndex);
    };
    const logError = err => {
      console.log(err);
    };
    const logMsg = msg => {
      console.log(msg);
    };
    const logCurrentRoom = msg => {
      console.log("current question", msg);
    };
    const logStatistic = msg => {
      setStatistic(msg);
    };

    socket.on("connect", logConnect);
    socket.on("error", logError);
    socket.on("getRoomActive", logMsg);
    socket.on("getActiveParticipants", logMsg);
    socket.on("showStatistic", logStatistic);
    socket.on("getRoomState", logCurrentRoom);
    socket.on("notify", logMsg);
    return () => {
      socket.off("connect", logConnect);
      socket.off("error", logError);
      socket.off("getRoomActive", logMsg);
      socket.off("getActiveParticipants", logMsg);
      socket.off("showStatistic", logStatistic);
      socket.off("getRoomState", logMsg);
      socket.off("notify", logMsg);
    };
  }, [socket, idSlide]);

  return (
    <div className="bg-black w-full h-screen flex relative">
      <div
        className="my-auto ml-4 p-2 rounded-full cursor-pointer hover:bg-gray-700 items-center"
        onClick={currentQuestion - 1 > 0 ? handleOnClickPre : null}
      >
        <ArrowBackIosIcon sx={{ color: "white" }} />
      </div>
      <div className="m-auto w-[90%] h-[80%] bg-white flex">
        <div className="w-full h-full">
          <SlideUI statistic={statistic} idQuestion={idQuestion} />
        </div>
      </div>
      <div
        className="my-auto mr-4 p-2 rounded-full cursor-pointer hover:bg-gray-700 items-center"
        onClick={currentQuestion < questions.length ? handleOnClickNext : null}
      >
        <ArrowForwardIosIcon sx={{ color: "white" }} />
      </div>
      <div
        className="absolute top-4 left-4 p-2 rounded-full cursor-pointer hover:bg-gray-700 items-center"
        onClick={handleOnBack}
      >
        <ArrowBackIcon sx={{ color: "white" }} />
      </div>
      <div className="absolute text-center bottom-8 left-0 right-0 text-white">
        {questions?.length > 0 &&
          questions.map((element, index) => (
            <FiberManualRecordIcon
              key={element.id}
              sx={{ color: `${currentQuestion - 1 === index ? "white" : "gray"}` }}
            />
          ))}
      </div>
    </div>
  );
}

function SlideUI({ statistic, idQuestion }) {
  const [question, setQuestion] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAnswersByIdQuestion(idQuestion);
      const newDataChart = res?.map(item => {
        return { name: item.raw_answer, quantity: (statistic && statistic[item.index]) || 0 };
      });

      const resQuestion = await getQuestionById(idQuestion);
      setQuestion(resQuestion);

      setDataChart(newDataChart);
    };
    fetchData();
  }, [idQuestion, statistic]);
  const isMultiple = true;
  console.log("question", question);
  return (
    <div className="p-4 bg-white m-10 flex-1 flex-flex-col max-h-[748px] overflow-auto">
      <HeaderSlide
        meta={question?.meta}
        question={question?.raw_question}
        description={question.long_description}
        isMultiple={isMultiple}
      />
      {dataChart.length > 0 ? <BarChartPre data={dataChart} isMultiple={isMultiple} /> : <NoneBarChart />}
      {/* <FooterSlide type={QUESTION_TYPE.HEADING} checkedList={[1, 2, 3]} /> */}
      <FooterSlide />
    </div>
  );
}
SlideUI.propTypes = {
  statistic: PropTypes.any,
  idQuestion: PropTypes.string,
};

function NoneBarChart() {
  return (
    <div className="h-[395px] flex items-center justify-center flex-col">
      <img src="/barchartV2.png" className="w-[200px]" alt="" />
      <div className="text-gray-500 font-bold text-xl">Please add options</div>
    </div>
  );
}
export default SlideShowHostPage;
