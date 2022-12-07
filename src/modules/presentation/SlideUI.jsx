import React from "react";
import BarChartPre from "../../components/chart/BarChartPre";
import { useSlide } from "../../contexts/slideContext";
import FooterSlide from "./FooterSlide";
import HeaderSlide from "./HeaderSlide";

function SlideUI() {
  const data = [
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
  const { meta, question } = useSlide();
  return (
    <div className="p-4 bg-white m-10 flex-1 flex-flex-col relative">
      <HeaderSlide meta={meta} question={question} />
      <BarChartPre data={data} />
      <FooterSlide />
    </div>
  );
}

export default SlideUI;
