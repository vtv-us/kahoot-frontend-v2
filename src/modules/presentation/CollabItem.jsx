/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PropTypes from "prop-types";
import Account from "../../components/user/Account";

function CollabItem({ handleOpenDelete = () => {} }) {
  return (
    <tr>
      <td>
        <Account username="Nguyễn Trần Ngọc Tú" avatar_url="" type="collaborator" />
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
};

export default CollabItem;
