/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import PropTypes from "prop-types";
import useClickOutside from "../../hooks/useClickOutSide";

// eslint-disable-next-line no-unused-vars
function Dropdown({ data }) {
  const { show, setShow, nodeRef } = useClickOutside();
  return (
    <div className="relative w-full max-w-[400px]" ref={nodeRef}>
      <div className="cursor-pointer" onClick={() => setShow(!show)}>
        <MoreVertOutlinedIcon />
      </div>
      {show && (
        <div className=" p-3 rounded-lg absolute top-full w-[175px] bg-white right-[-15px] shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px]">
          {data.length > 0 &&
            data.map((item, index) => (
              <div
                key={index}
                className="px-1 py-2 hover:bg-gray-200 cursor-pointer rounded-md text-black"
                onClick={item.onClick}
              >
                {item.icon} <span className="text-sm">{item.title}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
Dropdown.propTypes = {
  data: PropTypes.array,
};

export default Dropdown;
