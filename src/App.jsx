import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isDashboard = location.pathname === '/main';
  const hideNavFooter = isAuthPage || isDashboard;

  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col">
      {/* Top Bar */}
      {!isDashboard && (
        <div className="bg-white py-2 px-4 md:px-12 flex justify-end items-center gap-6 text-sm border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-amber-400" />
            <span>info@bikepoint.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-amber-400" />
            <span>63815 65519</span>
          </div>
        </div>
      )}

      {!isDashboard && (
        <Navbar 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
        />
      )}

      <main className="grow flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </main>

      {!hideNavFooter && <Footer />}

      {/* Bottom Yellow Bar */}
      {!isDashboard && <div className="h-4 bg-amber-400 w-full mt-auto"></div>}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent />
    </Router>
  );
};

export default App;
