import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import LayoutMain from "../components/layout/LayoutMain";
import SlideBar from "../components/menu/SlideBar";
import DashboardSlide from "../modules/slide/DashboardSlide";
import { getCurrentUser } from "../utils/constants";
import ErrorPage from "./ErrorPage";

function SlidesPage() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) navigate("/login");
  }, []);
  return user !== null ? (
    <LayoutMain className="!bg-white">
      <div className="flex">
        <SlideBar />
        <DashboardSlide />
      </div>
    </LayoutMain>
  ) : (
    <ErrorPage />
  );
}

export default SlidesPage;
