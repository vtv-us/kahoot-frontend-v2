/* eslint-disable no-unused-vars */
import { debounce } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Search from "../../components/input/Search";
import LeftOptionGroup from "../../components/layout/LeftOptionGroup";
import { createGroup, deleteGroup, getGroupsCreatedByUser, getGroupsUserHasJoined } from "../../handleApi";
import { getCurrentUser, JOINED, OWNED } from "../../utils/constants";
import GroupList from "./GroupList";

const handleCreate = async (setGroupList, groupName, accessToken) => {
  await createGroup(groupName, accessToken);
  const getGroupRes = await getGroupsCreatedByUser(accessToken);
  setGroupList(getGroupRes);
};

function DashboardGroup() {
  const [filter, setFilter] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const user = getCurrentUser();
  const handleSetFilter = debounce(e => setFilter(e.target.value), 500);
  const { id } = useParams();
  useEffect(() => {
    setIsFetching(true);
    if (id === OWNED) {
      getGroupsCreatedByUser(user.access_token).then(res => {
        setGroupList(res);
        setIsFetching(false);
      });
    }
    if (id === JOINED) {
      getGroupsUserHasJoined(user.access_token).then(res => {
        setGroupList(res);
        setIsFetching(false);
      });
    }
  }, [id]);

  const handleCreateGroup = text => {
    handleCreate(setGroupList, text, user.access_token);
  };
  const handleDeleteGroup = async groupId => {
    const result = await deleteGroup(groupId, user?.access_token);
    if (result === false) {
      toast.error("Something has occured when delete this group");
      return;
    }
    toast.success("Delete group successfully");
    if (id === OWNED) {
      getGroupsCreatedByUser(user.access_token).then(res => {
        setGroupList(res);
        setIsFetching(false);
      });
    }
    if (id === JOINED) {
      getGroupsUserHasJoined(user.access_token).then(res => {
        setGroupList(res);
        setIsFetching(false);
      });
    }
  };
  return (
    <div className="p-8 px-40 flex-1 bg-gray-50">
      <div className="flex justify-between">
        <Search handleSetFilter={handleSetFilter} />
        <LeftOptionGroup handleCreateGroup={handleCreateGroup} />
      </div>
      {id === OWNED ? (
        <GroupList groupList={groupList} isFetching={isFetching} handleDeleteGroup={handleDeleteGroup} />
      ) : (
        <GroupList groupList={groupList} isFetching={isFetching} />
      )}
    </div>
  );
}

export default DashboardGroup;
