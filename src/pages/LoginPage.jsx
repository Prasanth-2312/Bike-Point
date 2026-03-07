import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Info, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer'); // 'customer' or 'shop_owner'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, role };
    
    const loginPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success
        console.log('Login Details:', dataToSubmit);
        resolve('Logged in successfully!');
      }, 1500);
    });

    toast.promise(loginPromise, {
      loading: (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={18} />
          Authenticating...
        </span>
      ),
      success: (msg) => (
        <span className="flex items-center gap-2">
          <CheckCircle className="text-green-500" size={18} />
          {msg}
        </span>
      ),
      error: (
        <span className="flex items-center gap-2">
          <Info className="text-red-500" size={18} />
          Invalid credentials.
        </span>
      ),
    });

    await loginPromise;
  };

  return (
    <div className="grow py-20 px-4 flex flex-col items-center justify-center bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="bg-amber-400 p-8 text-center">
          <h2 className="text-3xl font-black">Welcome Back</h2>
          <p className="text-sm font-medium opacity-80">Login to your Bike Point account</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setRole('customer')}
            className={`flex-1 py-4 text-sm font-bold transition-all cursor-pointer ${role === 'customer' ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-50/30' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Customer
          </button>
          <button 
            onClick={() => setRole('shop_owner')}
            className={`flex-1 py-4 text-sm font-bold transition-all cursor-pointer ${role === 'shop_owner' ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-50/30' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Shop Owner
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com" 
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-blue-50/50 outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••" 
                className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-200 bg-blue-50/50 outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="accent-amber-400 cursor-pointer" />
              <span className="group-hover:text-amber-600 transition-colors">Remember me</span>
            </label>
            <button type="button" className="text-amber-600 font-bold hover:underline cursor-pointer hover:text-amber-700 transition-colors">Forgot password?</button>
          </div>

          <button className="w-full bg-amber-400 text-black font-bold py-4 rounded-xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
            Login <ArrowRight size={18} />
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/register')}
              className="text-black font-bold hover:underline cursor-pointer hover:text-amber-600 transition-colors"
            >
              Register Now
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
