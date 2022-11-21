/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

function ButtonMain({ children, className = "", onClick = () => {}, ...props }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      className={`bg-blue-700 font-semibold hover:bg-blue-800 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
ButtonMain.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  props: PropTypes.any,
};

export default ButtonMain;
