/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import CloseIcon from "@mui/icons-material/Close";
import HeaderMain from "./HeaderMain";
import { NotiSocketContext } from "../../contexts/notiSocketContext";
import { getGroupById } from "../../redux/apiRequest";
import { getSlideById } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";

function LayoutMain({ children, bgColor, className = "" }) {
  const [showNoti, setShowNoti] = useState(false);
  const [notiInfo, setNotiInfo] = useState(null);
  const notiSocket = useContext(NotiSocketContext);
  const [groupCurrent, setGroupCurrent] = useState({});
  const user = getCurrentUser();
  const handleCloseNoti = () => {
    setShowNoti(false);
  };
  const logNoti = async msg => {
    const group = await getGroupById(msg.GroupID, user?.access_token);
    const slide = await getSlideById(msg.SlideID, user?.access_token);
    setGroupCurrent(group);
    setNotiInfo({
      slide,
      group,
    });
    setShowNoti(true);
    // toast.info(`Presentation ${slide.title} is being presented in group ${group.group_name}`, { autoClose: false });
  };
  useEffect(() => {
    notiSocket.emit("join", user?.access_token);
    notiSocket.on("notify", logNoti);
    return () => {
      notiSocket.off("notify", logNoti);
    };
  }, [notiSocket]);
  return (
    <div className="relative">
      <HeaderMain />
      <div className={`${bgColor || "bg-gray-100"} h-screen mx-auto pt-[58px] ${className}`}>{children}</div>
      {showNoti && (
        <div className="fixed p-5 bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-100 flex gap-4 items-center">
          <h2>
            Presentation <strong> {notiInfo?.slide?.title}</strong> is being presented in group{" "}
            <strong>{notiInfo?.group?.group_name}</strong>
          </h2>
          <div className="p-1 text-red-500 cursor-pointer rounded-md hover:bg-red-100" onClick={handleCloseNoti}>
            Close
          </div>
          <a
            href={`${process.env.REACT_APP_FE_ADDRESS}/slides/member/${groupCurrent.group_id}/${notiInfo?.slide?.id}`}
            className="p-1 text-green-500 cursor-pointer rounded-md hover:bg-green-100"
            target="_blank"
            rel="noreferrer"
          >
            Join now
          </a>
        </div>
      )}
    </div>
  );
}
LayoutMain.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
};

export default LayoutMain;
