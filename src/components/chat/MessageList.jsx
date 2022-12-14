/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import ScrollToBottom from "react-scroll-to-bottom";
import uuid from "react-uuid";
import MessageItem from "./MessageItem";

function MessageList({ data = [] }) {
  return (
    <div className="flex flex-col gap-2 py-4 pr-4">
      {data.length > 0 &&
        data.map(item => (
          <MessageItem key={uuid()} name={item.name} message={item.message} isCurrent={item.isCurrent} />
        ))}
    </div>
  );
}
MessageList.propTypes = {
  data: PropTypes.array,
};
export default MessageList;
