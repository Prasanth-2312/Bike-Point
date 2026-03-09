import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const ShopRegistration = ({ 
  isOpen, 
  onClose, 
  onSave, 
  newShopData, 
  setNewShopData, 
  isPickingLocation, 
  setIsPickingLocation,
  isEditing = false
}) => {
  if (!isOpen || isPickingLocation) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(e);
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="bg-amber-400 p-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black">{isEditing ? 'Edit Shop Details' : 'Register Your Shop'}</h2>
            <p className="text-xs font-bold opacity-70 uppercase tracking-widest">
              {isEditing ? 'Update your information' : 'Join the Bike Point Network'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Shop Name</label>
              <input 
                required
                type="text" 
                value={newShopData.name}
                onChange={(e) => setNewShopData({...newShopData, name: e.target.value})}
                placeholder="Enter shop name"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-amber-400 transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
              <select 
                value={newShopData.type}
                onChange={(e) => setNewShopData({...newShopData, type: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-amber-400 transition-all text-sm font-medium"
              >
                <option>Workshop</option>
                <option>Service Center</option>
                <option>Spare Parts</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
            <input 
              required
              type="tel" 
              value={newShopData.phone}
              onChange={(e) => setNewShopData({...newShopData, phone: e.target.value})}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-amber-400 transition-all text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Address</label>
            <textarea 
              required
              value={newShopData.address}
              onChange={(e) => setNewShopData({...newShopData, address: e.target.value})}
              placeholder="Enter full address"
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-amber-400 transition-all text-sm font-medium resize-none"
            />
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Location</span>
              {newShopData.lat && (
                <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                  <Check size={12} /> Set
                </span>
              )}
            </div>
            
            {!isPickingLocation ? (
              <button 
                type="button"
                onClick={() => {
                  setIsPickingLocation(true);
                  toast("Click anywhere on the map to set your location", { icon: '📍' });
                }}
                className="w-full py-3 bg-white border-2 border-dashed border-amber-300 rounded-xl text-amber-600 text-xs font-bold hover:bg-amber-100 transition-all flex items-center justify-center gap-2"
              >
                <MapPin size={16} /> {newShopData.lat ? 'Change Location' : 'Pick Location on Map'}
              </button>
            ) : (
              <div className="py-3 bg-amber-400 rounded-xl text-black text-xs font-black text-center animate-pulse">
                CLICK ON THE MAP NOW...
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={isPickingLocation}
            className="w-full py-4 bg-black text-white rounded-2xl font-black hover:bg-amber-400 hover:text-black transition-all shadow-xl disabled:opacity-50"
          >
            Save Shop Details
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ShopRegistration;