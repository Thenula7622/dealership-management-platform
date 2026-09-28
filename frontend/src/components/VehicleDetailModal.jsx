import React, { useState } from 'react';

const VehicleDetailModal = ({ isOpen, vehicle, config, onClose, onInquire, onOpenCalculator }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !vehicle) return null;

  // Split gallery images or fallback to main image
  let images = [];
  if (vehicle.galleryUrls) {
    images = vehicle.galleryUrls.split(',').filter(Boolean);
  }
  if (images.length === 0 && vehicle.imageUrl) {
    images = [vehicle.imageUrl];
  }

  const formattedPrice = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: config?.currencyCode || 'LKR',
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl p-6 shadow-2xl max-h-[92vh] overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] text-red-500 font-black uppercase tracking-wider">
              {vehicle.conditionType} &bull; {vehicle.manufactureYear}
            </span>
            <h3 className="text-2xl font-black text-white mt-0.5">{vehicle.title}</h3>
            <p className="text-xs text-slate-400">{vehicle.brand} {vehicle.model} &bull; Verified Showroom Unit</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2">✕</button>
        </div>

        {/* 🖼️ IMAGE GALLERY CAROUSEL */}
        <div className="space-y-3">
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={images[activeImageIndex] || vehicle.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700">
                Photo {activeImageIndex + 1} of {images.length}
              </span>
            )}
          </div>

          {/* Thumbnails Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                    activeImageIndex === idx ? 'border-red-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price & Primary Specs */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Dealership Listed Price</span>
            <p className="text-3xl font-black text-amber-400">{formattedPrice}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { onClose(); onInquire(vehicle); }}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Book Test Drive
            </button>
            <button
              onClick={() => { onClose(); onOpenCalculator(vehicle); }}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              📊 Lease Calculator
            </button>
          </div>
        </div>

        {/* Detailed Specs Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Mileage</span>
            <span className="font-bold text-white">{Number(vehicle.mileageKm || 0).toLocaleString()} km</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Engine Capacity</span>
            <span className="font-bold text-white">{vehicle.engineCapacity} cc</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Transmission</span>
            <span className="font-bold text-white">{vehicle.transmission}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Fuel Type</span>
            <span className="font-bold text-white">{vehicle.fuelType}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VehicleDetailModal;