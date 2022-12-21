import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ReactIconMemberSlide from "../../components/icon/ReactIconMemberSlide";
import { REACTION } from "../../utils/constants";

function ListReactSlideMember({ checked, setChecked = () => {} }) {
  const reactionList = [
    {
      id: uuid(),
      icon: <FavoriteIcon />,
      isChecked: checked === REACTION.HEART,
      onClick: () => setChecked(REACTION.HEART),
    },
    {
      id: uuid(),
      icon: <QuestionMarkIcon />,
      isChecked: checked === REACTION.QUESTION,
      onClick: () => setChecked(REACTION.QUESTION),
    },
    {
      id: uuid(),
      icon: <ThumbUpIcon />,
      isChecked: checked === REACTION.LIKE,
      onClick: () => setChecked(REACTION.LIKE),
    },
    {
      id: uuid(),
      icon: <ThumbDownIcon />,
      onClick: () => setChecked(REACTION.DISLIKE),
      isChecked: checked === REACTION.DISLIKE,
    },
    {
      id: uuid(),
      icon: <SentimentVeryDissatisfiedIcon />,
      onClick: () => setChecked(REACTION.ANGRY),
      isChecked: checked === REACTION.ANGRY,
    },
  ];
  return (
    <div className="flex gap-2 mt-4">
      {reactionList.map(item => (
        <ReactIconMemberSlide
          key={item.id}
          onClick={() => {
            item.onClick();
          }}
          isChecked={item.isChecked}
        >
          {item.icon}
        </ReactIconMemberSlide>
      ))}
    </div>
  );
}

ListReactSlideMember.propTypes = {
  checked: PropTypes.number.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default ListReactSlideMember;
