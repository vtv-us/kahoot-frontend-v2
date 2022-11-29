/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router";
import { JOINED, OWNED } from "../../utils/constants";
import GroupItem from "./GroupItem";
import GroupItemSkeleton from "../../components/skeleton/GroupItemSkeleton";
import { getGroupsCreatedByUser, getGroupsUserHaveJoined } from "../../redux/apiRequest";

function GroupList({ groupList, isFetching }) {
  return (
    //   <div className="grid grid-cols-4 gap-4 mt-10">
    //     {groupList.length &&
    //       isFetching === false &&
    //       groupList?.map(item => (
    //         <GroupItem
    //           key={item.group_id}
    //           id={item.group_id}
    //           to={`/groups/${item.group_id}/members`}
    //           groupName={item.group_name}
    //         />
    //       ))}

    //     {groupList.length > 0 && isFetching && new Array(12).fill(0).map(() => <GroupItemSkeleton />)}
    //     {}
    //     {groupList.length <= 0 && <>There no groups here</>}
    //   </div>
    // );
    <div className="grid grid-cols-4 gap-4 mt-10">
      {groupList.length > 0 ? (
        groupList?.map(item => (
          <GroupItem
            key={item.group_id}
            id={item.group_id}
            to={`/groups/${item.group_id}/members`}
            groupName={item.group_name}
          />
        ))
      ) : (
        <>There no groups here</>
      )}
    </div>
  );
}

export default GroupList;
