/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import { useNavigate, useParams } from "react-router";
import PropTypes from "prop-types";
import SlideMenuItem from "./SlideMenuItem";

function SlideListMenu({ data, setList = () => {} }) {
  const { idSlide, idQuestion } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col max-h-[600px] overflow-auto border-r bg-white border-gray-200">
      {data.length > 0 &&
        data.map((item, index) => (
          <SlideMenuItem
            key={item.id}
            id={item.id}
            isActive={idQuestion === item.id}
            title={item?.raw_question}
            index={index + 1}
            setList={setList}
            onClick={() => {
              navigate(`/presentation/${idSlide}/${item.id}/edit`);
            }}
          />
        ))}
    </div>
  );
}
SlideListMenu.propTypes = {
  data: PropTypes.array,
  setList: PropTypes.func,
};

export default SlideListMenu;
