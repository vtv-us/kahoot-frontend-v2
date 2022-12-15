/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInputTextField from "../../components/form_components/FormInputTextField";
import ChangeAuthen from "./ChangeAuthen";

function ForgetPassword() {
  const { handleSubmit, control } = useForm();
  const [isValid, setIsvalid] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = value => {
    // todo
    console.log(value);
    setEmail(value?.email);
    setIsvalid(true);
  };
  return (
    <div className="w-[420px] mx-auto mt-32 bg-white py-7">
      {!isValid ? (
        <>
          <h2 className="text-center mb-5 text-xl font-bold">Reset Password</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-5 ">
            <FormInputTextField
              name="email"
              fullWidth
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              control={control}
            />
            <Button
              type="submit"
              variant="contained"
              className="bg-green-600 text-white hover:bg-green-700 py-3 text-lg normal-case"
            >
              Reset
            </Button>
          </form>
          <ChangeAuthen title="Back to " page="Log in" to="/login" />
        </>
      ) : (
        <div>
          <img src="/success.png" alt="photo_success" className="w-32 mx-auto mb-4" />
          <div className="text-center">
            A new password has been sent via{" "}
            <a className="cursor-pointer font-bold" target="_blank" href="https://mail.google.com/">
              {email}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
