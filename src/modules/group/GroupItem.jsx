/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from "react";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import User from "../../components/user/User";
import Icon from "../../components/icon/Icon";
import DropdownMenu from "../../components/dropdown/DropdownMenu";

const option = [
  {
    icon: <OpenInNewOutlinedIcon />,
    title: "Home",
    onClick: () => {},
  },
  {
    icon: <PersonAddAltOutlinedIcon />,
    title: "Invite members",
    onClick: () => {},
  },
  {
    icon: <DeleteOutlinedIcon />,
    title: "Delete",
    onClick: () => {},
  },
];

function GroupItem() {
  return (
    <div className="group-item flex flex-col gap-2 bg-white h-40 p-4 shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px] rounded-md">
      <div className="flex justify-between">
        <div>
          {/* <User className="bg-gray-400" /> */}
          <User className="bg-gray-400" />
        </div>
        <Icon className="hidden option-list-item relative">
          <DropdownMenu data={option} />
        </Icon>
      </div>
      <div className="text-sm group-desc">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing
        elit
      </div>
      <div className="flex-1 flex items-end font-semibold text-gray-800">MUN</div>
    </div>
  );
}

export default GroupItem;
