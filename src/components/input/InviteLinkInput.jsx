/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";
import ButtonMain from "../button/ButtonMain";
import ModalInviteByEmail from "../modal/ModelInviteByEmail";
import useToggleModal from "../../hooks/useToggleModal";
import { getCurrentUser } from "../../utils/constants";

const getLink = async (idGroup, accessToken) => {
  try {
    console.log(accessToken);
    const res = await axios.get(`/group/link/${idGroup}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("link ne", res.data.group_link);
    return `${res.data.group_link}`;
  } catch (error) {
    console.error(error);
  }
  return null;
};
function InviteLinkInput({ idGroup }) {
  const user = getCurrentUser();
  console.log("link", getLink(idGroup, user.access_token));
  const [link, setLink] = useState(getLink(idGroup, user.access_token));
  const [copied, setCopied] = useState(false);
  const { open, handleClickOpen, handleClose } = useToggleModal();

  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, []);

  return (
    <div className="">
      <div className="flex gap-2">
        <input
          id="invite "
          type="text"
          value={link}
          className="border border-gray-200 outline-purple-400 p-2 rounded-md w-[300px]"
          disabled
        />
        <CopyToClipboard onCopy={onCopy} text={link}>
          {copied === true ? (
            <ButtonMain className="bg-green-700 hover:bg-green-800">Copied</ButtonMain>
          ) : (
            <ButtonMain>Copy</ButtonMain>
          )}
        </CopyToClipboard>
      </div>
      <button type="submit" className="text-blue-500 text-center w-full mt-4" onClick={handleClickOpen}>
        <EmailOutlinedIcon /> <span>Invite via email</span>
      </button>
      <ModalInviteByEmail handleClose={handleClose} open={open} />
    </div>
  );
}
InviteLinkInput.propTypes = {
  idGroup: PropTypes.string.isRequired,
};

export default InviteLinkInput;
