/* eslint-disable no-unused-vars */
import { debounce } from "@mui/material";
import React, { useState } from "react";
import Search from "../../components/input/Search";
import LeftOptionGroup from "../../components/layout/LeftOptionGroup";
import GroupBar from "../../components/menu/GroupBar";
import DashboardGroup from "./DashboardGroup";
import GroupList from "./GroupList";

function Group() {
  return (
    <div className="flex">
      <GroupBar />
      <DashboardGroup />
    </div>
  );
}

export default Group;
