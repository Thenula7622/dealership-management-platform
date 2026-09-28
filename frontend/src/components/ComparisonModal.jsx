import React from 'react';

const ComparisonModal = ({ isOpen, onClose, compareVehicles, onRemoveFromCompare }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl p-7 shadow-2xl my-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-black text-white">Side-by-Side Vehicle Comparison</h3>
            <p className="text-xs text-slate-400">Comparing {compareVehicles.length} selected vehicles</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2"
          >
            ✕
          </button>
        </div>

        {compareVehicles.length === 0 ? (
          <p className="text-slate-400 text-center py-12">No vehicles selected for comparison.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {compareVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-slate-900">
                    <img src={vehicle.imageUrl} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => onRemoveFromCompare(vehicle.id)}
                      className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-500 text-white text-xs px-2 py-1 rounded-md font-bold"
                    >
                      Remove
                    </button>
                  </div>
                  <h4 className="font-bold text-white text-sm truncate">{vehicle.title}</h4>
                  <p className="text-xl font-black text-amber-400 mt-1">
                    LKR {Number(vehicle.price).toLocaleString()}
                  </p>

                  <div className="mt-4 space-y-2 text-xs divide-y divide-slate-900 text-slate-300">
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-500">Category:</span>
                      <span className="font-bold">{vehicle.vehicleType || 'CAR'}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-500">Year:</span>
                      <span className="font-bold">{vehicle.manufactureYear}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-500">Transmission:</span>
                      <span className="font-bold">{vehicle.transmission}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-500">Fuel:</span>
                      <span className="font-bold">{vehicle.fuelType}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-500">Capacity:</span>
                      <span className="font-bold">{vehicle.engineCapacity} cc</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-500">Mileage:</span>
                      <span className="font-bold">{Number(vehicle.mileageKm || 0).toLocaleString()} km</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-500">Condition:</span>
                      <span className="font-bold text-emerald-400">{vehicle.conditionType}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonModal;