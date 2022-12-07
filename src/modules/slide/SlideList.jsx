/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */

import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";
import { PlayCircleFilled } from "@mui/icons-material";
import { useEffect, React, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import axios from "axios";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router";
import Icon from "../../components/icon/Icon";
import DropdownMenu from "../../components/dropdown/DropdownMenu";
import useHover from "../../hooks/useHover";
import { getAllQuestionByIdSlide } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";

function SlideList({ onSelectAll = value => {}, listItem }) {
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const handleOnSelectAll = value => {
    setIsSelectedAll(value);
    onSelectAll(value);
  };
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      <ListHeader onSelectAll={handleOnSelectAll} />
      {listItem.map(item => (
        <ListItem
          key={item.id}
          title={item.title}
          checked={!!isSelectedAll}
          idSlide={item.id}
          onShowSlide={() => {
            // show slide
          }}
        />
      ))}
    </div>
  );
}
SlideList.propTypes = {
  onSelectAll: PropTypes.func,
  listItem: PropTypes.array,
};

function ListHeader({ onSelectAll = value => {} }) {
  const handleOnChange = e => {
    onSelectAll(e.target.checked);
  };
  return (
    <div className="flex items-center justify-start border-b-2 border-gray-300">
      <Checkbox onChange={handleOnChange} />
      <div className="font-bold flex-1">Name</div>
      <div className="font-bold w-[244px]">Owner</div>
      <div className="font-bold w-[244px]">Modified</div>
      <div className="font-bold w-[244px]">Created</div>
      <div className="w-10" />
    </div>
  );
}
ListHeader.propTypes = {
  onSelectAll: PropTypes.func,
};

function ListItem({ title, checked, onShowSlide, idSlide }) {
  const optionGroupMenu = [
    {
      icon: <OpenInNewOutlinedIcon />,
      title: "Open",
      onClick: () => {},
    },
    {
      icon: <PersonAddAltOutlinedIcon />,
      title: "Invite members",
      onClick: e => {
        // handleClickOpen();
      },
    },
    {
      icon: <DeleteOutlinedIcon />,
      title: "Delete",
      onClick: () => {},
    },
  ];
  const [ref, hovered] = useHover();
  const [questionList, setQuestionList] = useState({});
  const navigate = useNavigate();
  const user = getCurrentUser();

  const getFirstQuestion = async (id, accessToken) => {
    try {
      const questions = await getAllQuestionByIdSlide(id, accessToken);
      const [first, ...rest] = questions;
      return first;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  useEffect(() => {
    getAllQuestionByIdSlide(idSlide, user?.access_token).then(res => setQuestionList(res));
  }, []);

  return (
    <div className="w-full py-4 group-item flex items-center hover:bg-gray-200">
      <Checkbox checked={checked} />
      <div ref={ref}>
        <PlayButton
          onClick={onShowSlide}
          color={`${hovered ? "primary" : "action"}`}
          className="ml-4 mr-4 cursor-pointer"
        />
      </div>
      <div className="flex-1">
        <h2
          className="font-bold cursor-pointer"
          onClick={async () => {
            const first = await getFirstQuestion(idSlide, user?.access_token);
            navigate(`/presentation/${idSlide}/${first.id}/edit`);
          }}
        >
          {title}
        </h2>
        <h3 className="font-light text-sm text-gray-400">{questionList.length || 0} SLIDES</h3>
      </div>
      <div className="text-gray-400 w-[244px]">me</div>
      <div className="text-gray-400 w-[244px]">about 19 hours ago</div>
      <div className="text-gray-400 w-[244px]">about 19 hours ago</div>
      <Icon onClick={e => e.stopPropagation()} className="hidden option-list-item relative">
        <DropdownMenu data={optionGroupMenu}>
          <MoreHorizIcon className="mr-4" />
        </DropdownMenu>
      </Icon>
    </div>
  );
}
ListItem.propTypes = {
  title: PropTypes.string,
  checked: PropTypes.bool,
  onShowSlide: PropTypes.func,
  idSlide: PropTypes.string,
};

function PlayButton({ onClick, className, ...props }) {
  const { hoverRef, isHovered } = useHover();
  return (
    <PlayCircleFilled
      ref={hoverRef}
      color={`${isHovered ? "primary" : "disabled"}`}
      onClick={onClick}
      className={className}
      {...props}
    />
  );
}
PlayButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  props: PropTypes.any,
};

export default SlideList;
