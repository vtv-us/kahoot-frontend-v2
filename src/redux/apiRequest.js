/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { toast } from "react-toastify";
import { loginSuccess } from "./authSlice";

export const registerUser = async (user, navigate) => {
  try {
    await axios.post("/auth/register", user);
    toast.success("Sign up successfully");
    // navigate("/login");
  } catch (err) {
    toast.error(err, {
      pauseOnHover: false,
      delay: 100,
    });
  }
};

export const loginUser = async (user, dispatch, navigate, setCookieAccess, setCookieRefresh) => {
  try {
    const res = await axios.post("/auth/login", user);

    toast.success("Login successfully");
    dispatch(loginSuccess(res.data));
    setCookieAccess("accessToken", res.data?.access_token, { path: "/" });
    setCookieRefresh("refreshToken", res.data?.refresh_token, { path: "/" });
    // navigate("/");
  } catch (err) {
    console.log(err);
  }
};
