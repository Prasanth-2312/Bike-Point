import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, ChevronLeft, ChevronRight, CheckCircle, Info, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const HomePage = () => {
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

  const [feedbackData, setFeedbackData] = React.useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    
    const feedbackPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success
        console.log('Feedback Received:', feedbackData);
        resolve('Feedback submitted successfully!');
      }, 1500);
    });

    toast.promise(feedbackPromise, {
      loading: (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={18} />
          Submitting your feedback...
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
          Failed to submit feedback.
        </span>
      ),
    });

    await feedbackPromise;
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFeedbackData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-150 md:h-175 overflow-hidden bg-gray-900">
        <img 
          src="/images/bike1.png" 
          alt="Hero Bike" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 h-full flex flex-col py-24 px-4 md:px-24 max-w-7xl ">
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
            <h2 className="text-2xl md:text-4xl font-bold mb-1">Get Latest Updates</h2>
            <p className="text-sm opacity-80">Lorem ipsum dolor sit amet, consectetur adipiscing elit man the end.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/90 px-4 py-3 rounded-lg grow md:w-64 outline-none focus:ring-2 focus:ring-black/10 border border-transparent focus:border-black/20 transition-all"
            />
            <button className="bg-black text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:text-black cursor-pointer transition-colors hover:bg-white group">
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              Share Email
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-100">
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
      <section className="py-24 px-4 md:px-12 max-w-3xl mx-auto shadow-2xl rounded-4xl mb-20">
        <h2 className="text-4xl font-bold mb-12">Feel free to ask anything!</h2>
        
        {isSubmitted ? (
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-100 border border-green-200 p-12 rounded-3xl text-center"
            >
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700">Your message has been received. We'll get back to you soon.</p>
            </motion.div>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="space-y-6">
            <div>
              <label className="block font-bold mb-2">Name</label>
              <input 
                type="text" 
                required
                value={feedbackData.name}
                onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                placeholder="Enter your name" 
                className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-blue-50/50 outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Email</label>
              <input 
                type="email" 
                required
                value={feedbackData.email}
                onChange={(e) => setFeedbackData({ ...feedbackData, email: e.target.value })}
                placeholder="Enter your email address" 
                className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-blue-50/50 outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Message</label>
              <textarea 
                rows={4}
                required
                value={feedbackData.message}
                onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                placeholder="Enter your message" 
                className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-blue-50/50 outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-amber-400 text-black font-bold py-4 rounded-xl hover:bg-black hover:text-white transition-colors shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 group">
              Submit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}
      </section>
    </>
  );
};

export default HomePage;
