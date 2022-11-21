/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import InviteLinkInput from "../input/InviteLinkInput";
import ModalMain from "./ModalMain";

export default function ModalInvite({ handleClose = () => {}, open = false }) {
  const buttonList = [
    {
      id: uuid(),
      title: "Close",
      className: "bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold mx-auto mb-4",
      onClick: handleClose,
    },
  ];
  return (
    <ModalMain open={open} handleClose={handleClose} title="Invite link" buttonList={buttonList}>
      <InviteLinkInput></InviteLinkInput>
    </ModalMain>
  );
}
ModalInvite.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
