import React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useSearchParams } from "react-router-dom";
import MenuItem from "./MenuItem";
import RecentGroup from "./RecentGroup";

function GroupBar() {
  const [params] = useSearchParams();
  console.log("params", params);
  const role = params.get("id");
  console.log("role: ", role);
  return (
    <div className="h-screen shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px]">
      <div className="w-full max-w-[224px] bg-white  px-2 py-8 border border-b-2">
        <MenuItem title="Groups I manage" className="p-2 hover:bg-gray-200" isActive>
          <PeopleAltOutlinedIcon />
        </MenuItem>
        <MenuItem title="Groups I've joined" className="p-2 hover:bg-gray-200">
          <PersonOutlineOutlinedIcon />
        </MenuItem>
      </div>

      <RecentGroup />
    </div>
  );
}

export default GroupBar;
