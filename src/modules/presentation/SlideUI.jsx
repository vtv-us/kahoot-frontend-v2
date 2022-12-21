/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { useSlide } from "../../contexts/slideContext";
import { getAllAnswersByIdQuestion, getQuestionById } from "../../handleApi";
import { getCurrentUser, QUESTION_TYPE } from "../../utils/constants";
import BarChartPre from "../../components/chart/BarChartPre";
import FooterSlide from "./FooterSlide";
import HeaderSlide from "./HeaderSlide";

function SlideUI({ statistic, idQuestion }) {
  const data = useSlide();
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAnswersByIdQuestion(idQuestion);
      const newDataChart = res?.map(item => {
        return { name: item.raw_answer, quantity: (statistic && statistic[item.index]) || 0 };
      });

      const resQuestion = await getQuestionById(idQuestion);

      setDataChart(newDataChart);
    };
    fetchData();
  }, [idQuestion, statistic, data]);
  const isMultiple = data.type === QUESTION_TYPE.MULTIPLE_CHOICE;
  return (
    <div className={`p-4 bg-white m-10 flex-1 flex-flex-col relative max-h-[748px] overflow-auto `}>
      <HeaderSlide
        meta={data?.meta}
        question={data?.question}
        description={data?.description}
        isMultiple={isMultiple}
      />
      {dataChart.length > 0 ? <BarChartPre data={dataChart} isMultiple={isMultiple} /> : <NoneBarChart />}
      <FooterSlide type={data?.type} checkedList={data.checkedReactionList} />
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

export default SlideUI;
