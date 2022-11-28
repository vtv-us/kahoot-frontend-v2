/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { toast } from "react-toastify";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  createGroupFailed,
  createGroupStart,
  createGroupSuccess,
  getGroupsCreatedByUserFailed,
  getGroupsCreatedByUserStart,
  getGroupsCreatedByUserSuccess,
  getGroupsUserHaveJoinedFailed,
  getGroupsUserHaveJoinedStart,
  getGroupsUserHaveJoinedSuccess,
} from "./groupSlice";

export const registerUser = async (user, dispatch, navigate) => {
  try {
    await axios.post("/auth/register", user);
    dispatch(registerSuccess(user.email));
    toast.success("Sign up successfully");
    navigate("/verifyaccount");
  } catch (err) {
    const errorMessage = err.response.data.error;
    dispatch(registerFailed(errorMessage));
    toast.error(errorMessage, {
      autoClose: false,
    });
  }
};

export const loginUser = async (user, dispatch, navigate, setCookieAccess, setCookieRefresh) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);

    toast.success("Login successfully");
    dispatch(loginSuccess(res.data));
    setCookieAccess("accessToken", res.data?.access_token, { path: "/" });
    setCookieRefresh("refreshToken", res.data?.refresh_token, { path: "/" });
    navigate("/");
  } catch (err) {
    const errorMessage = err.response.data.error;
    dispatch(loginFailed(errorMessage));
    toast.error(errorMessage, { autoClose: false });
  }
};
export const logoutUser = dispatch => {
  dispatch(logoutSuccess());
};

export const getGroupsCreatedByUser = async (accessToken, dispatch) => {
  dispatch(getGroupsCreatedByUserStart());
  try {
    const res = await axios.get("/group", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getGroupsCreatedByUserSuccess(res.data));
  } catch (error) {
    dispatch(getGroupsCreatedByUserFailed());
  }
};
export const createGroup = async (groupName, accessToken, dispatch) => {
  // dispatch(createGroupStart());
  try {
    const res = await axios.post("/group", groupName, { headers: { Authorization: `Bearer ${accessToken}` } });
    // dispatch(createGroupSuccess());
    getGroupsCreatedByUser(accessToken, dispatch);
  } catch (error) {
    console.log(error);
    // dispatch(createGroupFailed());
  }
};

export const getGroupsUserHaveJoined = async (accessToken, dispatch) => {
  dispatch(getGroupsUserHaveJoinedStart());
  try {
    const res = await axios.get("/group/joined", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getGroupsUserHaveJoinedSuccess(res.data));
  } catch (error) {
    dispatch(getGroupsUserHaveJoinedFailed());
  }
};
