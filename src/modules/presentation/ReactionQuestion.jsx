/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import uuid from "react-uuid";
import ReactionIcon from "../../components/icon/ReactionIcon";
import { useSlide } from "../../contexts/slideContext";
import { REACTION } from "../../utils/constants";

function ReactionQuestion() {
  const { checkedReactionList, setCheckedReactionList } = useSlide();
  const handleChecked = value => {
    if (checkedReactionList.includes(value)) {
      const index = checkedReactionList.indexOf(value);
      if (index !== -1) {
        checkedReactionList.splice(index, 1);
      }

      setCheckedReactionList([...checkedReactionList]);
    } else {
      setCheckedReactionList([...checkedReactionList, value]);
    }
  };
  const reactionList = [
    {
      id: uuid(),
      icon: <FavoriteIcon />,
      value: REACTION.HEART,
      isChecked: checkedReactionList.includes(REACTION.HEART),
      onClick: () => {
        handleChecked(REACTION.HEART);
      },
    },
    {
      id: uuid(),
      icon: <QuestionMarkIcon />,
      value: REACTION.QUESTION,
      isChecked: checkedReactionList.includes(REACTION.QUESTION),
      onClick: () => {
        handleChecked(REACTION.QUESTION);
      },
    },
    {
      id: uuid(),
      icon: <ThumbUpIcon />,
      value: REACTION.LIKE,
      isChecked: checkedReactionList.includes(REACTION.LIKE),
      onClick: () => {
        handleChecked(REACTION.LIKE);
      },
    },
    {
      id: uuid(),
      icon: <ThumbDownIcon />,
      value: REACTION.DISLIKE,
      isChecked: checkedReactionList.includes(REACTION.DISLIKE),
      onClick: () => {
        handleChecked(REACTION.DISLIKE);
      },
    },
    {
      id: uuid(),
      icon: <SentimentVeryDissatisfiedIcon />,
      value: REACTION.ANGRY,
      isChecked: checkedReactionList.includes(REACTION.ANGRY),
      onClick: () => {
        handleChecked(REACTION.ANGRY);
      },
    },
  ];
  useEffect(() => {
    reactionList.map(item => {
      return { ...item, isChecked: checkedReactionList.includes(item.value) };
    });
  }, [checkedReactionList]);
  return (
    <div>
      <h3 className="text-md font-semibold mb-2">
        Reactions <HelpOutlineIcon />
      </h3>
      <div className="flex gap-2">
        {reactionList?.map(item => (
          <ReactionIcon key={item.id} isChecked={item.isChecked} onClick={item.onClick}>
            {item.icon}
          </ReactionIcon>
        ))}
      </div>
    </div>
  );
}

export default ReactionQuestion;
