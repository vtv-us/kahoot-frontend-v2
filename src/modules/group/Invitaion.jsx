/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import ButtonMain from "../../components/button/ButtonMain";
import CircularAvatar from "../../components/user/CircularAvatar";
import { postData } from "../../redux/apiRequest";
import { getCurrentUser } from "../../utils/constants";

function Invitaion() {
  const { id } = useParams("id");
  const user = getCurrentUser();
  const navigate = useNavigate();

  return (
    <div className="items-center justify-center py-[200px] h-full">
      <div className="flex justify-between w-[150px] m-auto">
        <CircularAvatar imgUrl="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/316241506_1596965280761629_1221217476877768790_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dbeb18&_nc_ohc=zncsuNmGbU0AX8JALUi&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfAo9BsfMrTTr7GCxMex40oHTuAAqfHW8BPdREPdFBcNYA&oe=637FF056" />
        <CircularAvatar imgUrl="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/316241506_1596965280761629_1221217476877768790_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dbeb18&_nc_ohc=zncsuNmGbU0AX8JALUi&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfAo9BsfMrTTr7GCxMex40oHTuAAqfHW8BPdREPdFBcNYA&oe=637FF056" />
      </div>
      <div className="flex justify-center m-auto w-[400px] mt-4">
        <h3 className="font-bold ">
          <span className="text-blue-400">Dinh Van</span> invited you to to{" "}
          <span className="text-blue-400">VTV-US group</span>
        </h3>
      </div>
      <div className="flex justify-center m-auto w-[400px] mt-7">
        <ButtonMain
          bgColor="bg-green-700"
          hoverColor="bg-green-800"
          className="mr-4"
          onClick={() => postData(id, user.access_token, navigate)}
        >
          Accept invitation
        </ButtonMain>
        <ButtonMain textColor="text-black" bgColor="bg-gray-50" hoverColor="bg-gray-300">
          Decline
        </ButtonMain>
      </div>
    </div>
  );
}

export default Invitaion;
