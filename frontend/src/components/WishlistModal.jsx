import React from 'react';

const WishlistModal = ({ isOpen, onClose, wishlist, onRemoveFromWishlist, onInquire }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl p-6 shadow-2xl max-h-[85vh] flex flex-col justify-between">
        
        <div>
          <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>❤️</span> My Saved Wishlist ({wishlist.length})
              </h3>
              <p className="text-xs text-slate-400">Vehicles you have bookmarked to review later.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2"
            >
              ✕
            </button>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-sm">
              Your wishlist is currently empty. Click the ❤️ on any vehicle card to save it here!
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[50vh] pr-2">
              {wishlist.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={vehicle.imageUrl}
                      alt=""
                      className="w-16 h-12 object-cover rounded-xl border border-slate-800"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{vehicle.title}</h4>
                      <p className="text-xs text-amber-400 font-semibold">
                        LKR {Number(vehicle.price).toLocaleString()}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {vehicle.manufactureYear} • {vehicle.transmission} • {vehicle.fuelType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onInquire(vehicle);
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition"
                    >
                      Book
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist(vehicle.id)}
                      className="text-slate-500 hover:text-red-400 p-2 text-sm"
                      title="Remove from favorites"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default WishlistModal;