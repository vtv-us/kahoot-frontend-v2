import { Skeleton } from "@mui/material";
import React from "react";

function RadioInputSkeletion() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton variant="rectangular" width={500} height={40} />
      <Skeleton variant="rectangular" width={500} height={40} />
      <Skeleton variant="rectangular" width={500} height={40} />
      <Skeleton variant="rectangular" width={500} height={40} />
    </div>
  );
}

export default RadioInputSkeletion;
