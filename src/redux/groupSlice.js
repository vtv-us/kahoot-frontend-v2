/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    create: {
      isFetching: false,
      error: false,
    },
    groupsCreatedByUser: {
      allGroups: null,
      isFetching: false,
      error: false,
    },
    groupsUserHaveJoined: {
      allGroups: null,
      isFetching: false,
      error: false,
    },
    // delete: {},
  },
  reducers: {
    createGroupStart: state => {
      state.create.isFetching = true;
    },
    createGroupSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.error = false;
    },
    createGroupFailed: state => {
      state.create.isFetching = false;
      state.create.error = true;
    },
    getGroupsCreatedByUserStart: state => {
      state.groupsCreatedByUser.isFetching = true;
    },
    getGroupsCreatedByUserSuccess: (state, action) => {
      state.groupsCreatedByUser.isFetching = false;
      state.groupsCreatedByUser.allGroups = action.payload;
    },
    getGroupsCreatedByUserFailed: state => {
      state.groupsCreatedByUser.isFetching = false;
      state.groupsCreatedByUser.error = true;
    },
    getGroupsUserHaveJoinedStart: state => {
      state.groupsUserHaveJoined.isFetching = true;
    },
    getGroupsUserHaveJoinedSuccess: (state, action) => {
      state.groupsUserHaveJoined.isFetching = false;
      state.groupsUserHaveJoined.allGroups = action.payload;
    },
    getGroupsUserHaveJoinedFailed: state => {
      state.groupsUserHaveJoined.isFetching = false;
      state.groupsUserHaveJoined.error = true;
    },
    // createGroupStart: (state) => {
    //     state.create.isFetching = true;
    // },
    // createGroupSuccess:
  },
});
export const {
  createGroupSuccess,
  createGroupStart,
  createGroupFailed,
  getGroupsCreatedByUserStart,
  getGroupsCreatedByUserSuccess,
  getGroupsCreatedByUserFailed,
  getGroupsUserHaveJoinedStart,
  getGroupsUserHaveJoinedSuccess,
  getGroupsUserHaveJoinedFailed,
} = groupSlice.actions;
export default groupSlice.reducer;
