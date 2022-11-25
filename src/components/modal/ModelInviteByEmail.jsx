import * as React from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import Input from "../input/Input";
import ModalMain from "./ModalMain";

export default function ModalInviteByEmail({ open, handleClose }) {
  const buttonList = [
    {
      id: uuid(),
      title: "Cancle",
      onClick: handleClose,
      className: "font-bold px-8 normal-case",
      bgColor: "bg-gray-100",
      hoverColor: "bg-gray-200",
      textColor: "text-gray-800",
    },
    {
      id: uuid(),
      title: "Agree",
      onClick: handleClose,
      className: "font-bold px-8 normal-case",
      bgColor: "bg-green-700",
      hoverColor: "bg-green-800",
      textColor: "text-white",
    },
  ];
  return (
    <ModalMain open={open} handleClose={handleClose} title="Invite by email address" buttonList={buttonList}>
      <Input name="email" label="Email address" type="email" limit={50} />
    </ModalMain>
  );
}
ModalInviteByEmail.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};