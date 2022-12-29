/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PropTypes from "prop-types";
import Account from "../../components/user/Account";

function CollabItem({ handleOpenDelete = () => {}, user = {} }) {
  return (
    <tr>
      <td>
        <Account username={user?.name} avatar_url={user?.avatar_url} type="collaborator" isCurrent />
      </td>
      <td>
        <div className="text-center" onClick={handleOpenDelete}>
          <DeleteOutlineOutlinedIcon fontSize="large" className="cursor-pointer" />
        </div>
      </td>
    </tr>
  );
}
CollabItem.propTypes = {
  handleOpenDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default CollabItem;
