/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router";
import { getGroupsCreatedByUser, getGroupsUserHaveJoined } from "../../redux/apiRequest";
import { JOINED, OWNED } from "../../utils/constants";
import GroupItem from "./GroupItem";
import GroupItemSkeleton from "../../components/skeleton/GroupItemSkeleton";

function GroupList() {
  const { id } = useParams();
  // const [idState, setIdState] = useState(id);
  const user = useSelector(state => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups);
  const groupList = useSelector(state => (id === OWNED ? state.groups?.groupsCreatedByUser.allGroups : []));
  const isFetching =
    useSelector(state => state.groups.create.isFetching) ||
    useSelector(state => state.groups.groupsCreatedByUser.isFetching);
  useEffect(() => {
    if (id === OWNED) {
      getGroupsCreatedByUser(user?.access_token, dispatch);
    }
    // if (id === JOINED) {
    //   getGroupsUserHaveJoined(user?.access_token, dispatch);
    //   console.log(`joined ${groupList}`);
    // }
  }, [id]);

  console.log(groupList);

  return (
    <div className="grid grid-cols-4 gap-4 mt-10">
      {groupList.length &&
        isFetching === false &&
        groupList?.map(item => (
          <GroupItem
            key={item.group_id}
            id={item.group_id}
            to={`/groups/${item.group_id}/members`}
            groupName={item.group_name}
          />
        ))}

      {groupList.length > 0 && isFetching && new Array(12).fill(0).map(() => <GroupItemSkeleton />)}
      {}
      {groupList.length <= 0 && <>There no groups here</>}
    </div>
  );
}

export default GroupList;
