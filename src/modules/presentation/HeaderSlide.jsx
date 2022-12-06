/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";

function HeaderSlide({ metaField = "This is a meta field", question = "Who need Ronaldo" }) {
  return (
    <div className="mt-10">
      <p className="text-sm text-gray-400">{metaField}</p>
      <h1 className="text-3xl font-bold text-gray-800">{question}</h1>
    </div>
  );
}

HeaderSlide.propTypes = {
  metaField: PropTypes.string,
  question: PropTypes.string,
};

export default HeaderSlide;
