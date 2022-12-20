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

function MenuPresentation({ listItem }) {
  const data = useSlide();
  console.log("type of slide", data.type);
  return (
    <div className="w-[460px] max-h-[600px] overflow-auto border-l border-gray-200 bg-white">
      <DropdownMain selectedValue={data.type} handleOnSelect={data.setType} listItem={listItem} />
      <ContentSlideSetting data={data} />
    </div>
  );
}
MenuPresentation.propTypes = {
  listItem: PropTypes.array,
};

export default MenuPresentation;
