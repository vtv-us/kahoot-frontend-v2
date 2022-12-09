/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import * as io from "socket.io-client";

// export const socket = io.connect(process.env.REACT_APP_BE_ADDRESS);
// const SocketContext = React.createContext(socket);

// export const SocketProvider = SocketContext.Provider;
// export const SocketConsumer = SocketContext.Consumer;
// export default SocketContext;
// import { createContext, useContext, useState } from "react";

// const SocketContext = createContext();
// function SocketProvider(props) {
//   const [socket, setSocket] = useState();
//   const value = { socket, setSocket };
//   return <SocketContext.Provider value={value} {...props}></SocketContext.Provider>;
// }

// function useSocket() {
//   const context = useContext(SocketContext);
//   if (typeof context === "undefined") throw new Error("useSocket must be used within a SocketProvider");
//   return context;
// }
// export { SocketProvider, useSocket };

import socketio from "socket.io-client";

export const socket = socketio.connect(process.env.REACT_APP_BE_ADDRESS);
export const SocketContext = React.createContext();
