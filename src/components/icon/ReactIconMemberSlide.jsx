/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";

function ReactIconMemberSlide({ children, onClick = () => {}, isChecked = false }) {
  return (
    <div
      className={`w-[60px] h-[60px] flex items-center justify-center react-icon-member rounded-full border border-pink-600 text-pink-600 cursor-pointer hover:opacity-70 transition-all ${
        isChecked && "!text-white bg-pink-600"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
ReactIconMemberSlide.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
};

export default ReactIconMemberSlide;
