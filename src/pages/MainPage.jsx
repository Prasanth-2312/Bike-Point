import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Search, Filter, Bike, Settings, LogOut, X, Map as MapIcon, ChevronRight, Maximize2, Minimize2, Search as SearchIcon, Plus, Check, Info, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ShopRegistration from '../forms/ShopRegistration';

// Fix for Leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for different categories
const serviceIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const workshopIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const sparesIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Custom Blue Icon for User Location
const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const center = [13.0827, 80.2707]; // Chennai coordinates

const bikePoints = [
  // Service Centers (Red)
  { id: 1, name: "Official Yamaha Service", lat: 13.0850, lng: 80.2750, type: "Service Center", address: "Anna Salai, Chennai", phone: "+91 98765 43210" },
  { id: 4, name: "Honda Care Center", lat: 13.0950, lng: 80.2550, type: "Service Center", address: "T. Nagar, Chennai", phone: "+91 98765 43213" },
  { id: 7, name: "KTM Pro Service", lat: 13.0650, lng: 80.2700, type: "Service Center", address: "Egmore, Chennai", phone: "+91 98765 43216" },
  { id: 9, name: "Suzuki Master Service", lat: 13.0900, lng: 80.2450, type: "Service Center", address: "Nungambakkam, Chennai", phone: "+91 98765 43218" },
  
  // Workshops (Green)
  { id: 2, name: "Royal Enfield Workshop", lat: 13.0750, lng: 80.2650, type: "Workshop", address: "Mylapore, Chennai", phone: "+91 98765 43211" },
  { id: 5, name: "Speedy Two-Wheeler Workshop", lat: 13.0680, lng: 80.2800, type: "Workshop", address: "Adyar, Chennai", phone: "+91 98765 43214" },
  { id: 8, name: "Local Mechanic Garage", lat: 13.1050, lng: 80.2750, type: "Workshop", address: "Velachery, Chennai", phone: "+91 98765 43217" },
  { id: 10, name: "Expert Bike Repairs", lat: 13.0750, lng: 80.2900, type: "Workshop", address: "Besant Nagar, Chennai", phone: "+91 98765 43219" },
  
  // Spare Parts (Violet)
  { id: 3, name: "TVS Spare Parts Hub", lat: 13.0950, lng: 80.2850, type: "Spare Parts", address: "Mount Road, Chennai", phone: "+91 98765 43212" },
  { id: 6, name: "Genuine Spares & Accessories", lat: 13.0800, lng: 80.2950, type: "Spare Parts", address: "OMR, Chennai", phone: "+91 98765 43215" },
  { id: 11, name: "Bike Spares World", lat: 13.1100, lng: 80.2650, type: "Spare Parts", address: "Ambattur, Chennai", phone: "+91 98765 43220" },
  { id: 12, name: "Two-Wheeler Parts Plaza", lat: 13.0550, lng: 80.2600, type: "Spare Parts", address: "Guindy, Chennai", phone: "+91 98765 43221" },
];

const getIconByType = (type) => {
  switch (type) {
    case 'Service Center': return serviceIcon;
    case 'Workshop': return workshopIcon;
    case 'Spare Parts': return sparesIcon;
    default: return serviceIcon;
  }
};

// Routing Component
const Routing = ({ source, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!source || !destination || !map) return;

    // Ensure Routing is available on L
    if (!L.Routing || !L.Routing.control) {
      console.error("Leaflet Routing Machine is not available");
      return;
    }

    let routingControl = null;

    try {
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(source[0], source[1]),
          L.latLng(destination[0], destination[1])
        ],
        lineOptions: {
          styles: [{ color: '#f59e0b', weight: 6, opacity: 0.8 }]
        },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: true,
        createMarker: () => null // Don't create extra markers
      }).addTo(map);
    } catch (error) {
      console.error("Failed to initialize routing control", error);
    }

    return () => {
      if (routingControl && map) {
        try {
          // Check if map still exists and has the control
          // Leaflet doesn't have a direct 'hasControl' but we can check internal state
          if (map._container) {
            map.removeControl(routingControl);
          }
        } catch (e) {
          console.warn("Error removing routing control", e);
        }
      }
    };
  }, [map, source, destination]);

  return null;
};

// Custom Search Component
const CustomSearch = ({ onResult }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const provider = new OpenStreetMapProvider();

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 2) {
      setIsSearching(true);
      const searchResults = await provider.search({ query: val });
      setResults(searchResults);
      setIsSearching(false);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="absolute top-6 left-6 z-1001 w-72 md:w-96">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon size={18} className="text-gray-400 group-focus-within:text-amber-500 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for a workshop or place..."
          className="block w-full pl-11 pr-4 py-4 bg-white border-none rounded-2xl shadow-2xl focus:ring-2 focus:ring-amber-500 transition-all text-sm font-medium placeholder:text-gray-400"
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-60 overflow-y-auto"
          >
            {results.map((result, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onResult([result.y, result.x]);
                  setResults([]);
                  setQuery(result.label);
                }}
                className="w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors border-b border-gray-50 last:border-none flex items-start gap-3"
              >
                <MapPin size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <span className="text-xs font-medium text-gray-600 line-clamp-2">{result.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Map Events Component for picking location
const MapEvents = ({ onMapClick, isPickingLocation }) => {
  useMapEvents({
    click: (e) => {
      if (isPickingLocation) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
};

// Component to handle map resizing when layout changes
const MapResizer = ({ isFullScreen, isSidebarOpen }) => {
  const map = useMap();
  
  useEffect(() => {
    // Small delay to allow CSS transitions to finish
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [map, isFullScreen, isSidebarOpen]);
  
  return null;
};

const MainPage = () => {
  const navigate = useNavigate();
  const [allBikePoints, setAllBikePoints] = useState(bikePoints);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [userLocation, setUserLocation] = useState(center);
  const [routingTo, setRoutingTo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapType, setMapType] = useState('streets');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);

  // Add Shop States
  const [isAddingShop, setIsAddingShop] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [isPickingDestination, setIsPickingDestination] = useState(false);
  const [newShopData, setNewShopData] = useState({
    name: '',
    type: 'Workshop',
    address: '',
    phone: '',
    lat: null,
    lng: null
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          toast.error("Could not get your location. Using default.");
        }
      );
    }
  }, []);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  const startRouting = (point) => {
    if (!userLocation) {
      toast.error("User location not found. Please enable GPS.");
      return;
    }
    setRoutingTo([point.lat, point.lng]);
    setSelectedPoint(null);
    toast.success(`Routing to ${point.name}`);
  };

  const handleSearchResult = (coords) => {
    if (mapInstance) {
      mapInstance.setView(coords, 15);
      setSearchMarker(coords);
    }
  };

  const handleMapClick = (latlng) => {
    if (isPickingLocation) {
      setNewShopData(prev => ({ ...prev, lat: latlng.lat, lng: latlng.lng }));
      setIsPickingLocation(false);
      toast.success("Location picked successfully!");
    } else if (isPickingDestination) {
      setRoutingTo([latlng.lat, latlng.lng]);
      setIsPickingDestination(false);
      toast.success("Destination set successfully!");
    }
  };

  const saveNewShop = (e) => {
    e.preventDefault();
    if (!newShopData.lat || !newShopData.lng) {
      toast.error("Please pick a location on the map first.");
      return;
    }

    if (newShopData.id) {
      // Update existing shop
      setAllBikePoints(prev => prev.map(shop => shop.id === newShopData.id ? newShopData : shop));
      toast.success(`${newShopData.name} updated successfully!`);
    } else {
      // Add new shop
      const shopToAdd = {
        ...newShopData,
        id: Date.now(),
      };
      setAllBikePoints(prev => [...prev, shopToAdd]);
      toast.success(`${shopToAdd.name} added to the map!`);
    }

    setIsAddingShop(false);
    setIsEditing(false);
    setNewShopData({ name: '', type: 'Workshop', address: '', phone: '', lat: null, lng: null });
  };

  const editShop = (shop) => {
    setNewShopData(shop);
    setIsEditing(true);
    setIsAddingShop(true);
  };

  const selectShop = (shop) => {
    setSelectedPoint(shop);
    if (mapInstance) {
      mapInstance.setView([shop.lat, shop.lng], 15);
    }
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && !isFullScreen && (
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed md:relative z-2000 w-72 h-full bg-white border-r border-gray-100 flex flex-col shadow-2xl md:shadow-none"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black text-amber-500 italic">BIKE POINT</h1>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Dashboard</p>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <nav className="grow p-4 space-y-2">
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setNewShopData({ name: '', type: 'Workshop', address: '', phone: '', lat: null, lng: null });
                  setIsAddingShop(true);
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-black text-white font-bold transition-all cursor-pointer hover:bg-amber-400 hover:text-black mb-4"
              >
                <Plus size={20} />
                <span>Add My Shop</span>
              </button>

              {/* My Shops List */}
              <div className="mb-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-2">My Registered Shops</p>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {allBikePoints.filter(p => !bikePoints.find(bp => bp.id === p.id)).length === 0 ? (
                    <p className="text-[10px] text-gray-400 italic px-2">No shops added yet</p>
                  ) : (
                    allBikePoints.filter(p => !bikePoints.find(bp => bp.id === p.id)).map(shop => (
                      <div key={shop.id} className="group flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-amber-50 transition-all">
                        <button 
                          onClick={() => selectShop(shop)}
                          className="grow text-left"
                        >
                          <p className="text-xs font-bold text-gray-800 truncate">{shop.name}</p>
                          <p className="text-[10px] text-amber-600 font-medium">{shop.type}</p>
                        </button>
                        <button 
                          onClick={() => editShop(shop)}
                          className="p-2 text-gray-400 hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100"
                          title="Edit Shop"
                        >
                          <Settings size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsPickingDestination(true);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all cursor-pointer mb-2 ${isPickingDestination ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}
              >
                <Navigation size={20} />
                <span>Pick Destination on Map</span>
              </button>

              {routingTo && (
                <button 
                  onClick={() => setRoutingTo(null)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 text-red-600 font-bold transition-all cursor-pointer mb-2 hover:bg-red-100"
                >
                  <X size={20} />
                  <span>Clear Route</span>
                </button>
              )}

              <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-amber-50 text-amber-600 font-bold transition-all cursor-pointer">
                <MapPin size={20} />
                <span>Nearby Points</span>
              </button>
              
              {/* Legend */}
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Map Legend</p>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
                  <span className="text-xs font-bold text-gray-600">Service Center</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
                  <span className="text-xs font-bold text-gray-600">Workshop</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-violet-500 shadow-sm"></div>
                  <span className="text-xs font-bold text-gray-600">Spare Parts</span>
                </div>
              </div>

              <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 font-bold transition-all cursor-pointer">
                <Bike size={20} />
                <span>My Bookings</span>
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 font-bold transition-all cursor-pointer">
                <Settings size={20} />
                <span>Settings</span>
              </button>
            </nav>

            <div className="p-4 border-t border-gray-100">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-600 font-bold transition-all cursor-pointer"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`grow w-full flex flex-col relative transition-all duration-500 ${isFullScreen ? 'p-0' : 'p-6'}`}>
        {/* Toggle Sidebar Button */}
        {!isSidebarOpen && !isFullScreen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-12 left-12 z-1001 p-4 bg-white rounded-2xl shadow-xl hover:bg-gray-50 transition-all cursor-pointer border border-gray-100"
          >
            <ChevronRight size={24} className="text-amber-500" />
          </button>
        )}

        {/* Map Wrapper with specific dimensions */}
        <div className={`relative grow w-full overflow-hidden transition-all duration-500 ${isFullScreen ? 'rounded-none' : 'rounded-[2.5rem] shadow-2xl border-8 border-white'}`}>
          
          <CustomSearch onResult={handleSearchResult} />

          {/* Picking Mode Overlay */}
          <AnimatePresence>
            {isPickingDestination && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-24 left-1/2 -translate-x-1/2 z-1000 bg-black text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 border-2 border-amber-500"
              >
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                Click anywhere on map to set destination
                <button onClick={() => setIsPickingDestination(false)} className="ml-2 p-1 hover:bg-white/20 rounded-full">
                  <X size={16} />
                </button>
              </motion.div>
            )}

            {isPickingLocation && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-24 left-1/2 -translate-x-1/2 z-2000 bg-black/80 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border border-white/20"
              >
                <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-sm font-black uppercase tracking-widest">Click on the map to set location</span>
                <button 
                  onClick={() => setIsPickingLocation(false)}
                  className="ml-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                  title="Cancel Picking"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <MapContainer 
            center={center} 
            zoom={13} 
            style={{ height: '100%', width: '100%', filter: 'saturate(1.2) contrast(1.05)' }}
            zoomControl={false}
            ref={setMapInstance}
          >
            {mapType === 'streets' ? (
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
            ) : (
              <TileLayer
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            )}
            
            {routingTo && (
              <Marker position={routingTo} icon={serviceIcon}>
                <Popup>Destination</Popup>
              </Marker>
            )}

            {routingTo && (
              <Routing source={userLocation} destination={routingTo} />
            )}

            <MapResizer isFullScreen={isFullScreen} isSidebarOpen={isSidebarOpen} />
            <MapEvents 
              isPickingLocation={isPickingLocation || isPickingDestination} 
              onMapClick={handleMapClick} 
            />

            {/* Search Result Marker */}
            {searchMarker && (
              <Marker position={searchMarker} icon={blueIcon}>
                <Popup>Search Result</Popup>
              </Marker>
            )}

            {/* User Location Marker */}
            <Marker position={userLocation} icon={blueIcon}>
              <Popup>You are here</Popup>
            </Marker>

            {allBikePoints.map(point => (
              <Marker 
                key={point.id} 
                position={[point.lat, point.lng]}
                icon={getIconByType(point.type)}
                eventHandlers={{
                  click: () => {
                    setSelectedPoint(point);
                    setRoutingTo(null);
                  },
                }}
              >
                <Popup>
                  <div className="p-2 min-w-37.5">
                    <div className="font-bold text-lg mb-1">{point.name}</div>
                    <div className="text-xs text-amber-600 font-bold uppercase mb-2">{point.type}</div>
                    <div className="text-xs text-gray-500 mb-3">{point.address}</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        startRouting(point);
                      }}
                      className="w-full bg-amber-400 text-black text-xs font-bold py-2 rounded-lg hover:bg-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Navigation size={14} /> Get Directions
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Floating Controls */}
            <div className="absolute top-6 right-6 z-1000 flex flex-col gap-4">
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-4 bg-white rounded-2xl shadow-xl hover:bg-gray-50 transition-all cursor-pointer border border-gray-100 text-amber-500"
                title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
              >
                {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button 
                onClick={() => setMapType(mapType === 'streets' ? 'satellite' : 'streets')}
                className="p-4 bg-white rounded-2xl shadow-xl hover:bg-gray-50 transition-all cursor-pointer border border-gray-100 text-amber-500"
                title="Toggle Map Type"
              >
                <MapIcon size={20} />
              </button>
              <button 
                onClick={() => setRoutingTo(null)}
                className={`p-4 bg-white rounded-2xl shadow-xl hover:bg-gray-50 transition-all cursor-pointer border border-gray-100 ${routingTo ? 'text-red-500' : 'text-gray-400'}`}
                title="Clear Route"
              >
                <X size={20} />
              </button>
              <button 
                onClick={() => {
                  if (mapInstance) {
                    mapInstance.setView(userLocation, 15);
                  }
                }}
                className="p-4 bg-white rounded-2xl shadow-xl hover:bg-gray-50 transition-all cursor-pointer border border-gray-100 text-amber-500"
                title="My Location"
              >
                <Navigation size={20} />
              </button>
            </div>
          </MapContainer>
        </div>

        {/* Selected Point Info Card */}
        <AnimatePresence>
          {selectedPoint && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-10 left-6 right-6 md:left-auto md:right-10 md:w-96 bg-white rounded-3xl shadow-2xl p-8 z-1000 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-amber-100 text-amber-600 text-[10px] font-black rounded-full uppercase tracking-wider">
                      {selectedPoint.type}
                    </span>
                    <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      Open Now
                    </span>
                  </div>
                  <h3 className="text-2xl font-black">{selectedPoint.name}</h3>
                  <p className="text-sm text-gray-400 font-medium mt-1">{selectedPoint.address}</p>
                </div>
                <button 
                  onClick={() => setSelectedPoint(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => startRouting(selectedPoint)}
                  className="bg-amber-400 text-black font-bold py-4 rounded-2xl hover:bg-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-200"
                >
                  <Navigation size={18} /> Route
                </button>
                <button className="border-2 border-amber-400 text-amber-600 font-bold py-4 rounded-2xl hover:bg-amber-50 transition-all cursor-pointer">
                  Book Service
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Shop Modal */}
        <AnimatePresence>
          <ShopRegistration 
            isOpen={isAddingShop}
            onClose={() => {
              setIsAddingShop(false);
              setIsEditing(false);
              setNewShopData({ name: '', type: 'Workshop', address: '', phone: '', lat: null, lng: null });
            }}
            onSave={saveNewShop}
            newShopData={newShopData}
            setNewShopData={setNewShopData}
            isPickingLocation={isPickingLocation}
            setIsPickingLocation={setIsPickingLocation}
            isEditing={isEditing}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainPage;
