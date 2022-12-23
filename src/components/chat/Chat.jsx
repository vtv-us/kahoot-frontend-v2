/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import MessageIcon from "@mui/icons-material/Message";
import PropTypes from "prop-types";
import IconReactQuestion from "../icon/IconReactQuestion";
import MessageNotify from "./MessageNotify";
import ChatBox from "./ChatBox";

function Chat({ data }) {
  return (
    <>
      <div
        className="absolute bottom-20 right-10"
        onClick={() => {
          data.socket.emit("getChatHistory");
          data.setCountMessages(0);
          data.setShowMessage(!data.showMessage);
          data.setShowNewMessage(false);
        }}
      >
        <div className="relative">
          <IconReactQuestion className="border boder-gray-100 bg-white">
            <MessageIcon fontSize="large" />
          </IconReactQuestion>
          {data.countMessages > 0 && !data.showMessage && (
            <span className="absolute rounded-full text-sm text-white bg-red-500 py-1 px-2 -top-2 right-0 font-bold">
              {data.countMessages}
            </span>
          )}
        </div>
      </div>
      {data.showNewMessage && (
        <MessageNotify
          message={data.newMessage}
          onClose={() => {
            data.setShowNewMessage(false);
          }}
        />
      )}
      {data.showMessage && (
        <ChatBox socket={data.socket} username={data.username} setShowMessage={data.setShowMessage} />
      )}
    </>
  );
}
Chat.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Chat;
