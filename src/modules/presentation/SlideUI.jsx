/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSlide } from "../../contexts/slideContext";
import { getQuestionById } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";
import BarChartPre from "../../components/chart/BarChartPre";
import FooterSlide from "./FooterSlide";
import HeaderSlide from "./HeaderSlide";

const getData = async (id, accessToken) => {
  const data = await getQuestionById(id, accessToken);
  return data;
};
function SlideUI() {
  const dataChart = [
    {
      name: "Real Madrid",
      quantity: 5,
    },
    {
      name: "Chelsea",
      quantity: 7,
    },
    {
      name: "Bayern Munich",
      quantity: 4,
    },
  ];
  const data = useSlide();

  return (
    <div className="p-4 bg-white m-10 flex-1 flex-flex-col relative">
      <HeaderSlide meta={data?.meta} question={data?.question} />
      <BarChartPre data={dataChart} />
      <FooterSlide />
    </div>
  );
}

export default SlideUI;
