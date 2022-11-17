import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import User from "../user/User";

export default function ModalUserInfo({ open, handleClose = () => {} }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="p-4"
      >
        <DialogTitle id="alert-dialog-title" className="text-2xl font-bold text-gray-700">
          Member info
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="flex flex-col gap-4">
              <User className="bg-green-600 w-fit" />
              <table>
                <thead>
                  <th> </th>
                  <th> </th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>Username: </b>
                    </td>
                    <td>ngoctu280801</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Email:</b>
                    </td>
                    <td>ngoctu280801@gmail.com</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Role:</b>
                    </td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Status:</b>
                    </td>
                    <td>Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold mx-auto mb-4"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
ModalUserInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
