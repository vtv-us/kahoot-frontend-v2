/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import LayoutMain from "../components/layout/LayoutMain";
import Group from "../modules/group/Group";

function GroupPage() {
  useEffect(() => {
    document.title = "Kahoot - group";
  }, []);
  return (
    <LayoutMain className="!bg-white">
      <Group />
    </LayoutMain>
  );
}

export default GroupPage;
