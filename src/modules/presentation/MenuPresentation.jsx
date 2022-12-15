/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { useSlide } from "../../contexts/slideContext";
import { getQuestionById } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";

import ContentSlideSetting from "./ContentSlideSetting";
import DropdownMain from "./DropdownMain";

function MenuPresentation({ selectedValue, listItem, handleOnSelect }) {
  const data = useSlide();

  return (
    <div className="w-[460px] max-h-[600px] overflow-auto border-l border-gray-200 bg-white">
      <DropdownMain selectedValue={selectedValue} handleOnSelect={handleOnSelect} listItem={listItem} />
      <ContentSlideSetting data={data} />
    </div>
  );
}
MenuPresentation.propTypes = {
  selectedValue: PropTypes.number,
  listItem: PropTypes.array,
  handleOnSelect: PropTypes.func,
};

export default MenuPresentation;
