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
import SlidesPage from "./pages/SlidesPage";
import SlideShowMemberPage from "./pages/SlideShowMemberPage";
import SlideShowHostPage from "./pages/SlideShowHostPage";
import { socket, SocketContext } from "./contexts/socketContext";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ErrorPage from "./pages/ErrorPage";
import { notiSocket, NotiSocketContext } from "./contexts/notiSocketContext";

function App() {
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <NotiSocketContext.Provider value={notiSocket}>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/reset-password" element={<ForgetPasswordPage />} />
              <Route path="/reset-password/:userId/:code" element={<ResetPasswordPage />} />
              <Route path="/groups/:id" element={<GroupPage />} />
              <Route path="/groups/:role" element={<GroupPage />} />
              <Route path="/groups/:id/members" element={<GroupMembers />} />
              <Route path="/user/profile" element={<UserPage />} />
              <Route path="/group/invite/:id/:userId" element={<InvitationPage />} />
              <Route path="/verifyaccount" element={<VerifyAccountPage />} />
              <Route path="/auth/callback/:callback1/:callback2" element={<GoogleLoginPage />} />
              <Route path="/presentation/:idSlide/:idQuestion/edit" element={<PresentationPage />} />
              <Route path="/slides/:id" element={<SlidesPage />} />
              <Route path="/slides/member/:idSlide" element={<SlideShowMemberPage />} />
              <Route path="/presentation/:idSlide/:idQuestion" element={<SlideShowHostPage />} />
              <Route path="/presentation/:idGroup/:idSlide/:idQuestion" element={<SlideShowHostPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </NotiSocketContext.Provider>
      </SocketContext.Provider>
    </Provider>
  );
}

export default App;
