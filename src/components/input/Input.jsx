/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { LIMIT_NAME } from "../../utils/constants";

const InputStyles = styled.div`
  position: relative;
  width: 400px;
  input {
    width: 100%;
    padding: 10px;
    background-color: ${props => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2 linear;
    border: 1px solid transparent;
  }
  input:focus {
    background-color: #fff;
    border: 1px solid ${props => props.theme.primary};
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
`;
const Input = ({ name = "", type = "text", ...props }) => {
  const [countdown, setCountdown] = useState(LIMIT_NAME);
  const [filter, setFilter] = React.useState("");
  const handleChange = e => {
    const { length } = e.target.value;
    if (length < LIMIT_NAME) {
      setFilter(e.target.value);
    }
    setCountdown(LIMIT_NAME - length);
  };

  return (
    <InputStyles>
      <label className="font-semibold text-gray-800" htmlFor={name}>
        Name
      </label>
      <input
        className="!border !border-gray-500 outline-purple-400"
        id={name}
        type={type}
        {...props}
        onChange={handleChange}
        value={filter}
      />
      <div className="absolute right-5 top-9">{countdown}</div>
      {/* {children} */}
      <div className={`${filter.length <= 2 ? "" : "hidden"} text-red-500 text-sm`}>
        Group name must be at least 3 characters
      </div>
    </InputStyles>
  );
};
Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.any,
};

export default Input;
