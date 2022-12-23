import { useState, useEffect } from "react";

export default function useChat({ username }) {
  const [newMessage, setNewMessage] = useState({});
  const [countMessages, setCountMessages] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const handleNewMessage = (urs, msg) => {
    if (!showMessage) {
      setCountMessages(countMessages + 1);
      setNewMessage({ username: urs, message: msg });
      setShowNewMessage(true);
    }
  };
  useEffect(() => {
    setCountMessages(Number(localStorage.getItem(username)));
  }, [username]);
  useEffect(() => {
    localStorage.setItem(username, JSON.stringify(countMessages));
  }, [username, countMessages]);
  return {
    newMessage,
    setNewMessage,
    countMessages,
    setCountMessages,
    showMessage,
    setShowMessage,
    showNewMessage,
    setShowNewMessage,
    handleNewMessage,
  };
}
