import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import GroupPage from "./pages/GroupPage";
import GroupMembers from "./modules/group/GroupMembers";
import UserPage from "./pages/UserPage";
import InvitationPage from "./pages/InvitationPage";
import { store } from "./redux/store";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/groups/:id" element={<GroupPage />} />
          <Route path="/groups/:role" element={<GroupPage />} />
          <Route path="/groups/:id/members" element={<GroupMembers />} />
          <Route path="/user/profile" element={<UserPage />} />
          <Route path="/group/invite/:id" element={<InvitationPage />} />
          <Route path="/verifyaccount" element={<VerifyAccountPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
