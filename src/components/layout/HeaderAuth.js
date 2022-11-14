import React from "react";

//shadow-[0px_0px_0px_3px_rgba(125,_106,_255,_0.2)]
//rgb(0 0 0 / 10%) 0px 2px 4px 0px
const HeaderAuth = () => {
  return (
    <div className="fixed w-full z-999 bg-white flex items-center justify-between px-4 py-3 shadow-[rgb(0_0_0_/_10%)_0px_2px_4px_0px]">
      <div className="w-full max-w-[96px]">
        <img src="/logo.svg" alt="" />
      </div>
      <div className="p-[1px]  rounded-full shadow-[rgb(0_0_0_/_10%)_0px_2px_4px_0px]">
        <img src="/browser.svg" alt="" />
      </div>
    </div>
  );
};

export default HeaderAuth;
