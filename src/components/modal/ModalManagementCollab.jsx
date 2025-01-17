/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../utils/constants";

import Account from "../user/Account";
import ModalMain from "./ModalMain";
import Table from "../table/Table";
import CollabItem from "../../modules/presentation/CollabItem";
import ModalDelete from "./ModalDelete";
import useToggleModal from "../../hooks/useToggleModal";
import {
  addCollaboratorByUserId,
  getCollaboratorsByIdSlide,
  getUserByEmail,
  removeCollaboratorByUserId,
} from "../../handleApi";

function ModalManagementCollab({ children, open, handleClose = () => {} }) {
  const [filter, setFilter] = useState("");
  const { open: openDelete, handleClickOpen: handleOpenDelete, handleClose: handleCloseDelete } = useToggleModal();
  const [collaborators, setCollaborators] = useState([]);
  const [userSelected, setUserSelected] = useState({});
  const [error, setError] = useState("");
  const { idSlide } = useParams();
  const user = getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCollaboratorsByIdSlide(idSlide, user?.access_token);
      setCollaborators(res);
    };
    fetchData();
  }, []);

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
  const handleDelete = async () => {
    const data = { user_id: userSelected?.user_id, slide_id: idSlide };
    const res = await removeCollaboratorByUserId(data, user?.access_token);
    if (!res) toast.error("Remove failed");
    else {
      setCollaborators(await getCollaboratorsByIdSlide(idSlide, user?.access_token));
    }
    // todo
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await getUserByEmail(filter);
    if (!res) {
      setError("Email is not existing on the website.");
    } else {
      const data = {
        slide_id: idSlide,
        user_id: res?.user_id,
      };
      const resAdd = await addCollaboratorByUserId(data, user?.access_token);
      if (!resAdd) toast.error("Add collaborator failed");
      else {
        setError("");
        setCollaborators(await getCollaboratorsByIdSlide(idSlide, user?.access_token));
      }
    }
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
          {error && <p className="ml-2 text-sm text-red-500 mt-1">{error}</p>}
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
            {collaborators.length > 0 ? (
              collaborators.map(item => (
                <CollabItem
                  key={item?.user_id}
                  handleOpenDelete={() => {
                    handleOpenDelete();
                    setUserSelected(item);
                  }}
                  user={item}
                />
              ))
            ) : (
              <div className="mx-4 py-4 w-full italic">There is not any collaborator</div>
            )}
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
        Are you sure to remove <strong>{userSelected?.name}</strong>
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
