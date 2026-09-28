import React, { useState, useEffect } from 'react';

const CustomerProfileModal = ({ isOpen, onClose, customerUser, vehicles, onCancelBooking }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && customerUser?.id) {
      setLoading(true);
      fetch(`http://localhost:8080/api/inquiries/customer/${customerUser.id}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, customerUser]);

  if (!isOpen || !customerUser) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl p-6 shadow-2xl max-h-[88vh] flex flex-col justify-between">
        
        <div>
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-800 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg">
                {customerUser.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{customerUser.name}</h3>
                <p className="text-xs text-slate-400">{customerUser.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>📅</span> My Appointments &amp; Test Drives ({bookings.length})
            </h4>
            <span className="text-[10px] text-slate-500">Live Status from Showroom</span>
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              Loading your bookings...
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-6">
              <span className="text-3xl block mb-2">🚗</span>
              <p className="text-xs text-slate-400">ඔබ තවමත් Test Drive හෝ Vehicle Inspection එකක් වෙන්කර නොමැත.</p>
              <p className="text-[11px] text-slate-500 mt-1">වාහනයක් තෝරා "Book Appointment" ඔබන්න.</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[50vh] pr-2">
              {bookings.map((b) => {
                const targetVehicle = vehicles.find((v) => v.id === b.vehicleId);

                return (
                  <div
                    key={b.id}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {targetVehicle?.imageUrl ? (
                        <img
                          src={targetVehicle.imageUrl}
                          alt=""
                          className="w-14 h-12 object-cover rounded-xl border border-slate-800"
                        />
                      ) : (
                        <div className="w-14 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-xs text-slate-500">
                          Auto
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-white">
                            {targetVehicle?.title || 'General Appointment'}
                          </h5>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                            b.inquiryType === 'TEST_DRIVE'
                              ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {b.inquiryType?.replace('_', ' ') || 'VISIT'}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 mt-0.5">
                          📅 {b.appointmentDate || 'Time slot will be confirmed by showroom'}
                        </p>
                        {b.message && (
                          <p className="text-[10px] text-slate-500 italic mt-0.5 truncate max-w-xs">
                            "{b.message}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-900">
                      <span className="text-[10px] text-slate-500 sm:hidden">Status:</span>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        b.status === 'CONFIRMED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse'
                          : b.status === 'COMPLETED'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : b.status === 'CANCELLED'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {b.status === 'CONFIRMED' ? '✓ Confirmed' : b.status === 'COMPLETED' ? 'Done' : b.status === 'CANCELLED' ? 'Cancelled' : '⏳ Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerProfileModal;