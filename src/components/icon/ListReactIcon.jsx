/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import MessageIcon from "@mui/icons-material/Message";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

import IconReactQuestion from "./IconReactQuestion";

function ListReactIcon({ handleClick }) {
  return (
    <div className="flex gap-4">
      <IconReactQuestion onClick={() => handleClick(0)}>
        <ContactSupportIcon />
      </IconReactQuestion>
      <IconReactQuestion onClick={() => handleClick(1)}>
        <MessageIcon />
      </IconReactQuestion>
      <IconReactQuestion onClick={() => handleClick(2)}>
        <MessageIcon />
      </IconReactQuestion>
    </div>
  );
}
ListReactIcon.propTypes = {
  handleClick: PropTypes.func,
};

export default ListReactIcon;
