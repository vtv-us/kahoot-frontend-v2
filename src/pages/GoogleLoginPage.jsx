/* eslint-disable no-unused-vars */
import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { loginGoogleUser } from "../redux/apiRequest";

function GoogleLoginPage() {
  const callback = useParams();
  const url = `/auth/callback/${callback.callback1}/${callback.callback2}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookiesAccess, setCookieAccess] = useCookies(["accessToken"]);
  const [cookiesRefresh, setCookieRefresh] = useCookies(["refreshToken"]);
  loginGoogleUser(url, dispatch, navigate, setCookieAccess, setCookieRefresh);
  return <div />;
}

export default GoogleLoginPage;
