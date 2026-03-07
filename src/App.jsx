import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  Send, 
  Facebook, 
  Instagram, 
  Linkedin, 
  ChevronLeft, 
  ChevronRight,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const BikePoint = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    { title: 'Services', color: 'bg-amber-400' },
    { title: 'Water Wash', color: 'bg-gray-100' },
    { title: 'Bike Spares', color: 'bg-amber-400' },
    { title: 'Buy', color: 'bg-gray-100' },
    { title: 'Sell', color: 'bg-amber-400' },
    { title: '', color: 'bg-gray-100' },
  ];

  const projects = [
    'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&q=80&w=800',
  ];

  const shops = [
    { name: 'Rajeshwari Motors', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800', featured: true },
    { name: 'Bhavani Automobile', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800', featured: false },
    { name: 'Hari Motors', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800', featured: true },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Top Bar */}
      <div className="bg-white py-2 px-4 md:px-12 flex justify-end items-center gap-6 text-sm border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-amber-400" />
          <span>info@bikepoint.com</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-amber-400" />
          <span>63815 65519</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-amber-400 px-4 md:px-12 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-5xl font-extrabold tracking-tighter">Bp</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#" className="hover:text-amber-400 hover:bg-black hover:p-2.5 hover:rounded-3xl">Home</a>
          <a href="#" className=" hover:text-amber-400 hover:bg-black hover:p-2.5 hover:rounded-3xl ">Service</a>
          <a href="#" className="hover:text-amber-400 hover:bg-black hover:p-2.5 hover:rounded-3xl">Bikes</a>
          <a href="#" className="hover:text-amber-400 hover:bg-black hover:p-2.5 hover:rounded-3xl">About us</a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-amber-400 absolute w-full px-4 py-6 flex flex-col gap-4 font-medium z-40 border-t border-amber-500"
        >
          <a href="#" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Service</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Bikes</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>About us</a>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative h-150 md:h-175 overflow-hidden bg-gray-900">
        <img 
          src="/images/bike1.png" 
          alt="Hero Bike" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 h-full flex flex-col px-4 md:px-24 p py-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-2 text-white">
              Bike<br />
              <span className="text-amber-400">Point</span>
            </h1>
            <p className="text-white max-w-xs md:max-w-sm text-sm md:text-base opacity-90 leading-relaxed">
              No Matter How Bad Your Day Is Your Bike Will Always Make You Feel Better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Bar */}
      <div className="max-w-5xl mx-auto -mt-12 relative z-20 px-4">
        <div className="bg-amber-400 rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Get Latest Updates</h2>
            <p className="text-sm opacity-80">Lorem ipsum dolor sit amet, consectetur adipiscing elit man the end.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white px-4 py-3 rounded-lg grow md:w-64 outline-none focus:ring-2 focus:ring-black/10"
            />
            <button className="bg-black text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
              <Send size={18} />
              Share Email
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`${service.color} h-64 rounded-xl flex items-center justify-center relative group cursor-pointer overflow-hidden`}
            >
              {service.title && (
                <div className="bg-black text-white px-8 py-2 rounded-lg font-bold group-hover:bg-amber-400 group-hover:text-black transition-colors">
                  {service.title}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-gray-50 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Our Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((img, index) => (
              <div key={index} className="overflow-hidden rounded-2xl h-80">
                <img 
                  src={img} 
                  alt={`Project ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Shops Section */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto relative">
        <h2 className="text-4xl font-bold mb-12">Best Shops</h2>
        
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white transition-colors">
            <ChevronLeft />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 grow">
            {shops.map((shop, index) => (
              <div key={index} className={`rounded-2xl overflow-hidden ${shop.featured ? 'bg-amber-400' : 'bg-white border border-gray-100'}`}>
                <div className="p-4">
                  <img 
                    src={shop.image} 
                    alt={shop.name} 
                    className="w-full h-56 object-cover rounded-xl mb-6"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center pb-6 px-4">
                    <h3 className="text-xl font-bold mb-4">{shop.name}</h3>
                    <p className="text-sm opacity-70 leading-relaxed">
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white transition-colors">
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-4 md:px-12 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Feel free to ask anything!</h2>
        <form className="space-y-6">
          <div>
            <label className="block font-bold mb-2">Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Message</label>
            <textarea 
              rows={4}
              placeholder="Enter your message" 
              className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none"
            ></textarea>
          </div>
          <button className="w-full bg-amber-400 text-black font-bold py-4 rounded-xl hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20">
            Submit
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 px-4 md:px-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="text-4xl font-black leading-none">
                Bike<br />
                <span className="text-amber-400">Point</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                13, Thirumurugan Street, Balaji Nagar Anakaputhur, Chennai - 600070.
              </p>
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
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Bike Point. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Bottom Yellow Bar */}
      <div className="h-4 bg-amber-400 w-full"></div>
    </div>
  );
};

export default BikePoint;