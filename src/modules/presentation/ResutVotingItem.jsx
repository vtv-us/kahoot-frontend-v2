/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";
import { getAnswerById, getQuestionById } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";

function ResutVotingItem({ index = 1, data }) {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});
  const user = getCurrentUser();
  const time = new Date(Date.parse(data?.created_at)).toLocaleString("vi");
  useEffect(() => {
    const fetchData = async () => {
      const currentAnswer = await getAnswerById(data?.answer_id, user?.access_token);
      const currentQuestion = await getQuestionById(data?.question_id, user?.access_token);
      setAnswer(currentAnswer);
      setQuestion(currentQuestion);
    };
    fetchData();
  }, []);
  return (
    <tr>
      <td>{index}</td>
      <td>
        <strong>{data?.username}</strong>
      </td>
      <td>{question?.raw_question}</td>
      <td>{answer?.raw_answer}</td>
      <td>{time}</td>
    </tr>
  );
}
ResutVotingItem.propTypes = {
  index: Proptypes.number.isRequired,
  data: Proptypes.object.isRequired,
};

export default ResutVotingItem;
