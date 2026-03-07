import React from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-amber-400 px-4 md:px-12 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div 
        className="text-5xl font-extrabold tracking-tighter cursor-pointer" 
        onClick={() => handleNavigate('/')}
      >
        Bp
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 font-medium">
        <button onClick={() => handleNavigate('/')} className="cursor-pointer hover:text-amber-400 hover:bg-black hover:px-4 hover:py-2 hover:rounded-3xl transition-all">Home</button>
        <button className="cursor-pointer hover:text-amber-400 hover:bg-black hover:px-4 hover:py-2 hover:rounded-3xl transition-all">Service</button>
        <button className="cursor-pointer hover:text-amber-400 hover:bg-black hover:px-4 hover:py-2 hover:rounded-3xl transition-all">Bikes</button>
        <button className="cursor-pointer hover:text-amber-400 hover:bg-black hover:px-4 hover:py-2 hover:rounded-3xl transition-all">About us</button>
        <div className="h-6 w-px bg-black/20 mx-2"></div>
        <button 
          onClick={() => handleNavigate('/login')} 
          className="cursor-pointer hover:text-amber-400 hover:bg-black hover:px-4 hover:py-2 hover:rounded-3xl transition-all"
        >
          Login
        </button>
        <button 
          onClick={() => handleNavigate('/register')} 
          className="cursor-pointer bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 hover:scale-105 transition-all text-sm"
        >
          Register
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-amber-400 absolute top-full left-0 w-full px-4 py-6 flex flex-col gap-4 font-medium z-40 border-t border-amber-500 overflow-hidden"
          >
            <button className="text-left cursor-pointer hover:pl-2 transition-all" onClick={() => handleNavigate('/')}>Home</button>
            <button className="text-left cursor-pointer hover:pl-2 transition-all">Service</button>
            <button className="text-left cursor-pointer hover:pl-2 transition-all">Bikes</button>
            <button className="text-left cursor-pointer hover:pl-2 transition-all">About us</button>
            <div className="h-px bg-black/10 w-full my-2"></div>
            <button className="text-left cursor-pointer hover:pl-2 transition-all" onClick={() => handleNavigate('/login')}>Login</button>
            <button className="text-left font-bold cursor-pointer hover:pl-2 transition-all" onClick={() => handleNavigate('/register')}>Register</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
