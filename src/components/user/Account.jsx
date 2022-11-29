/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import User from "./User";

function Account({ username = "", type = "", className = "bg-green-600" }) {
  return (
    <div className="flex gap-2 items-center">
      <User className={`${className}`} />
      <span>{username}</span>
      <span className="text-sm bg-gray-100 text-gray-700 px-2 py-2/4 rounded-sm">{type}</span>
    </div>
  );
}
Account.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Account;
