/* eslint-disable react/function-component-definition */
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import IconReactQuestion from "../icon/IconReactQuestion";
import MessageList from "./MessageList";

function ChatBox({ setShowMessage = () => {} }) {
  return (
    <div className="absolute bottom-5 right-28 transition-all">
      <div className="w-96 h-[560px] rounded-lg bg-white shadow-[0_7px_40px_2px_rgb(148_149_150_/_30%)] flex flex-col justify-between">
        <Header setShowMessage={setShowMessage} />
        <Content />
        <Footer />
      </div>
    </div>
  );
}
ChatBox.propTypes = {
  setShowMessage: PropTypes.func.isRequired,
};
const Header = ({ setShowMessage = () => {} }) => {
  return (
    <div className="flex justify-between px-2 py-1 items-center shadow-[rgb(0_0_0_/_10%)_0px_2px_4px_0px] rounded-t-lg">
      <div className="font-bold text-xl">Chat box</div>
      <IconReactQuestion
        className="border-none shadow-none hover:bg-slate-100"
        onClick={() => {
          setShowMessage(false);
        }}
      >
        <CloseIcon />
      </IconReactQuestion>
    </div>
  );
};
Header.propTypes = {
  setShowMessage: PropTypes.func.isRequired,
};

const Footer = () => {
  return (
    <div className="flex justify-between px-2 py-1 items-center border-t border-gray-200">
      <input
        className="w-full  px-4 py-3 rounded-lg border border-gray-100 focus:border-blue-400 resize-none overflow-auto transition-all outline-none leading-normal"
        placeholder="Please enter your content..."
      />
      <IconReactQuestion className="border-none shadow-none hover:bg-slate-100">
        <SendIcon color="primary" />
      </IconReactQuestion>
    </div>
  );
};
const Content = () => {
  return (
    <div className="flex-1 overflow-auto px-4 pb-4">
      <MessageList />
    </div>
  );
};
export default ChatBox;
