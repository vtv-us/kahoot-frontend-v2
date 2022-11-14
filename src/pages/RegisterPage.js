import React from "react";
import LayoutAuth from "../components/layout/LayoutAuth";
import Signup from "../modules/auth/Sinup";

const RegisterPage = () => {
  return (
    <LayoutAuth>
      <Signup></Signup>
    </LayoutAuth>
  );
};

export default RegisterPage;
