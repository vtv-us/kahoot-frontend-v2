/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import LayoutMain from "../components/layout/LayoutMain";

function HomePage() {
  useEffect(() => {
    document.title = "Kahoot - Vtvus";
  }, []);
  const navigate = useNavigate();
  return (
    <LayoutMain>
      <div className="flex gap-10 bg-white  h-full px-24 items-center">
        <div className="flex flex-col gap-8 w-2/4">
          <div className="font-bold text-[48px]">A community of online quiz</div>
          <div className="text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa corporis, reprehenderit maxime minima
            molestias magni, alias ducimus tempore praesentium sint, expedita magnam. Ad labore et rerum illo iste totam
            eum.
          </div>
          <button
            className="bg-purple-600 text-white hover:opacity-70 w-fit p-3 text-lg font-semibold rounded-md"
            type="submit"
            onClick={() => {
              navigate("/groups/owned");
            }}
          >
            Get started
          </button>
        </div>
        <div className="w-2/4 ">
          <img src="/home.jpg" alt="" className="mx-auto" />
        </div>
      </div>
    </LayoutMain>
  );
}

export default HomePage;
