import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router";
import DashboardUI from "./pages/Dashboard/DashboardUI.jsx";
import HomePage from "./pages/Home/Home.jsx";
import LoginUI from "./pages/Login/LoginUI.jsx";
import StudyUI from "./pages/Study/study.jsx";
import NavBar from "./components/NavBar.jsx";
import ProtectedRoutes from "./pages/Login/ProtectedRoutes";

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginUI />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<DashboardUI />} />
              <Route path="/study" element={<StudyUI />} />
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
