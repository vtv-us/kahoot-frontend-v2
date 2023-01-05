/* eslint-disable prefer-template */
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
import { toast } from "react-toastify";
import MessageIcon from "@mui/icons-material/Message";
import React, { useState, useEffect, useContext } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router";
import HeaderSlide from "../modules/presentation/HeaderSlide";
import BarChartPre from "../components/chart/BarChartPre";
import FooterSlide from "../modules/presentation/FooterSlide";
import {
  getAllAnswersByIdQuestion,
  getAlllides,
  getAllQuestionByIdSlide,
  getCollaboratorsSlide,
  getGroupsCreatedByUser,
  getGroupsUserHasJoined,
  getQuestionById,
  getSlideById,
} from "../handleApi";
import { getCurrentUser, QUESTION_TYPE } from "../utils/constants";
import { SocketContext } from "../contexts/socketContext";
import ChatBox from "../components/chat/ChatBox";
import MessageNotify from "../components/chat/MessageNotify";
import IconReactQuestion from "../components/icon/IconReactQuestion";
import useChat from "../hooks/useChat";
import Chat from "../components/chat/Chat";
import NoneBarChart from "../components/chart/NonBarChart";
import ErrorPage from "./ErrorPage";
import { NotiSocketContext } from "../contexts/notiSocketContext";
import { getGroupsMembers } from "../redux/apiRequest";

const getData = async id => {
  const data = await getAllQuestionByIdSlide(id);
  return data;
};
export const isOwnerOrCoowerOfGroup = async (userId, idGroup, accessToken) => {
  const members = await getGroupsMembers(accessToken, idGroup);
  for (let i = 0; i < members.length; i++) {
    if (members[i].user_id === userId && members[i].role !== "member") return true;
  }
  return false;
};

const checkIsOwnerOrCollabOfSlide = async (userId, idGroup, idSlide, accessToken) => {
  if (userId === undefined) return false;
  const checkIsOwnerOrCoownerOfGroup = await isOwnerOrCoowerOfGroup(userId, idGroup, accessToken);
  const listOwnedSlide = await getAlllides(accessToken);
  const listCollabSlide = await getCollaboratorsSlide(userId, accessToken);
  if (listOwnedSlide === null || listCollabSlide === null) return false;
  const listOwnedSlideId = listOwnedSlide.data.map(e => e.id);
  const listCollabSlideId = listCollabSlide.map(e => e.id);
  if (checkIsOwnerOrCoownerOfGroup || listOwnedSlideId.includes(idSlide) || listCollabSlideId.includes(idSlide))
    return true;
  return false;
};

// const socket = io.connect(process.env.REACT_APP_BE_ADDRESS);
function SlideShowHostPage() {
  const user = getCurrentUser();
  if (user === null) return <ErrorPage />;
  const socket = useContext(SocketContext);
  const notiSocket = useContext(NotiSocketContext);
  const { idGroup, idSlide, idQuestion } = useParams();
  const [statistic, setStatistic] = useState();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isOwnerOrCollab, setIsOwnerOrCollab] = useState(false);
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
  } = useChat(user?.user?.name);
  const [listQAQuestion, setListQAQuestion] = useState([]);
  const handleOnClickNext = () => {
    // socket.emit("showStatistic", currentQuestion + 1);
    setCurrentQuestion(currentQuestion + 1);
    socket.emit("next");
    socket.emit("getRoomState");
    // questions.forEach((item, index) => {
    //   if (currentQuestion === index) {
    //     //index cua question lon hon index 1 so
    //     socket.emit("showStatistic", item.id);
    //     if (!idGroup) navigate(`/presentation/${idSlide}/${item.id}`);
    //     else navigate(`/presentation/${idGroup}/${idSlide}/${item.id}`);
    //   }
    // });
  };
  const handleOnClickPre = () => {
    // socket.emit("showStatistic", currentQuestion - 1);
    setCurrentQuestion(currentQuestion - 1);
    socket.emit("prev");
    socket.emit("getRoomState");
    // questions.forEach((item, index) => {
    //   if (currentQuestion - 1 === index + 1) {
    //     socket.emit("showStatistic", item.id);
    //     if (!idGroup) navigate(`/presentation/${idSlide}/${item.id}`);
    //     else navigate(`/presentation/${idGroup}/${idSlide}/${item.id}`);
    //   }
    // });
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
    checkIsOwnerOrCollabOfSlide(user?.user?.user_id, idGroup, idSlide, user?.access_token).then(res =>
      setIsOwnerOrCollab(res)
    );

    // if (idGroup === undefined) {
    //   socket.emit("host", user?.user?.name, `${idSlide}`);
    // } else {
    //   socket.emit("host", user?.user?.user_id, idSlide, true, idGroup, user.access_token);
    // }
    // notiSocket.emit("join", user?.access_token);
    socket.emit("listUserQuestion");
    socket.emit("chatHistory");
    const getQuestionList = async () => {
      let currentIndex = 0;
      const questionList = await getData(idSlide);
      currentIndex = getIndexInQuestionList(questionList);
      socket.emit("showStatistic", idQuestion);
      socket.emit("getRoomActive");
      socket.emit("setRoomState", currentIndex);
    };
    getQuestionList();
    // const currentIndex = getQuestionList();
    // console.log("currentIndex: ", currentIndex);
    const logConnect = async msg => {
      // const questionList = await getData(idSlide, user?.access_token);
      // const currentIndex = getIndexInQuestionList(questionList);
      if (idGroup === undefined) {
        socket.emit("host", user?.user?.name, `${idSlide}`);
      } else {
        // const isHost = await isOwnerOrCoowerOfGroup(user?.user, idGroup, user?.access_token);
        // if (!isHost) socket.emit("host", user?.user?.name, idSlide, true, idGroup, user.access_token);
        // else {
        //   socket.emit("join", user?.user?.name, `${idSlide}`, user?.access_token);
        // }
        socket.emit("host", user?.user?.name, idSlide, true, idGroup, user.access_token);
        socket.emit("getRoomState");
        // socket.emit("cancelPresentation");
      }
      // socket.emit("showStatistic", currentIndex);
      socket.emit("listUserQuestion");
      console.log("host connected");
      socket.emit("showStatistic", idQuestion);

      // setCurrentQuestion(currentIndex);
    };
    const logError = err => {
      console.log(err);
    };
    const logMsg = msg => {
      // console.log(msg);
    };
    const logCurrentRoom = async msg => {
      const questionList = await getData(idSlide);
      // console.log("question in loop", questionList);
      const url = window.location.href;
      if (!url.includes("/edit"))
        questionList.forEach((item, index) => {
          // console.log("compare", msg, item.index.msg === item.index);
          if (msg === item.index) {
            //index cua question lon hon index 1 so
            socket.emit("showStatistic", item.id);
            if (!idGroup) navigate(`/presentation/${idSlide}/${item.id}`);
            else navigate(`/presentation/${idGroup}/${idSlide}/${item.id}`);
          }
        });
    };
    const logStatistic = msg => {
      // console.log("statistic", msg);
      setStatistic(msg);
    };
    const logQA = msg => {
      socket.emit("listUserQuestion");
      // setListQAQuestion([...listQAQuestion, msg]);
    };
    const logListUserQA = msg => {
      setListQAQuestion([...msg]);
    };
    const logUpvoteQuestion = msg => {
      socket.emit("listUserQuestion");
    };

    socket.on("connect", logConnect);
    socket.on("error", logError);
    socket.on("getRoomActive", logMsg);
    socket.on("getActiveParticipants", logMsg);
    socket.on("showStatistic", logStatistic);
    socket.on("getRoomState", logCurrentRoom);
    socket.on("cancelPresentation", msg => {
      toast.info("End presentation because there is another presentation");
      navigate(`/`);
    });
    socket.on("resultList", function (msg) {
      // console.log("resultList", msg);
      setResultList([...msg]);
    });
    socket.on("chat", handleNewMessage);
    socket.on("listUserQuestion", logListUserQA);
    socket.on("postQuestion", logQA);
    socket.on("notify", logMsg);
    socket.on("upvoteQuestion", logUpvoteQuestion);
    return () => {
      socket.off("connect", logConnect);
      socket.off("error", logError);
      socket.off("getRoomActive", logMsg);
      socket.off("getActiveParticipants", logMsg);
      socket.off("showStatistic", logStatistic);
      socket.off("getRoomState", logMsg);
      socket.off("chat", handleNewMessage);
      socket.off("postQuestion", logQA);
      socket.off("notify", logMsg);
      socket.off("listUserQuestion", logListUserQA);
      socket.off("upvoteQuestion", logUpvoteQuestion);
    };
  }, [socket, idSlide, showMessage, countMessages]);
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
    username: user?.user?.name,
  };
  return user !== null && isOwnerOrCollab === true ? (
    <div className="bg-black w-full h-screen flex relative">
      <div
        className="my-auto ml-4 p-2 rounded-full cursor-pointer hover:bg-gray-700 items-center"
        onClick={currentQuestion - 1 > 0 ? handleOnClickPre : null}
      >
        <ArrowBackIosIcon sx={{ color: "white" }} />
      </div>
      <div className="m-auto w-[90%] h-[80%] bg-white flex">
        <div className="w-full h-full">
          <SlideUI
            statistic={statistic}
            idQuestion={idQuestion}
            listQAQuestion={listQAQuestion}
            resultList={resultList}
          />
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
      <Chat data={data} />
    </div>
  ) : (
    <ErrorPage />
  );
}

function SlideUI({ statistic, resultList, idQuestion, listQAQuestion }) {
  const [question, setQuestion] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAnswersByIdQuestion(idQuestion);
      const newDataChart = res?.map((item, index) => {
        return { name: item.raw_answer, quantity: (statistic && statistic[index])?.Count || 0 };
      });

      const resQuestion = await getQuestionById(idQuestion);
      setQuestion(resQuestion);

      setDataChart(newDataChart);
    };
    fetchData();
  }, [idQuestion, statistic]);
  const isMultiple = question.type === "multiple-choice";
  return (
    <div className="p-4 bg-white m-10 flex-1 flex-flex-col max-h-[748px] overflow-auto">
      <HeaderSlide
        meta={question?.meta}
        question={question?.raw_question}
        description={question.long_description}
        isMultiple={isMultiple}
      />
      {dataChart.length > 0 ? <BarChartPre data={dataChart} isMultiple={isMultiple} /> : isMultiple && <NoneBarChart />}
      {/* <FooterSlide type={QUESTION_TYPE.HEADING} checkedList={[1, 2, 3]} /> */}
      <FooterSlide listQuestions={listQAQuestion} resultList={resultList} />
    </div>
  );
}
SlideUI.propTypes = {
  statistic: PropTypes.any,
  idQuestion: PropTypes.string,
  listQAQuestion: PropTypes.array,
  resultList: PropTypes.array,
};

export default SlideShowHostPage;
