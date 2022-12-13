/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";

function MessageItem({ name = "anonymous", message = "Lorem ipsum dolor sit ", isCurrent = false }) {
  return (
    <div className={`bg-slate-100 w-fit p-3 ${isCurrent ? "rounded-r-xl" : "rounded-l-xl ml-auto bg-slate-300"}`}>
      <div className="text-sm font-bold">{name}</div>
      <div className="text-md">{message}</div>
    </div>
  );
}
MessageItem.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
  isCurrent: PropTypes.bool,
};

export default MessageItem;
