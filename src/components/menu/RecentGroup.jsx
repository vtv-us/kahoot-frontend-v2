import React from "react";

function RecentGroup() {
  return (
    <div className="py-4 px-2">
      <h3 className="font-bold px-2">Recent groups</h3>
      <div className="cursor-pointer hover:bg-gray-200 rounded-md px-2 py-1 bg-slate-200 font-semibold">MUN</div>
      <div className="cursor-pointer hover:bg-gray-200 rounded-md px-2 py-1">EPL</div>
      <div className="cursor-pointer hover:bg-gray-200 rounded-md px-2 py-1">MUN</div>
      <div className="cursor-pointer hover:bg-gray-200 rounded-md px-2 py-1 flex justify-between font-[500] text-gray-500">
        <span>Create group</span>
        <span>+</span>
      </div>
    </div>
  );
}

export default RecentGroup;
