/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllAnswersByIdQuestion, getQuestionById, updateQuestion } from "../handleApi";
import { getCurrentUser, QUESTION_TYPE } from "../utils/constants";

const getData = async id => {
  const data = await getQuestionById(id);
  return data;
};
const SlideContext = createContext();
function SlideProvider(props) {
  const { idQuestion } = useParams();
  const user = getCurrentUser();

  const [type, setType] = useState(1);
  const [meta, setMeta] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState([]);
  const [checkedReactionList, setCheckedReactionList] = useState([]);
  const [index, setIndex] = useState(1);
  const valueByType = ["", "multiple-choice", "heading", "paragraph", "qa"];
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(idQuestion);
      setIndex(res.index);
      setMeta(res.meta);
      setQuestion(res.raw_question);
      setDescription(res.long_description);
      setType(QUESTION_TYPE[res.type]);
      const resAnswers = await getAllAnswersByIdQuestion(idQuestion, user?.access_token);
      setAnswers(resAnswers.sort());
    };
    fetchData();
  }, [idQuestion]);

  useEffect(() => {
    const questionData = {
      question_id: idQuestion,
      raw_question: question || "Multiple choice question",
      meta,
      index,
      long_description: description,
      type: valueByType[type],
    };

    updateQuestion(user?.access_token, questionData);
  }, [meta, question, description, type]);

  const value = {
    meta,
    setMeta,
    question,
    setQuestion,
    description,
    setDescription,
    answers,
    setAnswers,
    checkedReactionList,
    setCheckedReactionList,
    type,
    setType,
  };
  return <SlideContext.Provider value={value} {...props} />;
}

function useSlide() {
  const context = useContext(SlideContext);
  if (typeof context === "undefined") throw new Error("useSlide must be used within a SlideProvider");
  return context;
}
export { SlideProvider, useSlide };
