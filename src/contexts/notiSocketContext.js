import React from "react";
import socketio from "socket.io-client";

export const notiSocket = socketio.connect(`${process.env.REACT_APP_BE_ADDRESS}/notification`);
export const NotiSocketContext = React.createContext();
