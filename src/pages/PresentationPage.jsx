/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import React, { useState, useEffect, useContext } from "react";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import FeedIcon from "@mui/icons-material/Feed";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useNavigate, useParams } from "react-router";
import PropTypes from "prop-types";
import ButtonMain from "../components/button/ButtonMain";
import LayoutPresentation from "../components/layout/LayoutPresentation";
import SlideListMenu from "../modules/presentation/SlideListMenu";
import MenuPresentation from "../modules/presentation/MenuPresentation";
import SlideUI from "../modules/presentation/SlideUI";
import { SlideProvider } from "../contexts/slideContext";
import {
  createQuestion,
  getAllQuestionByIdSlide,
  getAnswerById,
  getSlideById,
  getQuestionById,
  getCollaboratorsByIdSlide,
} from "../handleApi";
import { getCurrentUser } from "../utils/constants";
import { SocketContext } from "../contexts/socketContext";
import ErrorPage from "./ErrorPage";

const checkIsOwnerOrCollab = async (userId, slideId, accessToken) => {
  const listCollab = await getCollaboratorsByIdSlide(slideId, accessToken);
  const collabId = listCollab.map(e => e.user_id);
  const slide = await getSlideById(slideId, accessToken);
  const listOwnerAndCollabId = [...collabId, slide.owner];
  return listOwnerAndCollabId.includes(userId);
  // return listCollab.map(e => e.user_id);
};

function PresentationPage() {
  // ****** */
  const socket = useContext(SocketContext);

  const [statistic, setStatistic] = useState();
  // ****** */
  const [questionList, setQuestionList] = useState([]);
  const { idSlide, idQuestion } = useParams();
  const [isOwnerOrCollab, setIsOwnerOrCollab] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();
  const listTypeSLide = [
    {
      icon: <EqualizerIcon />,
      value: 1,
      label: "Multi choice",
    },
    {
      icon: <FeedIcon />,
      value: 2,
      label: "Heading",
    },
    {
      icon: <ArticleIcon />,
      value: 3,
      label: "Paragraph",
    },
    {
      icon: <ChatBubbleIcon />,
      value: 4,
      label: "Q&A",
    },
  ];

  useEffect(() => {
    getAllQuestionByIdSlide(idSlide).then(res => setQuestionList(res));
  }, []);

  useEffect(() => {
    if (!socket) return;
    if (user !== null)
      checkIsOwnerOrCollab(user.user.user_id, idSlide, user.access_token).then(res => setIsOwnerOrCollab(res));

    socket.emit("host", user?.user?.name, `${idSlide}`);
    const getQuestionList = async () => {
      const currentQuestion = await getQuestionById(idQuestion);

      socket.emit("showStatistic", currentQuestion.index);
      socket.emit("getRoomAcitve");
      socket.emit("setRoomState", currentQuestion.index);
    };
    getQuestionList();
    const logConnect = async msg => {
      socket.emit("host", user?.user?.name, `${idSlide}`);

      console.log("host connected");
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
  }, [socket, idSlide, idQuestion]);

  const handleCreateQuestion = async () => {
    const question = await createQuestion(idSlide, user?.access_token);
    setQuestionList([...questionList, question.data]);
    navigate(`/presentation/${idSlide}/${question?.data?.id}/edit`);
  };

  return isOwnerOrCollab === true ? (
    <LayoutPresentation socket={socket}>
      <div className="h-[56px] flex items-center border-b px-4 border-gray-200 ">
        <ButtonMain
          bgColor="bg-blue-600"
          textColor="text-white"
          hoverColor="bg-blue-700"
          onClick={handleCreateQuestion}
        >
          <AddIcon className="w-5" />
          <span className="text-lg font-thin"> New slide</span>
        </ButtonMain>
      </div>
      <div className="flex w-full justify-between bg-gray-200">
        <SlideProvider>
          <SlideListMenu data={questionList} setList={setQuestionList} />
          <SlideUI statistic={statistic} idQuestion={idQuestion} />
          <MenuPresentation listItem={listTypeSLide} />
        </SlideProvider>
      </div>
    </LayoutPresentation>
  ) : (
    <ErrorPage />
  );
}

export default PresentationPage;
