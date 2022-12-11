/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { Radio, RadioGroup } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import uuid from "react-uuid";
import ButtonMain from "../components/button/ButtonMain";
import RadioItem from "../components/radio/RadioItem";
import { SocketContext } from "../contexts/socketContext";
import { getCurrentUser } from "../utils/constants";
import { getAllAnswersByIdQuestion, getAllQuestionByIdSlide, getAnswerById, getQuestionById } from "../handleApi";

function SlideShowMemberPage() {
  const socket = useContext(SocketContext);
  const { idSlide, idQuestion } = useParams();
  const [value, setValue] = useState("");
  const [question, setQuesion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => setUsername(uuid()), [idSlide]);
  console.log("username", username);
  useEffect(() => {
    socket.on("connect", msg => {
      socket.emit("join", uuid(), `${idSlide}`);
      console.log("member connected");
    });
    // getAllQuestionByIdSlide(idSlide, user.access_token).then(data => {
    //   setQuesions(data);
    // });
    socket.on("error", err => {
      console.log("received socket error:");
      console.log(err);
    });
    socket.on("getRoomActive", msg => {
      console.log(msg);
    });
    socket.on("getActiveParticipants", msg => {
      console.log(msg);
    });
    socket.on("showStatistic", msg => {
      console.log(msg);
    });
    socket.on("getRoomState", msg => {
      console.log(msg);
    });
    getQuestionById(idQuestion).then(res => {
      setQuesion(res);
    });
    getAllAnswersByIdQuestion(idQuestion).then(res => {
      setAnswers(res);
    });
  }, []);

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log("question", question);
    socket.emit("submitAnswer", Number(question.index), Number(value));
  };
  return (
    <div className="mx-auto  flex flex-col items-center max-w-[600px] m-10 p-2">
      <div className="max-w-[200px] mb-10">
        <img src="/logo.svg" className="w-full" alt="logo" />
      </div>
      <div className="flex flex-col items-start w-full gap-2">
        <p className="text-gray-400">{question?.meta}</p>
        <h2 className="text-3xl font-bold">{question?.raw_question}</h2>
        {/* <p className="text-sm text-gray-400">{question?.raw_question}</p> */}
      </div>
      <div className="w-full mt-4">
        <RadioGroup
          className="flex flex-col gap-4"
          name="answer"
          onChange={handleChange}
          value={value}
          defaultValue="first"
        >
          {answers.map(item => (
            <RadioItem key={item.id} value={`${item.index}`} label={`${item.raw_answer}`} control={<Radio />} />
          ))}
          {/* <RadioItem value="first" label="Lionel Messi" control={<Radio />} />
          <RadioItem value="second" label="Bruno Fernandes" control={<Radio />} />
          <RadioItem value="third" label="Mason Greenwood" control={<Radio />} /> */}
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
    </div>
  );
}
SlideShowMemberPage.propTypes = {};

export default SlideShowMemberPage;
