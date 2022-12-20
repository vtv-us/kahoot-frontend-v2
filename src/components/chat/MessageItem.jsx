/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";

function MessageItem({ name = "anonymous", message = "Lorem ipsum dolor sit ", isCurrent = false }) {
  return (
    <div
      className={`bg-slate-100 w-fit max-w-[400px] p-3 flex gap-2 items-center ${
        !isCurrent ? "rounded-r-xl" : "rounded-l-xl ml-auto bg-slate-300"
      }`}
    >
      {!isCurrent && (
        <div className="rounded-full min-w-fit h-8">
          <img src="/avatarChat.png" className="w-full h-full" alt="" />
        </div>
      )}
      <div className="flex flex-col">
        <div className="text-sm font-bold">{name}</div>
        <div className="text-md">{message}</div>
      </div>
    </div>
  );
}
MessageItem.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
  isCurrent: PropTypes.bool,
};

export default MessageItem;
