import React from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import User from "../../components/user/User";
import Icon from "../../components/icon/Icon";

function GroupItem() {
  return (
    <div className="group-item flex flex-col gap-2 bg-white h-40 p-4 shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px] rounded-md">
      <div className="flex justify-between">
        <div>
          {/* <User className="bg-gray-400" /> */}
          <User className="bg-gray-400" />
        </div>
        <Icon className="hidden option-list-item">
          <MoreVertOutlinedIcon />
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
