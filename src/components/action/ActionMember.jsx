import { Button } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DropdownMenu from "../dropdown/DropdownMenu";
import ModalUserInfo from "../modal/ModalUserInfo";
import useToggleModal from "../../hooks/useToggleModal";

function ActionMember({ isPending = false }) {
  const { open, handleClickOpen, handleClose } = useToggleModal();

  const optionGroupManage = [
    {
      icon: <InfoOutlinedIcon />,
      title: "Member info",
      onClick: () => handleClickOpen(),
    },
    {
      icon: <PersonOutlineOutlinedIcon />,
      title: "View profile",
      onClick: () => {},
    },
    {
      icon: <PersonRemoveAlt1OutlinedIcon />,
      title: "Remove",
      onClick: () => {},
    },
  ];
  return (
    <div className="flex items-center justify-end">
      {isPending && (
        <Button variant="contained" className="bg-blue-600 normal-case font-semibold">
          Resend
        </Button>
      )}
      <Button onClick={handleClickOpen} className="hover:bg-white">
        <InfoOutlinedIcon className="cursor-pointer" />
      </Button>
      <DropdownMenu data={optionGroupManage}>
        <MoreVertOutlinedIcon />
      </DropdownMenu>
      <ModalUserInfo open={open} handleClose={handleClose} />
    </div>
  );
}
ActionMember.propTypes = {
  // eslint-disable-next-line react/require-default-props
  isPending: PropTypes.bool,
};

export default ActionMember;
