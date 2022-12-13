import React from "react";
import MessageIcon from "@mui/icons-material/Message";

import IconReactQuestion from "./IconReactQuestion";

function ListReactIcon() {
  return (
    <div className="flex gap-4">
      <IconReactQuestion>
        <MessageIcon />
      </IconReactQuestion>
      <IconReactQuestion>
        <MessageIcon />
      </IconReactQuestion>
      <IconReactQuestion>
        <MessageIcon />
      </IconReactQuestion>
    </div>
  );
}

export default ListReactIcon;
