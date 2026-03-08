import React from 'react';
import { Facebook, Globe, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 px-4 md:px-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="text-6xl font-black leading-none">
              Bike<br />
              <span className="text-amber-400">Point</span>
            </div>
            <div className="space-y-2 text-sm font-medium">
              <p>+91 6381565519 / 144455664445</p>
              <p>info@bikepoint.com</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-400 mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-amber-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Meet Our team</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Terms & Condition</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-400 mb-6 uppercase tracking-wider text-xs">More Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-amber-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy & Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Join Out team</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all">
                <Globe size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Discover Our application</p>
              <div className="flex gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 cursor-pointer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 text-center text-xs text-gray-800">
          © {new Date().getFullYear()} Bike Point. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
