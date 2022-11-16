import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const maxLength = 40;
const minLength = 5;
const schemaValidation = yup.object({
  username: yup
    .string()
    .required("Please enter your username")
    .min(minLength, `Your username must contain from ${minLength}-${maxLength} characters`)
    .max(maxLength, `Your username must contain from ${minLength}-${maxLength} characters`),
  email: yup.string().required("Please enter your email").email("This email is invalid"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, one uppercase, one lowercase, one number"
    ),
});
function Signup() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation) });
  const onSubmit = formValues => {
    // TO DO
    console.log(formValues);
  };
  useEffect(() => {
    document.title = "Sign Up";
  }, []);
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
  return (
    <div className="w-[420px] mx-auto">
      <h1 className="text-center text-3xl font-bold my-6">Create an account</h1>
      <Grid>
        <Paper className="w-[420px] bg-white py-7 px-5 mx-auto">
          <h2 className="text-center mb-5 text-xl font-bold">Sign up with your email</h2>
          <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Username"
              placeholder="Enter your username"
              id="username"
              error={errors?.username != null}
              helperText={errors?.username && errors.username.message}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("username")}
            />
            <TextField
              fullWidth
              label="Email Address"
              id="email"
              placeholder="Enter your email address"
              type="email"
              error={errors?.email != null}
              helperText={errors?.email && errors.email.message}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("email")}
            />
            {/* {errors?.email && <div className="text-red-500">{errors.email.message}</div>} */}
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" error={errors?.password != null}>
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register("password")}
                name="password"
                onChange={handleChange("password")}
                error={errors?.password != null}
                // helperText={errors?.password && errors.password.message}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors?.password && (
                <FormHelperText error id="username-error">
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            {/* <TextField
              fullWidth
              label="Confirm Password"
              placeholder="Enter your confirm password"
              type="password"
            ></TextField> */}
            <Button
              type="submit"
              variant="contained"
              className="bg-green-600 text-white hover:bg-green-700 py-3 text-lg"
            >
              Sign up
            </Button>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="I wish to receive information, offers, recommendations, and updates from Kahoot!"
                classes={{ root: "custom-checkbox-label" }}
              />
            </FormGroup>
          </form>
          <div className="w-full float-left border-t-[1px] mt-4 text-center ">
            <b className="w-10 h-10 text-sm text-center bg-white inline-block  rounded-full leading-10 relative -top-5">
              or
            </b>
          </div>
          <Button variant="outlined" className="w-full relative py-2">
            <img src="/google.svg" alt="" className="absolute left-1" />
            Continue with Google
          </Button>

          <div className="text-center mt-4">
            Already have an account?{" "}
            <span
              role="button"
              tabIndex={0}
              onKeyDown={() => navigate("/login")}
              className="cursor-pointer text-blue-500 hover:text-blue-600 underline decoration-1"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}

export default Signup;
