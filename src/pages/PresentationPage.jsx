/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import React, { useState, useEffect, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router";
import ButtonMain from "../components/button/ButtonMain";
import LayoutPresentation from "../components/layout/LayoutPresentation";
import SlideListMenu from "../modules/presentation/SlideListMenu";
import MenuPresentation from "../modules/presentation/MenuPresentation";
import SlideUI from "../modules/presentation/SlideUI";
import { SlideProvider } from "../contexts/slideContext";
import { createQuestion, getAllQuestionByIdSlide, getAnswerById, getQuestionById } from "../handleApi";
import { getCurrentUser } from "../utils/constants";
import { SocketContext } from "../contexts/socketContext";

function PresentationPage() {
  // ****** */
  const socket = useContext(SocketContext);

  const [statistic, setStatistic] = useState();
  // ****** */

  const [questionList, setQuestionList] = useState({});
  const { idSlide, idQuestion } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  useEffect(() => {
    getAllQuestionByIdSlide(idSlide).then(res => setQuestionList(res));
  }, []);

  useEffect(() => {
    if (!socket) return;
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

  return (
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
          <MenuPresentation />
        </SlideProvider>
      </div>
    </LayoutPresentation>
  );
}

export default PresentationPage;
