/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import Table from "../../components/table/Table";
import ResutVotingItem from "./ResutVotingItem";

function ModalResultAnswerList({ handleClose, resultList = [] }) {
  return (
    <div className="absolute w-full left-0  top-0 bottom-0  flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-10">
      <div className="relative bg-white flex rounded-lg w-[80%] h-[70%] ">
        <div
          className="p-2 rounded-full absolute top-4 right-4 cursor-pointer hover:bg-gray-100 z-10"
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </div>
        <div className="absolute top-8 w-full p-10 pt-0">
          <h2 className="font-bold text-center text-xl mb-4">Voting Result </h2>
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Time</th>
                <th> </th>
              </tr>
            </thead>
            <tbody className="">
              {resultList.length > 0 &&
                resultList.map((item, index) => <ResutVotingItem key={uuid()} index={index + 1} data={item} />)}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
ModalResultAnswerList.propTypes = {
  handleClose: PropTypes.func,
  resultList: PropTypes.array,
};

export default ModalResultAnswerList;
