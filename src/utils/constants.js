import { useSelector } from "react-redux";

/* eslint-disable import/prefer-default-export */
export const LIMIT_NAME = 20;
export const OWNED = "owned";
export const JOINED = "joined";
export const PENDING = "pending";

export const getCurrentUser = () => useSelector(state => state.auth.login.currentUser);
