/* eslint-disable react/self-closing-comp */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import FormHideShowInput from "../../components/form_components/FormHideShowInput";
import FormInputTextField from "../../components/form_components/FormInputTextField";

function Login() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  useEffect(() => {
    document.title = "Log In";
  }, []);
  const { handleSubmit, control } = useForm();
  const onSubmit = formValues => {
    // TO DO
    console.log(formValues);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <div className="w-[420px] mx-auto mt-10">
      <Grid>
        <Paper className="w-[420px] bg-white py-7 px-5 mx-auto">
          <h2 className="text-center mb-5 text-xl font-bold">Log in</h2>
          <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <FormInputTextField
              name="email"
              fullWidth
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              control={control}
            ></FormInputTextField>
            <FormHideShowInput
              id="outlined-adornment-password"
              name="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              label="Password"
              endIcon
              onIconClick={handleClickShowPassword}
              onIconMouseDown={handleMouseDownPassword}
              control={control}
              icon={values.showPassword ? <VisibilityOff /> : <Visibility />}
            ></FormHideShowInput>

            <Button
              type="submit"
              variant="contained"
              className="bg-green-600 text-white hover:bg-green-700 py-3 text-lg"
            >
              LOG IN
            </Button>
          </form>
          <div className="w-full float-left border-t-[1px] mt-10 text-center ">
            <b className="w-10 h-10 text-sm text-center bg-white inline-block  rounded-full leading-10 relative -top-5">
              or
            </b>
          </div>
          <Button variant="outlined" className="w-full relative py-2">
            <img src="/google.svg" alt="" className="absolute left-1" />
            Continue with Google
          </Button>

          <div className="text-center mt-4">
            Dont have an account?{" "}
            <span
              role="button"
              tabIndex={0}
              onKeyDown={handleClick}
              className="cursor-pointer text-blue-500 hover:text-blue-600 underline decoration-1"
              onClick={handleClick}
            >
              Sign up
            </span>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}

export default Login;
