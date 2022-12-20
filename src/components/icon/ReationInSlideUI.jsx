/* eslint-disable react/require-default-props */
import React from "react";

import PropTypes from "prop-types";

function ReationInSlideUI({ children, quantity = 0, isChecked = false }) {
  return (
    <div className={`p-2 bg-gray-200 rounded-full relative text-gray-600 ${!isChecked && "hidden"}`}>
      {children}
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-1 bg-blue-600 rounded-md text-white text-sm">
        {quantity}
      </div>
    </div>
  );
}
ReationInSlideUI.propTypes = {
  children: PropTypes.node.isRequired,
  quantity: PropTypes.number,
  isChecked: PropTypes.bool,
};

export default ReationInSlideUI;
