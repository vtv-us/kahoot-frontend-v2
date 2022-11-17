import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import GroupPage from "./pages/GroupPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/groups/:role" element={<GroupPage />} />
      </Routes>
    </div>
  );
}

export default App;
