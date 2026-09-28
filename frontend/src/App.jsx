import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VehicleCard from './components/VehicleCard';
import AdminPanel from './components/AdminPanel';
import InquiryModal from './components/InquiryModal';
import FinanceCalculatorModal from './components/FinanceCalculatorModal';
import ComparisonModal from './components/ComparisonModal';
import VehicleDetailModal from './components/VehicleDetailModal';
import InspectionModal from './components/InspectionModal';
import ReservationModal from './components/ReservationModal';
import DealershipChatbot from './components/DealershipChatbot';
import LoginModal from './components/LoginModal';
import WishlistModal from './components/WishlistModal';
import CustomerAuthModal from './components/CustomerAuthModal';
import CustomerProfileModal from './components/CustomerProfileModal';
import Testimonials from './components/Testimonials';
import ContactUs from './components/ContactUs';
import Careers from './components/Careers';
import ServiceCenter from './components/ServiceCenter';
import SparePartsStore from './components/SparePartsStore';
import TradeInModal from './components/TradeInModal';
import Footer from './components/Footer';

// Standalone Demo Fallback Data for Vercel (Backend නොමැතිව වුවද Demo එක ක්‍රියාත්මක වීමට)
const fallbackConfig = {
  businessName: 'Thenula Enterprises',
  tagline: 'Premium & Verified 3S Automotive Hub',
  address: 'Mawathagama, Sri Lanka',
  contactPhone: '94 76 820 2700',
  whatsappNumber: '94768202700',
  email: 'thenula2002@gmail.com',
  currencyCode: 'LKR',
};

const fallbackVehicles = [
  {
    id: 1,
    title: 'Toyota Vitz Safety Edition 2018',
    brand: 'Toyota',
    model: 'Vitz',
    vehicleType: 'CAR',
    manufactureYear: 2018,
    conditionType: 'USED',
    transmission: 'AUTOMATIC',
    fuelType: 'PETROL',
    engineCapacity: 1000,
    mileageKm: 48000,
    price: 7850000,
    purchaseCost: 6900000,
    repairCost: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80',
    engineScore: 95,
    batteryScore: 90,
    suspensionScore: 92,
    bodyPaintScore: 88,
    inspectorNotes: 'Certified Multi-Point Inspection Passed. No structural damage.',
    status: 'AVAILABLE',
  },
  {
    id: 2,
    title: 'Honda Vezel Z Grade 2015',
    brand: 'Honda',
    model: 'Vezel',
    vehicleType: 'CAR',
    manufactureYear: 2015,
    conditionType: 'USED',
    transmission: 'AUTOMATIC',
    fuelType: 'HYBRID',
    engineCapacity: 1500,
    mileageKm: 72000,
    price: 11500000,
    purchaseCost: 10200000,
    repairCost: 80000,
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    engineScore: 92,
    batteryScore: 88,
    suspensionScore: 90,
    bodyPaintScore: 86,
    inspectorNotes: 'Hybrid battery health tested at 88%. Factory original clearcoat.',
    status: 'AVAILABLE',
  },
  {
    id: 3,
    title: 'Toyota Premio G Superior 2018',
    brand: 'Toyota',
    model: 'Premio',
    vehicleType: 'CAR',
    manufactureYear: 2018,
    conditionType: 'USED',
    transmission: 'AUTOMATIC',
    fuelType: 'PETROL',
    engineCapacity: 1500,
    mileageKm: 52000,
    price: 19500000,
    purchaseCost: 17800000,
    repairCost: 60000,
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80',
    engineScore: 96,
    batteryScore: 92,
    suspensionScore: 94,
    bodyPaintScore: 91,
    inspectorNotes: 'Pristine showroom condition with complete agent service records.',
    status: 'AVAILABLE',
  },
  {
    id: 4,
    title: 'Suzuki Alto K10 2015',
    brand: 'Suzuki',
    model: 'Alto',
    vehicleType: 'CAR',
    manufactureYear: 2015,
    conditionType: 'USED',
    transmission: 'MANUAL',
    fuelType: 'PETROL',
    engineCapacity: 1000,
    mileageKm: 68000,
    price: 3450000,
    purchaseCost: 3100000,
    repairCost: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
    engineScore: 90,
    batteryScore: 89,
    suspensionScore: 91,
    bodyPaintScore: 85,
    inspectorNotes: 'Economical city runner in clean running order.',
    status: 'AVAILABLE',
  },
  {
    id: 5,
    title: 'Nissan Leaf Acenta 2018',
    brand: 'Nissan',
    model: 'Leaf',
    vehicleType: 'EV_CAR',
    manufactureYear: 2018,
    conditionType: 'RECONDITION',
    transmission: 'AUTOMATIC',
    fuelType: 'ELECTRIC',
    engineCapacity: 0,
    mileageKm: 38000,
    price: 8900000,
    purchaseCost: 8100000,
    repairCost: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
    engineScore: 94,
    batteryScore: 91,
    suspensionScore: 93,
    bodyPaintScore: 90,
    inspectorNotes: 'High voltage battery degradation check passed. 11/12 bars healthy.',
    status: 'AVAILABLE',
  },
  {
    id: 6,
    title: 'Toyota HiAce KDH 201 2016',
    brand: 'Toyota',
    model: 'HiAce',
    vehicleType: 'VAN',
    manufactureYear: 2016,
    conditionType: 'USED',
    transmission: 'AUTOMATIC',
    fuelType: 'DIESEL',
    engineCapacity: 3000,
    mileageKm: 98000,
    price: 18500000,
    purchaseCost: 16800000,
    repairCost: 90000,
    imageUrl: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&w=1000&q=80',
    galleryUrls: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&w=1000&q=80',
    engineScore: 95,
    batteryScore: 90,
    suspensionScore: 92,
    bodyPaintScore: 89,
    inspectorNotes: 'Smooth transmission shift, turbo diesel engine pressure optimal.',
    status: 'AVAILABLE',
  },
];

const fallbackInquiries = [
  {
    id: 1,
    customerName: 'Saman Kumara',
    phoneNumber: '0772345678',
    inquiryType: 'TEST_DRIVE',
    message: 'I would like to schedule a test drive for the Toyota Vitz 2018 this Saturday.',
    status: 'PENDING',
  },
  {
    id: 2,
    customerName: 'Dilshan Madusanka',
    phoneNumber: '0719876543',
    inquiryType: 'GENERAL_CONTACT',
    message: 'Can I know the maximum leasing amount available for Honda Vezel?',
    status: 'CONTACTED',
  },
];

function App() {
  const [config, setConfig] = useState(fallbackConfig);
  const [vehicles, setVehicles] = useState(fallbackVehicles);
  const [inquiries, setInquiries] = useState(fallbackInquiries);
  const [activeTab, setActiveTab] = useState('inventory');
  const [language, setLanguage] = useState('en');

  // Customer State
  const [customerUser, setCustomerUser] = useState(() => {
    try {
      const saved = localStorage.getItem('customerUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Staff Account Multi-Role State
  const [currentStaffUser, setCurrentStaffUser] = useState(() => {
    try {
      const saved = localStorage.getItem('staffUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isCustomerAuthOpen, setIsCustomerAuthOpen] = useState(false);
  const [isCustomerProfileOpen, setIsCustomerProfileOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(30000000);
  const [maxMileage, setMaxMileage] = useState(300000);

  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [calcVehicle, setCalcVehicle] = useState(null);
  const [detailVehicle, setDetailVehicle] = useState(null);
  const [inspectionVehicle, setInspectionVehicle] = useState(null);
  const [reservationVehicle, setReservationVehicle] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const categories = [
    { id: 'ALL', label: 'All Fleet', icon: '✨' },
    { id: 'CAR', label: 'Sedan & Hatch', icon: '🚗' },
    { id: 'EV_CAR', label: 'Electric EV', icon: '⚡' },
    { id: 'BIKE', label: 'Motorcycles', icon: '🏍️' },
    { id: 'SCOOTER', label: 'Scooters', icon: '🛵' },
    { id: 'THREE_WHEEL', label: 'Three Wheels', icon: '🛺' },
    { id: 'VAN', label: 'Vans & Wagons', icon: '🚐' },
    { id: 'BUS', label: 'Buses', icon: '🚌' },
    { id: 'TRUCK', label: 'Trucks', icon: '🚚' },
    { id: 'PRIME_MOVER', label: 'Heavy Prime Movers', icon: '🚛' },
  ];

  // Fetch with Fallback: Local Backend සක්‍රීය නම් Backend දත්ත ගනී, Vercel එකේදී Fallback දත්ත භාවිතා කරයි
  useEffect(() => {
    fetch('http://localhost:8080/api/config')
      .then((r) => r.json())
      .then((d) => {
        if (d && Object.keys(d).length > 0) setConfig(d);
      })
      .catch(() => setConfig(fallbackConfig));

    fetch('http://localhost:8080/api/vehicles')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setVehicles(d);
      })
      .catch(() => setVehicles(fallbackVehicles));

    fetch('http://localhost:8080/api/inquiries')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setInquiries(d);
      })
      .catch(() => setInquiries(fallbackInquiries));
  }, []);

  const handleStaffLoginSuccess = (staffUser) => {
    localStorage.setItem('staffUser', JSON.stringify(staffUser));
    setCurrentStaffUser(staffUser);
    setActiveTab('admin');
  };

  const handleStaffLogout = () => {
    localStorage.removeItem('staffUser');
    setCurrentStaffUser(null);
    setActiveTab('inventory');
  };

  const handleToggleFavorite = (vehicle) => {
    if (!customerUser) return setIsCustomerAuthOpen(true);
    setWishlist((prev) =>
      prev.find((v) => v.id === vehicle.id)
        ? prev.filter((v) => v.id !== vehicle.id)
        : [...prev, vehicle]
    );
  };

  const handleToggleCompare = (vehicle) => {
    if (compareList.find((v) => v.id === vehicle.id)) {
      setCompareList(compareList.filter((v) => v.id !== vehicle.id));
    } else {
      if (compareList.length >= 3) return alert('Maximum 3 vehicles for comparison.');
      setCompareList([...compareList, vehicle]);
    }
  };

  const handleReservationSuccess = (vehicleId) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, status: 'RESERVED' } : v))
    );
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || (v.vehicleType || 'CAR') === selectedCategory;
    const matchesPrice = parseFloat(v.price) <= maxPrice;
    const matchesMileage = parseInt(v.mileageKm || 0, 10) <= maxMileage;
    return matchesSearch && matchesCategory && matchesPrice && matchesMileage;
  });

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans flex flex-col justify-between antialiased">
      <div>
        <Navbar
          config={config}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAdminAuthenticated={!!currentStaffUser}
          onOpenLogin={() => setIsAdminLoginOpen(true)}
          onLogout={handleStaffLogout}
          customerUser={customerUser}
          onOpenCustomerAuth={() => setIsCustomerAuthOpen(true)}
          onCustomerLogout={() => {
            localStorage.removeItem('customerUser');
            setCustomerUser(null);
          }}
          onOpenCustomerProfile={() => setIsCustomerProfileOpen(true)}
          onOpenTradeIn={() => setIsTradeInOpen(true)}
          wishlistCount={wishlist.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          language={language}
          setLanguage={setLanguage}
        />

        {activeTab === 'inventory' && (
          <div>
            <div className="relative overflow-hidden pt-12 pb-20 px-6 border-b border-slate-800/60 bg-gradient-to-b from-[#0b1222] via-[#070b14] to-[#070b14]">
              <div className="max-w-7xl mx-auto text-center space-y-6">
                <span className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-bold">
                  Verified 3S Automotive Showroom &bull; Online Advance Hold Available
                </span>
                <h1 className="text-4xl sm:text-6xl font-black text-white">
                  Find &amp; Hold Your Vehicle at <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500">
                    {config?.businessName || 'Thenula Enterprises'}
                  </span>
                </h1>
              </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                      selectedCategory === cat.id
                        ? 'bg-red-600 border-red-500 text-white font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-[10px] font-bold">{cat.label}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    config={config}
                    onInquire={(v) => setSelectedVehicle(v)}
                    onOpenCalculator={(v) => setCalcVehicle(v)}
                    onOpenInspection={(v) => setInspectionVehicle(v)}
                    onOpenReservation={(v) => setReservationVehicle(v)}
                    onToggleCompare={handleToggleCompare}
                    onViewDetails={(v) => setDetailVehicle(v)}
                    isCompared={!!compareList.find((item) => item.id === vehicle.id)}
                    isFavorited={!!wishlist.find((w) => w.id === vehicle.id)}
                    onToggleFavorite={handleToggleFavorite}
                    language={language}
                  />
                ))}
              </div>
            </main>

            <Testimonials language={language} />
          </div>
        )}

        {activeTab === 'service' && <ServiceCenter config={config} customerUser={customerUser} />}
        {activeTab === 'spare-parts' && <SparePartsStore config={config} customerUser={customerUser} />}
        {activeTab === 'contact' && <ContactUs config={config} />}
        {activeTab === 'careers' && <Careers config={config} />}

        {/* Admin Dashboard */}
        {activeTab === 'admin' && (
          <main className="max-w-7xl mx-auto px-6 py-8">
            {currentStaffUser ? (
              <AdminPanel
                config={config}
                setConfig={setConfig}
                vehicles={vehicles}
                setVehicles={setVehicles}
                inquiries={inquiries}
                currentStaffUser={currentStaffUser}
                onLogout={handleStaffLogout}
              />
            ) : (
              <div className="text-center py-24 bg-slate-900/60 rounded-3xl border border-slate-800 max-w-lg mx-auto p-8 shadow-2xl">
                <span className="text-4xl mb-4 block">🔒</span>
                <h3 className="text-2xl font-black text-white mb-2">Staff Login Required</h3>
                <p className="text-slate-400 text-xs mb-6">කරුණාකර ඔබගේ Staff Email සහ Password මඟින් Login වන්න.</p>
                <button
                  type="button"
                  onClick={() => setIsAdminLoginOpen(true)}
                  className="px-6 py-3.5 bg-red-600 text-white font-black rounded-xl text-xs uppercase tracking-wider"
                >
                  Sign In to Staff Panel
                </button>
              </div>
            )}
          </main>
        )}

        {/* Compare Drawer Modal */}
        {compareList.length > 0 && activeTab === 'inventory' && (
          <div className="fixed bottom-6 right-6 z-40 bg-slate-900/95 border border-amber-400/50 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
            <div>
              <p className="text-xs font-bold text-white">{compareList.length} Vehicles Selected</p>
              <p className="text-[10px] text-slate-400">Compare specs side-by-side</p>
            </div>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-black hover:bg-amber-300 transition"
            >
              Compare Now
            </button>
          </div>
        )}

        {/* Modals */}
        <InquiryModal
          isOpen={!!selectedVehicle}
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onInquirySent={(newIq) => setInquiries([newIq, ...inquiries])}
          customerUser={customerUser}
        />
        <FinanceCalculatorModal
          isOpen={!!calcVehicle}
          vehicle={calcVehicle}
          config={config}
          onClose={() => setCalcVehicle(null)}
        />
        <InspectionModal
          isOpen={!!inspectionVehicle}
          vehicle={inspectionVehicle}
          config={config}
          onClose={() => setInspectionVehicle(null)}
        />
        <ReservationModal
          isOpen={!!reservationVehicle}
          vehicle={reservationVehicle}
          config={config}
          customerUser={customerUser}
          onClose={() => setReservationVehicle(null)}
          onReservationSuccess={handleReservationSuccess}
        />
        <ComparisonModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          compareVehicles={compareList}
          onRemoveFromCompare={(id) => setCompareList(compareList.filter((v) => v.id !== id))}
        />
        <VehicleDetailModal
          isOpen={!!detailVehicle}
          vehicle={detailVehicle}
          config={config}
          onClose={() => setDetailVehicle(null)}
          onInquire={(v) => setSelectedVehicle(v)}
          onOpenCalculator={(v) => setCalcVehicle(v)}
        />
        <TradeInModal
          isOpen={isTradeInOpen}
          onClose={() => setIsTradeInOpen(false)}
          customerUser={customerUser}
          vehicles={vehicles}
        />
        <LoginModal
          isOpen={isAdminLoginOpen}
          onClose={() => setIsAdminLoginOpen(false)}
          onLoginSuccess={handleStaffLoginSuccess}
        />
        <CustomerAuthModal
          isOpen={isCustomerAuthOpen}
          onClose={() => setIsCustomerAuthOpen(false)}
          onAuthSuccess={(user) => setCustomerUser(user)}
        />
        <CustomerProfileModal
          isOpen={isCustomerProfileOpen}
          onClose={() => setIsCustomerProfileOpen(false)}
          customerUser={customerUser}
          vehicles={vehicles}
        />
        <WishlistModal
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlist={wishlist}
          onInquire={(v) => setSelectedVehicle(v)}
        />

        {/* AI Dealership Assistant Widget */}
        <DealershipChatbot
          vehicles={vehicles}
          config={config}
          onInquire={(v) => setSelectedVehicle(v)}
          onOpenCalculator={(v) => setCalcVehicle(v)}
        />
      </div>

      <Footer config={config} onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}

export default App;