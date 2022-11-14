import "./App.css";
import LayoutAuth from "./components/layout/LayoutAuth";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/login" element={<LogInPage></LogInPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
