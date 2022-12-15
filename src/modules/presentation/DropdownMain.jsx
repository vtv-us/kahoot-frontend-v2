/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import PropTypes from "prop-types";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ReactDOM from "react-dom";
import useClickOutside from "../../hooks/useClickOutSide";

function DropdownMain({ selectedValue, listItem, handleOnSelect }) {
  const { show, setShow, nodeRef } = useClickOutside();
  const [coords, setCoords] = useState({});
  // const [selectedValue, setSelectedValue] = useState(null);
  const handleClick = e => {
    setCoords(nodeRef.current.getBoundingClientRect());
    setShow(!show);
  };
  const selectedItem = listItem.find(e => e.value === selectedValue);
  // const listItem = [
  //   { value: 1, label: "Java" },
  //   { value: 2, label: "Javascript" },
  //   { value: 3, label: "Flutter" },
  // ];
  return (
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-md font-semibold mb-2">Slide type</h3>
      <div className="w-full relative" ref={nodeRef}>
        <div
          className="text-gray-700 border border-gray-200 p-2 rounded-sm flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <div className="">
            {selectedItem.icon} {selectedItem.label}
          </div>
          <KeyboardArrowDownIcon />
        </div>
        {show && (
          <DropdownList
            selectedValue={selectedValue}
            coords={coords}
            listItem={listItem}
            handleOnSelect={handleOnSelect}
          />
        )}
      </div>
    </div>
  );
}
DropdownMain.propTypes = {
  selectedValue: PropTypes.number,
  listItem: PropTypes.array,
  handleOnSelect: PropTypes.func,
};

function DropdownList({ selectedValue, coords, listItem = [], handleOnSelect = value => {} }) {
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(
    <div
      className="border border-gray-200 rounded-sm absolute top-full left-0 w-full bg-white"
      style={{ left: coords.left, top: coords.top + coords.height, width: coords.width }}
    >
      {listItem.map(e => (
        <div
          value={e.value}
          className={`${
            selectedValue === e.value ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
          } flex justify-between p-3 cursor-pointer `}
          onClick={() => {
            handleOnSelect(e.value);
          }}
        >
          <div>
            {e.icon} {e.label}
          </div>
          <div>{selectedValue === e.value && <CheckIcon />}</div>
        </div>
      ))}
      {/* <div value="1" className="p-3 cursor-pointer hover:bg-gray-300">
        Javascript
      </div>
      <div value="2" className="p-3 cursor-pointer hover:bg-gray-300">
        Javascript
      </div>
      <div value="3" className="p-3 cursor-pointer hover:bg-gray-300">
        Javascript
      </div> */}
    </div>,
    document.querySelector("body")
  );
}
DropdownList.propTypes = {
  selectedValue: PropTypes.number,
  coords: PropTypes.object,
  listItem: PropTypes.array,
  handleOnSelect: PropTypes.func,
};

export default DropdownMain;
