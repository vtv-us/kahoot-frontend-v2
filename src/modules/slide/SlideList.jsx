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
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router";
import Icon from "../../components/icon/Icon";
import DropdownMenu from "../../components/dropdown/DropdownMenu";
import useHover from "../../hooks/useHover";

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
          onEditSlide={() => {
            navigate(`/presentation/${item.id}/edit`);
          }}
          onShowSlide={() => {
            // show slide
          }}
        />
      ))}
      {/* <ListItem checked={!!isSelectedAll} onShowSlide={onShowSlide} />
      <ListItem checked={!!isSelectedAll} onShowSlide={onShowSlide} />
      <ListItem checked={!!isSelectedAll} onShowSlide={onShowSlide} />
      <ListItem checked={!!isSelectedAll} onShowSlide={onShowSlide} />
      <ListItem checked={!!isSelectedAll} onShowSlide={onShowSlide} /> */}
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

function ListItem({ title, checked, onShowSlide, onEditSlide }) {
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
  return (
    <div className="w-full py-4 flex items-center hover:bg-gray-200">
      <Checkbox checked={checked} />
      <div ref={ref}>
        <PlayButton
          onClick={onShowSlide}
          color={`${hovered ? "primary" : "action"}`}
          className="ml-4 mr-4 cursor-pointer"
        />
      </div>
      <div className="flex-1">
        <h2 className="font-bold cursor-pointer" onClick={onEditSlide}>
          {title}
        </h2>
        <h3 className="font-light text-sm text-gray-400">3 SLIDES</h3>
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
  onEditSlide: PropTypes.func,
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
