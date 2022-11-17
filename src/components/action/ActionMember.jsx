import { Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import React from "react";
import PropTypes from "prop-types";
import ModalUserInfo from "../modal/ModalUserInfo";

function ActionMember({ isPending = false }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      <MoreVertOutlinedIcon className="cursor-pointer" />
      <ModalUserInfo open={open} handleClose={handleClose} />
    </div>
  );
}
ActionMember.propTypes = {
  // eslint-disable-next-line react/require-default-props
  isPending: PropTypes.bool,
};

export default ActionMember;
