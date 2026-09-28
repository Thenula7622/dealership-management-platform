import React from 'react';

const Footer = ({ config, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Dealership Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center">
                <span className="text-red-500 font-black text-lg">
                  {config?.businessName ? config.businessName.charAt(0) : 'T'}
                </span>
              </div>
              <h3 className="text-lg font-black text-white tracking-wide uppercase">
                {config?.businessName || 'Thenula Enterprises'}
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              {config?.tagline || 'Premium automotive showroom offering verified vehicles with certified documents and trusted warranty.'}
            </p>
            <p className="text-xs text-slate-500">
              📍 {config?.address || 'Mawathagama, Sri Lanka'}
            </p>
          </div>

          {/* Quick Links Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <div className="text-xs space-y-1.5 flex flex-col items-start">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('inventory')}
                className="hover:text-white transition"
              >
                → Vehicle Inventory
              </button>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="hover:text-white transition"
              >
                → Contact Us & Location
              </button>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('careers')}
                className="hover:text-amber-400 transition"
              >
                → Careers & Vacancies
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Inquiries</h4>
            <div className="text-xs space-y-1.5 text-slate-400">
              <p>
                <span className="text-slate-500">Hotline:</span>{' '}
                <a href={`tel:${config?.contactPhone}`} className="hover:text-white font-medium">
                  {config?.contactPhone || '+94 77 123 4567'}
                </a>
              </p>
              <p>
                <span className="text-slate-500">WhatsApp:</span>{' '}
                <a 
                  href={`https://wa.me/${config?.whatsappNumber || '94771234567'}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-400 font-medium text-emerald-500"
                >
                  +{config?.whatsappNumber || '94771234567'}
                </a>
              </p>
              <p>
                <span className="text-slate-500">Email:</span>{' '}
                <a href={`mailto:${config?.email}`} className="hover:text-white font-medium">
                  {config?.email || 'contact@dealership.com'}
                </a>
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Showroom Hours</h4>
            <div className="text-xs space-y-1 text-slate-400">
              <p className="flex justify-between">
                <span>Mon - Sat:</span>
                <span className="text-slate-300 font-semibold">8:30 AM - 6:30 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-slate-300 font-semibold">9:00 AM - 2:00 PM</span>
              </p>
              <p className="text-[11px] text-emerald-400 font-semibold pt-1">
                ✓ Online Inquiries Open 24/7
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Developer Signature */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            © {currentYear} <span className="text-slate-300 font-semibold">{config?.businessName || 'Thenula Enterprises'}</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl text-center shadow-inner">
            <span className="text-slate-500">Designed &amp; Developed by</span>
            <span className="font-extrabold text-white tracking-wide">
              Thenula Rathnayaka
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400 font-bold">
              Fullstack Developer &bull; Software Engineer
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;