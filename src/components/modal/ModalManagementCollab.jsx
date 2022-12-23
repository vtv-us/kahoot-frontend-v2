/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";

import Account from "../user/Account";
import ModalMain from "./ModalMain";
import Table from "../table/Table";
import CollabItem from "../../modules/presentation/CollabItem";
import ModalDelete from "./ModalDelete";
import useToggleModal from "../../hooks/useToggleModal";

function ModalManagementCollab({ children, open, handleClose = () => {} }) {
  const [filter, setFilter] = useState("");
  const { open: openDelete, handleClickOpen: handleOpenDelete, handleClose: handleCloseDelete } = useToggleModal();
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
  ];
  const handleDelete = () => {
    console.log("Deleted");
    // todo
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(filter);
    // todo
  };
  return (
    <>
      <ModalMain
        className="w-[720px]"
        title="Manage Collaborators"
        open={open}
        handleClose={handleClose}
        buttonList={buttonList}
        maxWidth="720px"
      >
        <form onSubmit={handleSubmit} className="my-4">
          <div className="">
            <input
              type="email"
              className="border border-gray-200 rounded-md px-3 py-2 outline-gray-400 w-96 mr-2"
              placeholder="Enter an email address..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <button className="py-2 px-4 bg-slate-300 text-black rounded-md hover:opacity-70" type="submit">
              Assign
            </button>
          </div>
          <p className="ml-2 text-sm text-red-500 mt-1">Email is not existing on the website.</p>
        </form>
        <Table>
          <thead>
            <tr>
              <th>
                <div className="text-center font-bold">Name</div>
              </th>
              <th>
                <div className="text-center font-bold">Action</div>
              </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <CollabItem handleOpenDelete={handleOpenDelete} />
            <CollabItem handleOpenDelete={handleOpenDelete} />
            <CollabItem handleOpenDelete={handleOpenDelete} />
          </tbody>
        </Table>
      </ModalMain>
      <ModalDelete
        open={openDelete}
        handleDelete={handleDelete}
        handleClose={() => {
          handleCloseDelete();
        }}
      >
        Are you sure to delete this collaborator
      </ModalDelete>
    </>
  );
}
ModalManagementCollab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ModalManagementCollab;
