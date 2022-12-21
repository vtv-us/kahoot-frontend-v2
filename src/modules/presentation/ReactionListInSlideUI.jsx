/* eslint-disable react/forbid-prop-types */
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ReationInSlideUI from "../../components/icon/ReationInSlideUI";
import { REACTION } from "../../utils/constants";

function ReactionListInSlideUI({ checkedReactionList }) {
  const reactionList = [
    {
      id: uuid(),
      icon: <FavoriteIcon />,
      quantity: 0,
      value: REACTION.HEART,
      isChecked: checkedReactionList.includes(REACTION.HEART),
    },
    {
      id: uuid(),
      icon: <QuestionMarkIcon />,
      quantity: 0,
      value: REACTION.QUESTION,
      isChecked: checkedReactionList.includes(REACTION.QUESTION),
    },
    {
      id: uuid(),
      icon: <ThumbUpIcon />,
      quantity: 0,
      value: REACTION.LIKE,
      isChecked: checkedReactionList.includes(REACTION.LIKE),
    },
    {
      id: uuid(),
      icon: <ThumbDownIcon />,
      quantity: 0,
      value: REACTION.DISLIKE,
      isChecked: checkedReactionList.includes(REACTION.DISLIKE),
    },
    {
      id: uuid(),
      icon: <SentimentVeryDissatisfiedIcon />,
      quantity: 0,
      value: REACTION.ANGRY,
      isChecked: checkedReactionList.includes(REACTION.ANGRY),
    },
  ];

  return (
    <div className="flex gap-4">
      {reactionList?.map(item => (
        <ReationInSlideUI key={item.id} quantity={item.quantity} isChecked={item.isChecked}>
          {item.icon}
        </ReationInSlideUI>
      ))}
    </div>
  );
}
ReactionListInSlideUI.propTypes = {
  checkedReactionList: PropTypes.array.isRequired,
};

export default ReactionListInSlideUI;
