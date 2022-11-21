import * as React from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import Input from "../input/Input";
import ModalMain from "./ModalMain";

export default function ModalCreateGroup({ open, handleClose }) {
  const buttonList = [
    {
      id: uuid(),
      title: "Cancle",
      onClick: handleClose,
      className: "bg-gray-200 text-black font-bold hover:bg-gray-300 px-8 normal-case",
    },
    {
      id: uuid(),
      title: "Agree",
      onClick: handleClose,
      className: "bg-green-700 hover:bg-green-800 text-white font-bold px-8 normal-case",
    },
  ];
  return (
    <ModalMain open={open} handleClose={handleClose} title="Create group" buttonList={buttonList}>
      <Input name="name" label="Name" />
    </ModalMain>
  );
}
ModalCreateGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
