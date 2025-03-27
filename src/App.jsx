import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router";
import CreateFlashcard from "./pages/Flashcards/CreateFlashcard.jsx";
import HomePage from "./pages/Home/Home.jsx";
import LoginUI from "./pages/Login/LoginUI.jsx";
import StudyUI from "./pages/Study/StudyUI.jsx";
import ProtectedRoutes from "./pages/Login/ProtectedRoutes";
import Layout from "./components/Layout.jsx";
import DashboardUI from "./pages/Dashboard/DashboardUI.jsx";
import FlashcardSets from "./pages/Flashcards/FlashcardSets.jsx";
import FlashcardSetUI from "./pages/Flashcards/FlashcardSetUI.jsx";

function App() {
  return (
    <div>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginUI />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<DashboardUI />} />
              <Route path="/study" element={<StudyUI />} />
              <Route path="/study/:category" element={<StudyUI />} />
              <Route path="/flashcards" element={<FlashcardSets />} />
              <Route
                path="/flashcards/:category"
                element={<FlashcardSetUI />}
              />
              <Route
                path="/flashcards/create"
                element={<CreateFlashcard />}></Route>
              {/* <Route
                  path="/flashcards/set/:categoryId"
                  element={<FlashcardSets />}
                /> */}
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </div>
  );
}

export default App;
