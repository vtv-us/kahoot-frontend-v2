/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import CheckIcon from "@mui/icons-material/Check";

function ReactionIcon({ children, isChecked = false, onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      className={`text-gray-500 cursor-pointer reaction-icon relative ${isChecked && "text-blue-500"}`}
    >
      {children}
      {isChecked && <CheckIcon className="absolute left-2 -bottom-4 w-5 h-5 text-green-500" />}
    </div>
  );
}
ReactionIcon.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default ReactionIcon;
