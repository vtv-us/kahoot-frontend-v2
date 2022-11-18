import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Input from "../input/Input";

export default function ModalInviteByEmail({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="font-bold">
          Invite by email address
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Input name="email" label="Email address" type="email" limit={50} />
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mx-auto pb-8">
          <Button className="bg-gray-200 text-black font-bold hover:bg-gray-300 px-8 normal-case" onClick={handleClose}>
            Cancle
          </Button>
          <Button
            className="bg-green-700 hover:bg-green-800 text-white font-bold px-8 normal-case"
            onClick={handleClose}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
ModalInviteByEmail.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
