/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";

function IconReactQuestion({ children, className = "", onClick = () => {} }) {
  return (
    <Icon onClick={onClick} className={`rounded-full p-2 shadow-[rgb(0_0_0_/_20%)_0px_1px_1px_1px] ${className}`}>
      {children}
    </Icon>
  );
}
IconReactQuestion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default IconReactQuestion;
