import React from "react";
import OptionInput from "./OptionInput";

function OptionInputList() {
  return (
    <div className="flex flex-col gap-2">
      <OptionInput />
      <OptionInput />
      <OptionInput />
    </div>
  );
}

export default OptionInputList;
