import React from "react";
import MessageItem from "./MessageItem";

function MessageList() {
  return (
    <div className="flex flex-col gap-4">
      <MessageItem />
      <MessageItem isCurrent />
      <MessageItem />
      <MessageItem isCurrent />
      <MessageItem />
      <MessageItem isCurrent />
      <MessageItem />
      <MessageItem isCurrent />
    </div>
  );
}

export default MessageList;
