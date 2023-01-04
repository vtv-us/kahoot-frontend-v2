/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import { useParams } from "react-router";
import ModalMain from "../modal/ModalMain";
import useToggleModal from "../../hooks/useToggleModal";
import { getAllQuestionByIdSlide } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";

function AlertPresent({ name = "Tile", idRoom = "", isHost }) {
  const { open, handleClickOpen, handleClose } = useToggleModal();
  const { id } = useParams("id");

  const link = `${process.env.REACT_APP_FE_ADDRESS}/slides/member/${id}/${idRoom}`;

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert
          action={
            <button
              type="submit"
              className="my-auto p-1 bg-gray-200 hover:opacity-50 rounded-md"
              onClick={() => {
                if (!isHost) window.open(link);
                else handleClickOpen();
              }}
            >
              Join now
            </button>
          }
        >
          <div className="text-green-600">
            The presentation about <strong>{name}</strong> is happening - Join now
          </div>
        </Alert>
      </Stack>
      <ModalChooseRole open={open} idRoom={idRoom} handleClose={handleClose}>
        What kind of role do you want to join?
      </ModalChooseRole>
    </>
  );
}
function ModalChooseRole({ children, open, idRoom = "", handleClose = () => {} }) {
  const { id } = useParams("id");
  const user = getCurrentUser();
  let link = `${process.env.REACT_APP_FE_ADDRESS}/slides/member/${id}/${idRoom}`;
  const getFirstQuestion = async idSlide => {
    try {
      const questions = await getAllQuestionByIdSlide(idSlide);
      const [first, ...rest] = questions;
      return first;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  const buttonList = [
    {
      id: uuid(),
      title: "Join as host",
      className: "font-bold px-8 normal-case",
      bgColor: "bg-gray-100",
      hoverColor: "bg-gray-200",
      textColor: "text-gray-800",
      onClick: async e => {
        const first = await getFirstQuestion(idRoom, user?.access_token);
        console.log("link", link);
        link = `${process.env.REACT_APP_FE_ADDRESS}/presentation/${id}/${idRoom}/${first?.id}`;
        e.stopPropagation();
        window.open(link);
        handleClose();
      },
    },
    {
      id: uuid(),
      title: "Join as member",
      className: "font-bold px-8 normal-case",
      bgColor: "bg-green-600",
      hoverColor: "bg-green-700",
      textColor: "text-white",
      onClick: e => {
        console.log("link", link);
        e.stopPropagation();
        window.open(link);
        handleClose();
      },
    },
  ];
  return (
    <ModalMain className="w-[500px]" open={open} handleClose={handleClose} buttonList={buttonList}>
      <div className="text-gray-800 text-lg text-center font-bold mt-8">{children}</div>
    </ModalMain>
  );
}
ModalChooseRole.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  idRoom: PropTypes.string.isRequired,
  children: PropTypes.node,
};

AlertPresent.propTypes = {
  name: PropTypes.string.isRequired,
  idRoom: PropTypes.string.isRequired,
  isHost: PropTypes.bool,
};

export default AlertPresent;
