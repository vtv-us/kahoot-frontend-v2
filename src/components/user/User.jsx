/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { PropTypes } from "prop-types";

function User({ className, onClick = () => {} }) {
  return (
    <div className={`${className} user-header p-1 rounded-full cursor-pointer`} onClick={onClick}>
      <PersonIcon className="w-6 h-6 " />
    </div>
  );
}
User.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default User;
