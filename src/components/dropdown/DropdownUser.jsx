import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import DropdownMenu from "./DropdownMenu";
import User from "../user/User";
import { getCurrentUser } from "../../utils/constants";
import { logoutUser } from "../../redux/apiRequest";

function DropdownUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getCurrentUser();

  const optionUserMenu = [
    {
      icon: <AccountCircleIcon />,
      title: "Setting profile",
      onClick: () => {
        navigate("/user/profile");
      },
    },
    {
      icon: <LogoutIcon />,
      title: "Log out",
      onClick: () => {
        logoutUser(dispatch);
        navigate(`/login`);
      },
      className: "text-red-500",
    },
  ];
  return (
    <DropdownMenu data={optionUserMenu}>
      <User avatar_url={user?.user?.avatar_url} className="bg-green-600" />
    </DropdownMenu>
  );
}

export default DropdownUser;
