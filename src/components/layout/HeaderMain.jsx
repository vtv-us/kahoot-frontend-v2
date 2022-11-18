/* eslint-disable react/jsx-fragments */
import { Button } from "@mui/material";
import React from "react";
import Bell from "../icon/Bell";
import MenuBar from "../menu/MenuBar";
import User from "../user/User";

function HeaderMain() {
  return (
    <div className="flex items-center justify-between  px-4 py-3 fixed w-full z-50 bg-white shadow-[rgb(0_0_0_/_10%)_0px_2px_4px_0px]">
      <div className=" flex items-center gap-4">
        <div className="w-[96px] mr-4">
          <img src="/logo.svg" alt="" />
        </div>
        <MenuBar />
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="contained" className="bg-blue-700 normal-case px-6">
          Create
        </Button>
        <User className="bg-green-600" />
        <Bell />
      </div>
    </div>
  );
}

export default HeaderMain;
