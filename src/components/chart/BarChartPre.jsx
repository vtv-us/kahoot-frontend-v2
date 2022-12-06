/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/self-closing-comp */
import React from "react";
import { BarChart, Bar, XAxis, LabelList, YAxis } from "recharts";
import PropTypes from "prop-types";

export default function BarChartPre({ data }) {
  return (
    <BarChart width={300} className="mt-10 mx-auto" height={300} data={data}>
      <Bar dataKey="quantity" fill="#8884d8">
        <img src="/" alt="logo_kahoot.png" />
        <LabelList dataKey="quantity" position="top" style={{ fill: "#000" }}></LabelList>
      </Bar>
      <YAxis axisLine={false} tickLine={false} tick={false} hide domain={[0, "dataMax +2"]} tickCount={1}></YAxis>
      <XAxis tickLine={false} dataKey="name"></XAxis>
    </BarChart>
  );
}
BarChartPre.propTypes = {
  data: PropTypes.array,
};
