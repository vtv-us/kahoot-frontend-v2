import React from "react";
import LayoutAuth from "../components/layout/LayoutAuth";
import ForgetPassword from "../modules/user/ForgetPassword";

function ForgetPasswordPage() {
  return (
    <LayoutAuth>
      <ForgetPassword />
    </LayoutAuth>
  );
}

export default ForgetPasswordPage;
