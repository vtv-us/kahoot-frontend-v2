/* eslint-disable react/require-default-props */
import React, { useContext } from "react";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router";
import ModalMain from "./ModalMain";
import { SocketContext } from "../../contexts/socketContext";
import { getCurrentUser } from "../../utils/constants";

function ModalShareToGroup({ children, open, handleClose = () => {}, choosed = [] }) {
  const socket = useContext(SocketContext);
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { idSlide, idQuestion } = useParams();
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
      onClick:
        choosed.length > 0
          ? e => {
              // todo
              e.stopPropagation();
              socket.emit("cancelPresentation", choosed[0], user?.access_token);
              socket.emit("manualDisconnect");
              // socket.emit("host", user?.user?.user_id, idSlide, true, choosed[0], user.access_token);
              navigate(`/presentation/${choosed[0]}/${idSlide}/${idQuestion}`);
              handleClose();
            }
          : null,
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
