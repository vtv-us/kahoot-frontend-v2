import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function OptionInput() {
  return (
    <div className="flex gap-4 items-center">
      <input type="text" className="w-full border border-gray-200 rounded-sm p-2 outline-blue-400" value="Option 1" />
      <CloseIcon className="cursor-pointer text-gray-500 hover:text-gray-700 text-md  " />
    </div>
  );
}

export default OptionInput;
