import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Top Bar */}
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

      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}

      {/* Bottom Yellow Bar */}
      <div className="h-8 bg-amber-400 w-full"></div>
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
