/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import ContentSlideSetting from "./ContentSlideSetting";
import SlideMenuSettingHeader from "./SlideMenuSettingHeader";

function MenuPresentation() {
  return (
    <div className="w-[460px] max-h-[600px] overflow-auto border-l border-gray-200 bg-white">
      <SlideMenuSettingHeader />
      <ContentSlideSetting />
    </div>
  );
}

export default MenuPresentation;
