/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";

function MenuItem({ children, title, className, isActive }) {
  return (
    <div
      className={`flex items-center gap-3 text-[#333] cursor-pointer ] rounded-md ${className} ${
        isActive ? "text-purple-800 bg-gray-200" : ""
      }`}
    >
      {/* <HomeOutlinedIcon className="w-8 h-8" /> */}
      {children}
      <span className="font-bold">{title}</span>
    </div>
  );
}
MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

export default MenuItem;
