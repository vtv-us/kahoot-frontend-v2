import React from "react";
import LayoutAuth from "../components/layout/LayoutAuth";
import ResetPassword from "../modules/user/ResetPassword";

function ResetPasswordPage() {
  return (
    <LayoutAuth>
      <ResetPassword />
    </LayoutAuth>
  );
}

export default ResetPasswordPage;
