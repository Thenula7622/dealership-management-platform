import React from 'react';
import jsPDF from 'jspdf';

const VehicleCard = ({
  vehicle,
  config,
  onInquire,
  onOpenCalculator,
  onOpenInspection,
  onOpenReservation,
  onToggleCompare,
  onViewDetails,
  isCompared,
  isFavorited,
  onToggleFavorite,
  language,
}) => {
  const formattedPrice = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: config?.currencyCode || 'LKR',
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  const businessTitle = config?.businessName || 'Thenula Enterprises';

  const isReserved = vehicle.status === 'RESERVED';

  return (
    <div className="group relative bg-[#0b1325]/90 border border-slate-800/90 rounded-[28px] overflow-hidden hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-950/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Image Preview */}
        <div
          className="relative h-60 w-full overflow-hidden bg-slate-950 cursor-pointer"
          onClick={() => onViewDetails && onViewDetails(vehicle)}
        >
          <img
            src={vehicle.imageUrl}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1325] via-transparent to-black/40" />

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex gap-2 items-center">
            {isReserved ? (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                🔒 HOLD RESERVED
              </span>
            ) : (
              <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {vehicle.conditionType}
              </span>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenInspection && onOpenInspection(vehicle);
              }}
              className="bg-emerald-950/80 hover:bg-emerald-900 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1 transition"
            >
              ✓ Audit Pass
            </button>
          </div>

          <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(vehicle);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition ${
                isFavorited ? 'bg-red-600 text-white shadow-lg scale-110' : 'bg-slate-950/80 text-slate-300 hover:text-red-400 border border-slate-800'
              }`}
            >
              ❤️
            </button>
            <span className="bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-black px-2.5 py-1.5 rounded-xl border border-amber-400/20 shadow">
              {vehicle.manufactureYear}
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
              {vehicle.vehicleType ? vehicle.vehicleType.replace('_', ' ') : 'CAR'} &bull; {vehicle.brand}
            </p>
            <h3 className="text-lg font-black text-white drop-shadow group-hover:text-red-400 transition truncate">
              {vehicle.title}
            </h3>
          </div>
        </div>

        {/* Pricing & CTAs */}
        <div className="p-5">
          <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                {language === 'en' ? 'Offer Price' : 'වටිනාකම'}
              </span>
              <p className="text-2xl font-black text-amber-400 tracking-tight">{formattedPrice}</p>
            </div>

            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => onOpenCalculator && onOpenCalculator(vehicle)}
                className="text-[11px] font-bold text-slate-300 hover:text-amber-400 bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-800 transition shadow-sm"
              >
                📊 Lease
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 text-sm">⚙️</span>
              <span className="truncate font-semibold">{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 text-sm">⛽</span>
              <span className="truncate font-semibold">{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 text-sm">🏎️</span>
              <span className="font-semibold">{vehicle.engineCapacity} cc</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 text-sm">🧭</span>
              <span className="font-semibold">{Number(vehicle.mileageKm || 0).toLocaleString()} km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-5 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onInquire && onInquire(vehicle)}
            className="py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow"
          >
            Test Drive
          </button>

          {/* Module 6: Online Advance Hold Button */}
          <button
            type="button"
            disabled={isReserved}
            onClick={() => onOpenReservation && onOpenReservation(vehicle)}
            className={`py-3 rounded-xl text-xs font-black transition uppercase tracking-wider ${
              isReserved
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
            }`}
          >
            {isReserved ? 'Hold Locked' : '💳 Reserve Unit'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => onToggleCompare && onToggleCompare(vehicle)}
          className={`w-full py-2 rounded-xl text-[11px] font-bold transition border ${
            isCompared ? 'bg-amber-400/10 border-amber-400 text-amber-400' : 'border-slate-800/80 text-slate-400 hover:text-white bg-slate-950/50'
          }`}
        >
          {isCompared ? '✓ Added to Compare' : '+ Add to Comparison'}
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;