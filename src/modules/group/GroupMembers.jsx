/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useContext } from "react";
import uuid from "react-uuid";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import LayoutMain from "../../components/layout/LayoutMain";
import GroupBar from "../../components/menu/GroupBar";
import Table from "../../components/table/Table";
import ModalInvite from "../../components/modal/ModalInvite";
import useToggleModal from "../../hooks/useToggleModal";
import { getGroupsMembers } from "../../redux/apiRequest";
import { getCurrentUser } from "../../utils/constants";
import MemberGroupItem from "./MemberGroupItem";
import GroupMemberSkeleton from "../../components/skeleton/GroupMemberSkeletion";
import BackButton from "../../components/button/BackButton";
import InviteLinkInput from "../../components/input/InviteLinkInput";
import AlertPresent from "../../components/alert/AlertPresent";
import { SocketContext } from "../../contexts/socketContext";
import { getAllQuestionByIdSlide, getSlideById } from "../../handleApi";
import { NotiSocketContext } from "../../contexts/notiSocketContext";
import { isOwnerOrCoowerOfGroup } from "../../pages/SlideShowHostPage";

function GroupMembers() {
  const [members, setMembers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [room, setRoom] = useState("");
  const [firstQuestion, setFirstQuestion] = useState({});
  const navigate = useNavigate();
  const { open, handleClickOpen, handleClose } = useToggleModal();
  const { id } = useParams("id");
  const user = getCurrentUser();
  const socket = useContext(SocketContext);
  const notiSocket = useContext(NotiSocketContext);

  useEffect(() => {
    setIsFetching(true);
    getGroupsMembers(user.access_token, id).then(res => {
      setMembers(res);
      setIsFetching(false);
      isOwnerOrCoowerOfGroup(user?.user?.user_id, id, user?.access_token).then(resHost => setIsHost(resHost));
    });
    document.title = "Group ";
  }, []);

  const logConnect = () => {
    socket.emit("getRoomActive");

    socket.emit("getSlidePresentation", id);
  };
  const getFirstQuestion = async idSlide => {
    try {
      const questions = await getAllQuestionByIdSlide(idSlide);
      const [first, ...rest] = questions;
      return first;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  useEffect(() => {
    socket.emit("getSlidePresentation", id);
    socket.emit("getRoomActive");

    socket.on("connect", logConnect);
    socket.on("getRoomActive", async msg => {
      console.log("activ", msg);
    });
    socket.on("getRoomState", msg => {
      console.log("current", msg);
    });

    notiSocket.on("notify", msg => socket.emit("getSlidePresentation", id));
    socket.on("error", msg => console.log("er", msg));
    socket.on("getSlidePresentation", async msg => {
      console.log("room gr", msg);
      const roomPresent = await getSlideById(msg, user?.access_token);
      setRoom(roomPresent);
      const first = await getFirstQuestion(roomPresent?.id, user?.access_token);
      setFirstQuestion(first);
    });

    return () => {
      socket.off("error");
      socket.off("getSlidePresentation");
      socket.off("getRoomState");
    };
  }, [socket]);

  return (
    <LayoutMain className="!bg-white">
      <div className="flex ">
        <GroupBar />
        <div className="px-32 py-8 flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <BackButton to="/groups/owned" />
            <div>
              <h1 className="font-bold text-2xl text-gray-800">Group members</h1>
            </div>
          </div>
          <Button
            variant="contained bg-blue-700 normal-case text-white font-semibold hover:bg-blue-800 ml-auto w-fit px-4 py-2 mt-4"
            onClick={handleClickOpen}
          >
            Invite
          </Button>
          {room && <AlertPresent name={room?.title} idRoom={room?.id} isHost={isHost} />}
          <ModalInvite open={open} handleClose={handleClose}>
            <InviteLinkInput idGroup={id} />
          </ModalInvite>

          <Table>
            <thead>
              <tr>
                <th className="w-2/4">Name</th>
                <th>Status</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 &&
                !isFetching &&
                members.map(member => <MemberGroupItem setGroupList={setMembers} key={member.user_id} data={member} />)}

              {isFetching && new Array(3).fill(0).map(() => <GroupMemberSkeleton key={uuid()} />)}
            </tbody>
          </Table>
        </div>
      </div>
    </LayoutMain>
  );
}

export default GroupMembers;
