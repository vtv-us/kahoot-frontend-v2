/* eslint-disable react/require-default-props */
import React from "react";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import ModalMain from "./ModalMain";

function ModalShareToGroup({ children, open, handleClose = () => {}, choosed = [] }) {
  const buttonList = [
    {
      id: uuid(),
      title: "Close",
      className: "font-bold px-8 normal-case",
      bgColor: "bg-gray-100",
      hoverColor: "bg-gray-200",
      textColor: "text-gray-800",
      onClick: handleClose,
    },
    {
      id: uuid(),
      title: "Share",
      className: "font-bold px-8 normal-case",
      bgColor: "bg-blue-600",
      hoverColor: "!bg-red-600",
      textColor: "text-white",
      onClick: e => {
        // todo
        e.stopPropagation();
        console.log("choosed", choosed);
        handleClose();
      },
    },
  ];
  return (
    <ModalMain
      className="w-[480px]"
      title="Choose a group"
      open={open}
      handleClose={handleClose}
      buttonList={buttonList}
    >
      <div className="text-gray-800 text-lg text-center ">{children}</div>
    </ModalMain>
  );
}
ModalShareToGroup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  choosed: PropTypes.array.isRequired,
};
export default ModalShareToGroup;
