/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import React, { useRef, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import ScrollToBottom from "react-scroll-to-bottom";
import CloseIcon from "@mui/icons-material/Close";
import IconReactQuestion from "../icon/IconReactQuestion";
import MessageList from "./MessageList";

function ChatBox({ setShowMessage = () => {} }) {
  const list = [
    { name: "username", message: "Xin chào tất cả ", isCurrent: false },
    { name: "username", message: "Xin chào tất cả ", isCurrent: true },
    { name: "username", message: "Xin chào tất cả ", isCurrent: false },
    { name: "username", message: "Xin chào tất cả ", isCurrent: true },
    { name: "username", message: "Xin chào tất cả ", isCurrent: false },
    { name: "username", message: "Xin chào tất cả ", isCurrent: true },
    { name: "username", message: "Xin chào tất cả ", isCurrent: false },
    { name: "username", message: "Xin chào tất cả ", isCurrent: true },
    {
      name: "username",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolore nesciunt, rerum dicta nisi est velit. Cupiditate, quae adipisci? At ab sapiente labore velit eaque! Fugiat expedita aliquam voluptas iste!",
      isCurrent: false,
    },
    {
      name: "username",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolore nesciunt, rerum dicta nisi est velit. Cupiditate, quae adipisci? At ab sapiente labore velit eaque! Fugiat expedita aliquam voluptas iste!",
      isCurrent: true,
    },
  ];
  const [messageList, setMessageList] = useState(list);
  return (
    <div className="absolute bottom-5 right-28 transition-all">
      <div className="w-[480px] h-[560px] rounded-lg bg-white shadow-[0_7px_40px_2px_rgb(148_149_150_/_30%)] flex flex-col justify-between">
        <Header setShowMessage={setShowMessage} />
        <Content list={messageList} />
        <Footer list={messageList} setList={setMessageList} />
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
        className="!border-none !shadow-none hover:bg-slate-100"
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

const Footer = ({ list = [], setList = () => {} }) => {
  const [filter, setFilter] = useState("");

  const handleSendMessage = () => {
    // todo
    setList([
      ...list,
      {
        name: "tushimon",
        message: filter,
        isCurrent: true,
      },
    ]);
    setFilter("");
  };
  const handleKeyDown = event => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex justify-between px-2 py-1 items-center border-t border-gray-200">
      <input
        className="w-full  px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 resize-none overflow-auto transition-all outline-none leading-normal"
        value={filter}
        placeholder="Please enter your content..."
        onChange={e => setFilter(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconReactQuestion className="!border-none !shadow-none hover:bg-slate-100" onClick={handleSendMessage}>
        <SendIcon color="primary" />
      </IconReactQuestion>
    </div>
  );
};

Footer.propTypes = {
  setList: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
};

const Content = ({ list }) => {
  return (
    <ScrollToBottom className="flex-1 overflow-auto transition-all scroll-smooth pl-4 ">
      <MessageList data={list} />
    </ScrollToBottom>
  );
};
Content.propTypes = { list: PropTypes.array };

export default ChatBox;
