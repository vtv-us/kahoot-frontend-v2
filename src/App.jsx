import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import GroupPage from "./pages/GroupPage";
import GroupMembers from "./modules/group/GroupMembers";
import UserPage from "./pages/UserPage";
import InvitationPage from "./pages/InvitationPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/groups/:id" element={<GroupPage />} />
        <Route path="/groups/:role" element={<GroupPage />} />
        <Route path="/groups/:id/members" element={<GroupMembers />} />
        <Route path="/user/manage" element={<UserPage />} />
        <Route path="/invitation" element={<InvitationPage />} />
      </Routes>
    </div>
  );
}

export default App;
