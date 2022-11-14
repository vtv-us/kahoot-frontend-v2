import React from "react";
import HeaderAuth from "./HeaderAuth";

const LayoutAuth = ({ children }) => {
  return (
    <>
      <HeaderAuth></HeaderAuth>
      <div className="bg-gray-200 h-screen mx-auto pt-[58px]">{children}</div>
    </>
  );
};

export default LayoutAuth;
