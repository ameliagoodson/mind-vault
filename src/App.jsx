import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router";
import { useState } from "react";
import DashboardUI from "./pages/Dashboard/DashboardUI.jsx";
import HomePage from "./pages/Home/Home.jsx";
import LoginUI from "./pages/Login/LoginUI.jsx";
import StudyUI from "./pages/Study/StudyUI.jsx";
import ProtectedRoutes from "./pages/Login/ProtectedRoutes";
import Layout from "./components/Layout.jsx";

function App() {
  const [cardNum, setCardNum] = useState(100);
  return (
    <>
      <div>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={<HomePage cardNum={cardNum} setCardNum={setCardNum} />}
              />
              <Route path="/login" element={<LoginUI />} />

              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/dashboard"
                  element={
                    <DashboardUI cardNum={cardNum} setCardNum={setCardNum} />
                  }
                />
                <Route path="/study" element={<StudyUI />} />
              </Route>
            </Routes>
          </Layout>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
