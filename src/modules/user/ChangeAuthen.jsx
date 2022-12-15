/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

function ChangeAuthen({ title = "", page = "", to = "/login" }) {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-4">
      {title}
      <span
        role="button"
        tabIndex={0}
        onKeyDown={() => navigate(to)}
        className="cursor-pointer text-blue-500 hover:text-blue-600 underline decoration-1"
        onClick={() => navigate(to)}
      >
        {page}
      </span>
    </div>
  );
}

ChangeAuthen.propTypes = {
  title: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  to: PropTypes.string,
};

export default ChangeAuthen;
