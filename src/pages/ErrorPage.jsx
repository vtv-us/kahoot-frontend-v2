import React from "react";
import { useNavigate } from "react-router";
import ButtonMain from "../components/button/ButtonMain";

function ErrorPage() {
  const navigate = useNavigate();
  const handleBackToHomePage = () => {
    navigate("/");
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {/* <h1 className="font-bold text-8xl">404</h1>
      <h2 className="font-bold text-4xl">Page not found</h2> */}
      <ButtonMain onClick={handleBackToHomePage}>Go home</ButtonMain>
      <img src="/page_not_found.jpg" className="object-fit h-[90%]" alt="404" />
    </div>
  );
}

export default ErrorPage;
