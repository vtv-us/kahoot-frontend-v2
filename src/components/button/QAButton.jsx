/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import ForumIcon from "@mui/icons-material/Forum";

function QAButton({ handleClickOpen }) {
  return (
    <div className="mx-auto w-full mt-4 flex justify-center">
      <div
        className="px-4 py-2 bg-gray-200 font-bold w-full text-center cursor-pointer hover:bg-gray-300"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <ForumIcon /> Open Q&A
      </div>
    </div>
  );
}
QAButton.propTypes = {
  handleClickOpen: PropTypes.func.isRequired,
};

export default QAButton;
