/* eslint-disable react/require-default-props */
import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

function ButtonMain({ children, className = "", onClick = () => {} }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      className={`bg-blue-700 font-semibold hover:bg-blue-800 ${className}`}
    >
      {children}
    </Button>
  );
}
ButtonMain.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonMain;
