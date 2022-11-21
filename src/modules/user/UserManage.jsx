/* eslint-disable react/self-closing-comp */
import React, { useEffect } from "react";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";

function UserManage() {
  useEffect(() => {
    document.title = "User manage";
  }, []);
  return (
    <div className="mx-auto w-[1232px] m-10">
      <h1 className="font-bold text-2xl mb-4">User profile</h1>
      <div className="flex gap-4 justify-between">
        <UserInfo></UserInfo>
        <ChangePassword></ChangePassword>
      </div>
    </div>
  );
}

export default UserManage;
