/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import HeaderPresentation from "./HeaderPresentation";

function LayoutPresentation({ children, socket }) {
  return (
    <>
      <HeaderPresentation socket={socket} />
      {children}
    </>
  );
}

LayoutPresentation.propTypes = {
  children: PropTypes.node.isRequired,
  socket: PropTypes.any,
};

export default LayoutPresentation;
