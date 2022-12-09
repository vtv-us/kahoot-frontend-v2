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
import { Navigate, useNavigate, useParams } from "react-router";
import * as io from "socket.io-client";
import HeaderSlide from "../modules/presentation/HeaderSlide";
import BarChartPre from "../components/chart/BarChartPre";
import FooterSlide from "../modules/presentation/FooterSlide";
import { getAllAnswersByIdQuestion, getAllQuestionByIdSlide, getQuestionById } from "../handleApi";
import { getCurrentUser } from "../utils/constants";
import { SocketContext } from "../contexts/socketContext";

const getData = async (id, accessToken) => {
  const data = await getAllQuestionByIdSlide(id, accessToken);
  return data;
};

// const socket = io.connect(process.env.REACT_APP_BE_ADDRESS);
function SlideShowHostPage({ slide = "Slide" }) {
  const socket = useContext(SocketContext);

  const { idSlide, idQuestion } = useParams();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const handleOnClickNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    questions.forEach((item, index) => {
      if (currentQuestion + 1 === index) {
        navigate(`/presentation/${idSlide}/${item.id}`);
      }
    });
  };
  const handleOnClickPre = () => {
    setCurrentQuestion(currentQuestion - 1);
    questions.forEach((item, index) => {
      if (currentQuestion - 1 === index) {
        navigate(`/presentation/${idSlide}/${item.id}`);
      }
    });
  };
  const handleOnBack = () => {
    navigate(`/presentation/${idSlide}/${idQuestion}/edit`);
  };

  useEffect(() => {
    questions?.forEach((item, index) => {
      if (item.id === idQuestion) {
        setCurrentQuestion(index);
      }
    });
  }, [idQuestion, questions]);
  useEffect(() => {
    getData(idSlide, user.access_token).then(res => {
      setQuestions(res);
    });
  }, [idSlide]);
  useEffect(() => {
    socket.emit("host", "tuxinhtrai", "haixinhgai");
    socket.on("connect", msg => {
      console.log("host connected");
    });
  }, []);
  return (
    <div className="bg-black w-full h-screen flex relative">
      <div
        className="my-auto ml-4 p-2 rounded-full cursor-pointer hover:bg-gray-700 items-center"
        onClick={currentQuestion > 0 ? handleOnClickPre : null}
      >
        <ArrowBackIosIcon sx={{ color: "white" }} />
      </div>
      <div className="m-auto w-[90%] h-[80%] bg-white flex">
        <div className="w-full h-full">
          <SlideUI />
        </div>
      </div>
      <div
        className="my-auto mr-4 p-2 rounded-full cursor-pointer hover:bg-gray-700 items-center"
        onClick={currentQuestion < questions.length - 1 ? handleOnClickNext : null}
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
          questions.map((e, index) => (
            <FiberManualRecordIcon sx={{ color: `${currentQuestion === index ? "white" : "gray"}` }} />
          ))}
      </div>
    </div>
  );
}
SlideShowHostPage.propTypes = {
  slide: PropTypes.any,
};

function SlideUI() {
  const { idQuestion } = useParams();
  const user = getCurrentUser();
  const [question, setQuestion] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAnswersByIdQuestion(idQuestion, user?.access_token);
      const newDataChart = res?.map(item => {
        return { name: item.raw_answer, quantity: 2 };
      });

      const resQuestion = await getQuestionById(idQuestion, user?.access_token);
      setQuestion(resQuestion);

      setDataChart(newDataChart);
    };
    fetchData();
  }, [idQuestion]);
  console.log("questions", question);
  return (
    <div className="p-4 bg-white m-10 flex-1 flex-flex-col relative max-h-[748px] overflow-auto">
      <HeaderSlide meta={question?.meta} question={question?.raw_question} />
      {dataChart.length > 0 ? <BarChartPre data={dataChart} /> : <NoneBarChart />}
      <FooterSlide />
    </div>
  );
}

function NoneBarChart() {
  return (
    <div className="h-[395px] flex items-center justify-center flex-col">
      <img src="/barchartV2.png" className="w-[200px]" alt="" />
      <div className="text-gray-500 font-bold text-xl">Please add options</div>
    </div>
  );
}
export default SlideShowHostPage;
