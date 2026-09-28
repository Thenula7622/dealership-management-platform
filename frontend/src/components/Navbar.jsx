import React from 'react';

const Navbar = ({
  config,
  activeTab,
  setActiveTab,
  isAdminAuthenticated,
  onOpenLogin,
  onLogout,
  customerUser,
  onOpenCustomerAuth,
  onCustomerLogout,
  onOpenCustomerProfile,
  onOpenTradeIn,
  wishlistCount,
  onOpenWishlist,
  language,
  setLanguage,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Dealership Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setActiveTab('inventory')}
        >
          <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center">
            <span className="text-red-500 font-black text-xl">
              {config?.businessName ? config.businessName.charAt(0) : 'T'}
            </span>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wide text-white uppercase">
              {config?.businessName || 'Thenula Enterprises'}
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              {config?.address || 'Mawathagama, Sri Lanka'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('inventory')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTab === 'inventory' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Fleet' : 'වාහන'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('service')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTab === 'service' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Workshop' : 'සේවා පියස'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('spare-parts')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTab === 'spare-parts' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Spare Parts' : 'අමතර කොටස්'}
            </button>

            <button
              type="button"
              onClick={onOpenTradeIn}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-400/10 border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-slate-950 transition"
            >
              🔄 Sell / Trade-In
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTab === 'contact' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Contact' : 'සම්බන්ධ වන්න'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('careers')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTab === 'careers' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Careers' : 'ඇබෑර්තු'}
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'si' : 'en')}
            className="px-2 py-1 rounded-lg border border-slate-700 bg-slate-800/80 text-[11px] font-bold text-amber-400 hover:border-amber-400 transition"
          >
            {language === 'en' ? 'සිං' : 'EN'}
          </button>

          {/* Wishlist */}
          {customerUser && (
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-red-400 transition flex items-center gap-1.5"
            >
              <span className="text-base">❤️</span>
              {wishlistCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
          )}

          {/* Customer Profile Status */}
          {customerUser ? (
            <div className="flex items-center gap-1.5 bg-slate-950/70 border border-slate-800 px-2.5 py-1 rounded-xl">
              <button
                type="button"
                onClick={onOpenCustomerProfile}
                className="flex items-center gap-1.5 hover:opacity-80 transition"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold text-white truncate max-w-[80px]">
                  {customerUser.name}
                </span>
              </button>
              <button
                type="button"
                onClick={onCustomerLogout}
                className="text-[10px] font-semibold text-slate-400 hover:text-red-400 ml-1"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenCustomerAuth}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition"
            >
              👤 {language === 'en' ? 'Sign In' : 'පිවිසෙන්න'}
            </button>
          )}

          {/* Admin Panel Link */}
          {isAdminAuthenticated ? (
            <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/60 px-2.5 py-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('admin')}
                className={`text-xs font-bold transition ${
                  activeTab === 'admin' ? 'text-red-500' : 'text-slate-300 hover:text-white'
                }`}
              >
                ⚙️ Admin
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="text-[10px] font-bold text-slate-400 hover:text-red-400 ml-1 px-1 py-0.5 rounded bg-slate-900 border border-slate-800"
              >
                Exit
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition flex items-center gap-1.5"
            >
              <span>🔒</span>
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;