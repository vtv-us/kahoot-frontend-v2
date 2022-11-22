/* eslint-disable react/no-array-index-key */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import ButtonMain from "../button/ButtonMain";

export default function ModalMain({ open, children, handleClose, title = "", buttonList = [] }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="font-bold">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
        </DialogContent>
        <DialogActions className="mx-auto pb-8">
          {buttonList.length > 0 &&
            buttonList.map(item => (
              <ButtonMain
                key={item.id}
                textColor={item.textColor}
                hoverColor={item.hoverColor}
                bgColor={item.bgColor}
                className={item.className || ""}
                onClick={item.onClick}
              >
                {item.title}
              </ButtonMain>
            ))}
        </DialogActions>
      </Dialog>
    </div>
  );
}
ModalMain.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  buttonList: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
};
