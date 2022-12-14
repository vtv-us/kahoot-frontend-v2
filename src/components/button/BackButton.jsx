/* eslint-disable react/require-default-props */
import { Button } from "@mui/material";
import React from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

function BackButton({ to = "/", onClick = () => {} }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      className="w-6 bg-white hover:bg-gray-100"
      onClick={() => {
        onClick();
        navigate(to);
      }}
    >
      <KeyboardBackspaceOutlinedIcon className="text-black" />
    </Button>
  );
}
BackButton.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default BackButton;
