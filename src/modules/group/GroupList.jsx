import React from "react";
import GroupItem from "./GroupItem";

function GroupList() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-10">
      <GroupItem />
      <GroupItem />
      <GroupItem />
      <GroupItem />
      <GroupItem />
      <GroupItem />
      <GroupItem />
    </div>
  );
}

export default GroupList;
