import React from "react";
import LayoutMain from "../components/layout/LayoutMain";
import UserManage from "../modules/user/UserManage";

function UserPage() {
  return (
    <LayoutMain>
      <UserManage />
    </LayoutMain>
  );
}

export default UserPage;
