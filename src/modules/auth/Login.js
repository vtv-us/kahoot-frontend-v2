import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
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

const Login = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  useEffect(() => {
    document.title = 'Log In';
  }, []);
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  return (
    <div className="w-[420px] mx-auto mt-10">
      <Grid>
        <Paper className="w-[420px] bg-white py-7 px-5 mx-auto">
          <h2 className="text-center mb-5 text-xl font-bold">Log in</h2>
          <form action="" className="flex flex-col gap-4">
            <TextField
              fullWidth
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
            ></TextField>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
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
            </FormControl>

            <Button
              variant="contained"
              className="bg-green-600 text-white hover:bg-green-700 py-3 text-lg"
            >
              Sign up
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
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-blue-500 hover:text-blue-600 underline decoration-1"
              onClick={() => navigate("/")}
            >
              Sign up
            </span>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
