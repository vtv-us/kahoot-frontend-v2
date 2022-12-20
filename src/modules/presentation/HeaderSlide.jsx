/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";

function HeaderSlide({
  meta = "This is a meta field",
  question = "Who need Ronaldo",
  description = "",
  isMultiple = true,
}) {
  return (
    <div className={`mt-10  ${isMultiple ? "" : "flex flex-col h-96 items-center justify-center"}`}>
      <p className="text-sm text-gray-400">{meta}</p>
      <div
        className={`w-[700px] flex flex-wrap text-3xl font-bold text-gray-800 ${question.length > 100 && "!text-xl"} ${
          isMultiple ? "" : "justify-center"
        }`}
      >
        {question}
      </div>
      <p className="text-md text-gray-400  text-center">{description}</p>
    </div>
  );
}

HeaderSlide.propTypes = {
  meta: PropTypes.string,
  question: PropTypes.string,
  description: PropTypes.string,
  isMultiple: PropTypes.bool,
};

export default HeaderSlide;
