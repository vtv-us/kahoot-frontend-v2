import React from "react";
import LayoutAuth from "../components/layout/LayoutAuth";
import Login from "../modules/auth/Login";

const LogInPage = () => {
  return (
    <LayoutAuth>
      <Login></Login>
    </LayoutAuth>
  );
};

export default LogInPage;
