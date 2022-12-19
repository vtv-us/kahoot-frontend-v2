/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

function MessageNotify({ message, onClose = () => {} }) {
  return (
    <div className="absolute max-w-[400px] bg-white bottom-16 rounded-xl right-[104px] shadow-[rgb(0_0_0_/_20%)_0px_1px_1px_1px] border boder-gray-100">
      <div className="relative py-4 px-6">
        <div className="font-bold">{message.username}</div>
        <div className="text-sm">{message.message}</div>
        <div
          className="absolute top-1 text-gray-400 right-2 cursor-pointer hover:bg-slate-100 rounded-full"
          onClick={onClose}
        >
          <CloseIcon className="text-[18px]" />
        </div>
      </div>
    </div>
  );
}
MessageNotify.propTypes = {
  message: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MessageNotify;
