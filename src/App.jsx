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
import GoogleLoginPage from "./pages/GoogleLoginPage";
import PresentationPage from "./pages/PresentationPage";

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
          <Route path="/group/invite/:id/:userId" element={<InvitationPage />} />
          <Route path="/verifyaccount" element={<VerifyAccountPage />} />
          <Route path="/auth/callback/:callback1/:callback2" element={<GoogleLoginPage />} />
          <Route path="/presentation/:id/edit" element={<PresentationPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
