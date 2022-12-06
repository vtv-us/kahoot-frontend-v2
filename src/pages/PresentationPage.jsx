import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ButtonMain from "../components/button/ButtonMain";
import LayoutPresentation from "../components/layout/LayoutPresentation";
import SlideListMenu from "../modules/presentation/SlideListMenu";
import MenuPresentation from "../modules/presentation/MenuPresentation";
import SlideUI from "../modules/presentation/SlideUI";

function PresentationPage() {
  return (
    <LayoutPresentation>
      <div className="h-[56px] flex items-center border-b px-4 border-gray-200 ">
        <ButtonMain bgColor="bg-blue-600" textColor="text-white" hoverColor="bg-blue-700">
          <AddIcon className="w-5" />
          <span className="text-lg font-thin"> New slide</span>
        </ButtonMain>
      </div>
      <div className="flex w-full justify-between bg-gray-200">
        <SlideListMenu />
        <SlideUI />
        <MenuPresentation />
      </div>
    </LayoutPresentation>
  );
}

export default PresentationPage;
