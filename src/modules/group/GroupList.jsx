import React from "react";
import GroupItem from "./GroupItem";

function GroupList() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-10">
      <GroupItem to="/groups/owned/members" />
      <GroupItem to="/groups/owned/members" />
      <GroupItem to="/groups/owned/members" />
      <GroupItem to="/groups/owned/members" />
      <GroupItem to="/groups/owned/members" />
      <GroupItem to="/groups/owned/members" />
      <GroupItem to="/groups/owned/members" />
    </div>
  );
}

export default GroupList;
