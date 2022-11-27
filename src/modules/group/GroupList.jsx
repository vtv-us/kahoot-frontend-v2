/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getGroupsCreatedByUser, getGroupsUserHaveJoined } from "../../redux/apiRequest";
import { JOINED, OWNED } from "../../utils/constants";
import GroupItem from "./GroupItem";

function GroupList() {
  const { id } = useParams();
  // const [idState, setIdState] = useState(id);
  const user = useSelector(state => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups);
  const groupList = useSelector(state => (id === OWNED ? state.groups?.groupsCreatedByUser.allGroups : []));
  useEffect(() => {
    if (id === OWNED) {
      getGroupsCreatedByUser(user?.access_token, dispatch);
      console.log(`owned ${groupList}`);
    }
    // if (id === JOINED) {
    //   getGroupsUserHaveJoined(user?.access_token, dispatch);
    //   console.log(`joined ${groupList}`);
    // }
  }, [id]);
  return (
    <div className="grid grid-cols-4 gap-4 mt-10">
      {groupList.length ? (
        groupList?.map(item => <GroupItem key={item.group_id} to="/groups/owned/members" groupName={item.group_name} />)
      ) : (
        <>There no groups here</>
      )}
    </div>
  );
}

export default GroupList;
