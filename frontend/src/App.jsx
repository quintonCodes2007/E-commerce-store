import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from 'react-hot-toast';
import { useUserStore } from "./stores/useUserStore";

import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import { useEffect } from "react";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="layout-wrapper">
      <div className="bg-glow-overlay pointer-events-none"/>
      <div className="relative z-50 pt-20"/>
      

      <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>
    </div>
    <Toaster/>
    </div>
  );
}

export default App;
