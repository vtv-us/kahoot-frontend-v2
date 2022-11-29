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

export const postData = async (id, accessToken, navigate) => {
  console.log("accessToken", accessToken);
  console.log("link", `/group/${id}`);
  try {
    await axios.post(`/group/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    navigate(`/groups/${id}/members`);
  } catch (error) {
    console.log(error);
  }
};

export const getGroupsMembers = async (accessToken, groupIdBody) => {
  try {
    const res = await axios.get("http://localhost:8080/group/member", groupIdBody, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
