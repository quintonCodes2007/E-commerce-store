import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";

import { useUserStore } from "./stores/useUserStore";

import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";


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
        <Route path="/dashboard" element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/category/:category" element= {<CategoryPage />}  />
        <Route path="/cart" element= {user ? <CartPage />: <Navigate to='/login'/>} />
      </Routes>
    </div>
    <Toaster/>
    </div>
  );
}

export default App;
