import React from "react";
import SlideMenuItem from "./SlideMenuItem";

function SlideListMenu() {
  return (
    <div className="flex flex-col max-h-[600px] overflow-auto border-r bg-white border-gray-200">
      <SlideMenuItem
        onClick={() => {
          console.log("click card");
        }}
      />
      <SlideMenuItem
        onClick={() => {
          console.log("click card");
        }}
        isActive
      />
      <SlideMenuItem
        onClick={() => {
          console.log("click card");
        }}
      />
      <SlideMenuItem
        onClick={() => {
          console.log("click card");
        }}
      />
      <SlideMenuItem
        onClick={() => {
          console.log("click card");
        }}
      />
      <SlideMenuItem
        onClick={() => {
          console.log("click card");
        }}
      />
      <SlideMenuItem
        onClick={() => {
          console.log("click card");
        }}
      />
      <SlideMenuItem
        onClick={() => {
          console.log("click card");
        }}
      />
    </div>
  );
}

export default SlideListMenu;
