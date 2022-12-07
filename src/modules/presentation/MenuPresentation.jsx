/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useSlide } from "../../contexts/slideContext";
import ContentSlideSetting from "./ContentSlideSetting";
import SlideMenuSettingHeader from "./SlideMenuSettingHeader";

function MenuPresentation() {
  const data = useSlide();

  return (
    <div className="w-[460px] max-h-[600px] overflow-auto border-l border-gray-200 bg-white">
      <SlideMenuSettingHeader />
      <ContentSlideSetting data={data} />
    </div>
  );
}

export default MenuPresentation;
