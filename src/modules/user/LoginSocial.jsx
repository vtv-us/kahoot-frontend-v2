import { Button } from "@mui/material";
import React from "react";

function LoginSocial() {
  return (
    <a href={`${process.env.REACT_APP_BE_ADDRESS}/auth/google`}>
      <Button variant="outlined" className="w-full relative py-2">
        <img src="/google.svg" alt="" className="absolute left-1" />
        Continue with Google
      </Button>
    </a>
  );
}

export default LoginSocial;
