import * as React from "react";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import User from "../user/User";
import ModalMain from "./ModalMain";

export default function ModalUserInfo({ open, handleClose = () => {} }) {
  const buttonList = [
    {
      id: uuid(),
      title: "Close",
      className: "font-semibold mx-auto mb-4",
      bgColor: "bg-gray-100",
      hoverColor: "bg-gray-200",
      textColor: "text-gray-800",
      onClick: handleClose,
    },
  ];
  return (
    <ModalMain open={open} handleClose={handleClose} title="Member info" buttonList={buttonList}>
      <div className="flex flex-col gap-4">
        <User className="bg-green-600 w-fit" />
        <table>
          <thead>
            <th className="w-[100px]"> </th>
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
    </ModalMain>
  );
}
ModalUserInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
