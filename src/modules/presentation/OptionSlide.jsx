import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React from "react";
import ButtonMain from "../../components/button/ButtonMain";
import OptionInputList from "../../components/input/OptionInputList";

function OptionSlide() {
  return (
    <div>
      <h3 className="text-md font-semibold mb-2">
        Options <HelpOutlineIcon />
      </h3>
      <OptionInputList />
      <ButtonMain className="w-full mt-2 text-md" bgColor="bg-gray-200 hover:!bg-gray-300" textColor="text-gray-800">
        + Add option
      </ButtonMain>
    </div>
  );
}

export default OptionSlide;
