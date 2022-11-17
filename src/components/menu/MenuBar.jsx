import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import MenuItem from "./MenuItem";

// eslint-disable-next-line react/function-component-definition
const MenuBar = () => {
  return (
    <>
      <MenuItem title="Home">
        <HomeOutlinedIcon />
      </MenuItem>
      <MenuItem title="Discover">
        <ExploreOutlinedIcon />
      </MenuItem>
      <MenuItem title="Library">
        <ListOutlinedIcon />
      </MenuItem>
      <MenuItem title="Reports">
        <LeaderboardOutlinedIcon />
      </MenuItem>
      <MenuItem title="Groups">
        <Diversity1OutlinedIcon />
      </MenuItem>
      <MenuItem title="Marketplace">
        <StorefrontOutlinedIcon />
      </MenuItem>
    </>
  );
};

export default MenuBar;
