/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { useNavigate, useParams } from "react-router";

import PeopleIcon from "@mui/icons-material/People";
import PropTypes from "prop-types";
import BackButton from "../button/BackButton";
import User from "../user/User";
import { getCurrentUser } from "../../utils/constants";
import ButtonMain from "../button/ButtonMain";
import DropdownMenu from "../dropdown/DropdownMenu";
import { getGroupsCreatedByUser, getGroupsUserHasJoined, getSlideById, updateSlide } from "../../handleApi";
import { getUserById } from "../../redux/apiRequest";
import useToggleModal from "../../hooks/useToggleModal";
import ModalInvite from "../modal/ModalInvite";
import InviteLinkInput from "../input/InviteLinkInput";
import DropdownUser from "../dropdown/DropdownUser";
import { SocketContext } from "../../contexts/socketContext";
import ModalMain from "../modal/ModalMain";
import ModalShareToGroup from "../modal/ModalShareToGroup";

function HeaderPresentation({ socket }) {
  const { idSlide, idQuestion } = useParams();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [owner, setOwner] = useState({});
  const [slide, setSlide] = useState({});
  const [choosed, setChoosed] = useState([]);
  const [filter, setFilter] = useState({});
  const { open, handleClickOpen, handleClose } = useToggleModal();
  const [isShown, setIsShown] = useState(false);
  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const groupManage = await getGroupsCreatedByUser(user.access_token);
      const groupJoined = await getGroupsUserHasJoined(user.access_token);
      const newGroupManage = groupManage.map(item => {
        return { id: item.group_id, name: item.group_name, role: "owner", isChecked: choosed.includes(item.group_id) };
      });
      const newGroupJoined = groupJoined.map(item => {
        return {
          id: item.group_id,
          name: item.group_name,
          role: item.role,
          isChecked: choosed.includes(item.group_id),
        };
      });

      setGroupList([...newGroupManage, ...newGroupJoined]);
    };
    fetchData();
  }, [idSlide, choosed]);
  const {
    open: openShareGroup,
    handleClickOpen: handleClickOpenShareGroup,
    handleClose: handleCloseShareGroup,
  } = useToggleModal();
  const optionShareMenu = [
    {
      icon: <PeopleIcon />,
      title: "Share everyone",
      onClick: () => {
        handleClickOpen();
      },
    },
    {
      icon: <Diversity1Icon />,
      title: "Share to group",
      onClick: () => {
        handleClickOpenShareGroup();
      },
    },
  ];
  useEffect(() => {
    getSlideById(idSlide, user?.access_token).then(res => setSlide(res));
  }, []);
  useEffect(() => {
    if (slide?.owner) getUserById(slide?.owner, user?.access_token).then(res => setOwner(res));
    setFilter(slide?.title);
  }, [slide]);

  const handleUpdateTitle = () => {
    updateSlide(slide, filter, user?.access_token, setSlide);
  };
  const handleChoiceGroup = id => {
    if (choosed.includes(id)) {
      const index = choosed.indexOf(id);
      if (index !== -1) {
        choosed.splice(index, 1);
      }
      setChoosed([...choosed]);
    } else {
      setChoosed([id]);
    }
  };
  return (
    <div className="flex items-center justify-between w-full py-2 px-4 border-b-2 border-gray-200">
      <div className="flex gap-4">
        <BackButton
          to="/slides"
          onClick={() => {
            socket.emit("manualDisconnect");
          }}
        />
        <div>
          {isShown ? (
            <input
              value={filter}
              onChange={e => setFilter(e.target.value)}
              onFocus={() => setIsShown(true)}
              onBlur={() => {
                setIsShown(false);
                handleUpdateTitle();
              }}
              className="p-[9px] w-[400px] border border-gray-200"
            />
          ) : (
            <div
              className="flex flex-col justify-center"
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <h3 className="font-bold ">{slide.title}</h3>
              <div className="text-sm text-gray-600">Created by {owner?.user?.name || "user"}</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center">
          <CheckIcon style={{ color: "green" }} />
          <span className="text-gray-400">Saved</span>
        </div>
        <div className="w-[0.5px] h-10 bg-gray-200 mx-2" />

        <DropdownUser />

        <DropdownMenu data={optionShareMenu}>
          <ButtonMain bgColor="bg-white" textColor="text-gray-800" hoverColor="bg-gray-100">
            <ShareOutlinedIcon className="w-5" />
            <span className="text-lg font-thin"> Share</span>
          </ButtonMain>
        </DropdownMenu>

        <ButtonMain
          bgColor="bg-blue-600"
          textColor="text-white"
          hoverColor="bg-blue-700"
          onClick={() => {
            navigate(`/presentation/${idSlide}/${idQuestion}`);
          }}
        >
          <PlayArrowIcon className="w-5" />
          <span
            className="text-lg font-thin"
            onClick={() => {
              socket.emit("manualDisconnect");
            }}
          >
            Present
          </span>
        </ButtonMain>
        <ModalInvite
          open={open}
          onClick={e => e.stopPropagation()}
          handleClose={e => {
            e.stopPropagation();
            handleClose();
          }}
        >
          <InviteLinkInput idSlide={idSlide} />
        </ModalInvite>
        <ModalShareToGroup
          open={openShareGroup}
          handleClose={e => {
            setChoosed([]);
            handleCloseShareGroup();
          }}
          choosed={choosed}
        >
          <div className="flex flex-col gap-2">
            {groupList.length > 0 &&
              groupList.map(item => (
                <GroupShareItem key={item.id} data={item} onClick={() => handleChoiceGroup(item.id)} />
              ))}
          </div>
        </ModalShareToGroup>
      </div>
    </div>
  );
}
HeaderPresentation.propTypes = {
  socket: PropTypes.any,
};
function GroupShareItem({ data, onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between gap-4 rounded-md border-b border-gray-200 py-1 items-center hover:bg-slate-200 px-2 cursor-pointer ${
        data.isChecked && "bg-slate-300"
      }`}
    >
      <p>{data.name}</p>
      <span className="text-sm text-gray-400 bg-gray-100 rounded-md p-1">{data.role}</span>
    </div>
  );
}
GroupShareItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default HeaderPresentation;
