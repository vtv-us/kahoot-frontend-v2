/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FormHideShowInput from "../../components/form_components/FormHideShowInput";
import ButtonMain from "../../components/button/ButtonMain";
import ModalFetching from "../../components/modal/ModalFetching";
import { forgetPassword, resetPassword } from "../../handleApi";

const minLength = 8;
const maxLength = 50;
const schema = yup.object({
  newPassword: yup
    .string()
    .min(minLength, `password must be at least ${minLength} characters`)
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, one uppercase, one lowercase, one number"
    ),
  confirmPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
function ResetPassword() {
  const [values, setValues] = React.useState({
    showNewPassword: false,
    showConfirmPassword: false,
  });
  const [isFetching, setIsFetching] = React.useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { userId, code } = useParams();
  const navigate = useNavigate();
  const handleClickShowPassword = type => {
    switch (type) {
      case "confirmPassword":
        setValues({
          ...values,
          showConfirmPassword: !values.showConfirmPassword,
        });
        break;
      case "newPassword":
        setValues({
          ...values,
          showNewPassword: !values.showNewPassword,
        });
        break;

      default:
        break;
    }
  };
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const onSubmit = async formValues => {
    // TO DO
    const data = {
      user_id: userId,
      password: formValues?.newPassword,
      code,
    };
    const res = await resetPassword(data);
    if (!res) {
      toast.error("Reset Failed");
    } else {
      toast.success("Reset successfully");
      navigate("/login");
    }
    setIsFetching(true);
    // const res = await changePassword(formValues.password, formValues.newPassword, user.access_token, reset);
    setIsFetching(false);
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <div className="w-[420px] mx-auto mt-32 bg-white py-7">
      <h2 className="text-center mb-5 text-xl font-bold">Reset Password</h2>
      <form className="flex flex-col gap-4 px-5" onSubmit={handleSubmit(onSubmit)}>
        <FormHideShowInput
          id="new-password"
          name="newPassword"
          type={values.showNewPassword ? "text" : "password"}
          onChange={handleChange("newPassword")}
          label="New Password"
          endIcon
          onIconClick={() => handleClickShowPassword("newPassword")}
          onIconMouseDown={handleMouseDownPassword}
          control={control}
          error={errors?.newPassword != null}
          helperText={errors?.newPassword && errors.newPassword.message}
          icon={values.showNewPassword ? <VisibilityOff /> : <Visibility />}
        />
        <FormHideShowInput
          id="confirm-password"
          name="confirmPassword"
          type={values.showConfirmPassword ? "text" : "password"}
          onChange={handleChange("confirmPassword")}
          label="Confirm Password"
          endIcon
          onIconClick={() => handleClickShowPassword("confirmPassword")}
          onIconMouseDown={handleMouseDownPassword}
          control={control}
          error={errors?.confirmPassword != null}
          helperText={errors?.confirmPassword && errors.confirmPassword.message}
          icon={values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        />

        <Button
          type="submit"
          variant="contained"
          className="bg-green-600 text-white hover:bg-green-700 py-3 text-lg normal-case"
        >
          Reset
        </Button>
        <ModalFetching isFetching={isFetching} />
      </form>
    </div>
  );
}

export default ResetPassword;
