import React, { useState, useEffect } from 'react';

const ServiceCenter = ({ config, customerUser }) => {
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'track'
  const [existingBookings, setExistingBookings] = useState([]);

  // Time Slots Schedule
  const standardSlots = [
    '08:30 AM - 10:30 AM',
    '10:30 AM - 12:30 PM',
    '01:30 PM - 03:30 PM',
    '03:30 PM - 05:30 PM'
  ];

  // Booking Form State
  const [form, setForm] = useState({
    name: customerUser?.name || '',
    phone: '',
    vehicleNumber: '',
    vehicleModel: '',
    serviceType: 'FULL_SERVICE',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '08:30 AM - 10:30 AM',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Tracking State
  const [trackNumber, setTrackNumber] = useState('');
  const [trackingResults, setTrackingResults] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/services')
      .then(r => r.json())
      .then(d => setExistingBookings(d))
      .catch(e => console.error(e));
  }, []);

  const servicePackages = [
    { id: 'FULL_SERVICE', title: 'Complete Lubrication & Filter Service', icon: '🛢️', desc: 'Engine oil, oil filter, air filter, coolant check and chassis lubrication.' },
    { id: 'HYBRID_SCAN', title: 'Hybrid & Electrical Scan Diagnostic', icon: '⚡', desc: 'Battery cell analysis, inverter check, electronic ECU scan diagnostic.' },
    { id: 'BRAKE_SERVICE', title: 'Brake Pad & Rotor Maintenance', icon: '🛑', desc: 'Brake calipers overhaul, disc facing, pad replacement, hydraulic brake flush.' },
    { id: 'ENGINE_TUNEUP', title: 'Engine Tune-Up & Injector Cleaning', icon: '⚙️', desc: 'Spark plug replacement, fuel injector ultrasonic clean, throttle body flush.' },
    { id: 'WHEEL_ALIGNMENT', title: '3D Wheel Alignment & Balancing', icon: '🛞', desc: 'Laser tire alignment, dynamic balancing and suspension joints inspection.' },
    { id: 'GENERAL_REPAIR', title: 'Mechanical & General Inspection', icon: '🔧', desc: 'Suspension, transmission, steering or body diagnostic investigation.' },
  ];

  // Feature 3: Check which slots are already booked for the selected date
  const bookedSlotsForSelectedDate = existingBookings
    .filter(b => b.preferredDate === form.preferredDate && b.status !== 'CANCELLED')
    .map(b => b.preferredTime);

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.vehicleNumber) {
      alert('කරුණාකර සියලු අනිවාර්ය තොරතුරු පුරවන්න.');
      return;
    }

    if (bookedSlotsForSelectedDate.includes(form.preferredTime)) {
      alert('කරුණාකර වෙනත් වේලාවක් (Slot) තෝරන්න. ඔබ තෝරාගත් වේලාව දැනටමත් වෙන්කරවා ගෙන ඇත.');
      return;
    }

    setSubmitting(true);
    const payload = {
      customerId: customerUser?.id || null,
      customerName: form.name,
      phoneNumber: form.phone,
      vehicleNumber: form.vehicleNumber.toUpperCase().trim(),
      vehicleModel: form.vehicleModel,
      serviceType: form.serviceType,
      preferredDate: form.preferredDate,
      preferredTime: form.preferredTime,
      notes: form.notes,
      status: 'RECEIVED'
    };

    try {
      const res = await fetch('http://localhost:8080/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        setExistingBookings([saved, ...existingBookings]);
        alert('ඔබගේ සේවා වෙන්කිරීම (Service Booking) සාර්ථකයි! අපගේ සේවා කළමනාකරු ඔබව අමතනු ඇත.');
        setForm({
          name: customerUser?.name || '',
          phone: '',
          vehicleNumber: '',
          vehicleModel: '',
          serviceType: 'FULL_SERVICE',
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: '08:30 AM - 10:30 AM',
          notes: ''
        });
      }
    } catch (err) {
      console.error(err);
      alert('සර්වර් එකට සම්බන්ධ වීමට නොහැක.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!trackNumber.trim()) return;

    setTrackingLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/services/track/${encodeURIComponent(trackNumber.trim())}`);
      const data = await res.json();
      setTrackingResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-red-500 font-bold text-xs uppercase tracking-widest">
          3S Dealership Service Center
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-1">
          Automotive Care &amp; Workshop
        </h2>
        <p className="text-slate-400 text-sm mt-3">
          පළපුරුදු කාර්මික ශිල්පීන් සහ නවීන පරිගණක ස්කෑන් යන්ත්‍ර මඟින් ඔබගේ වාහනයට ඉහළම ආරක්ෂාව හා සත්කාරය.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex gap-1 shadow-xl">
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition uppercase tracking-wider ${
              activeTab === 'book' ? 'bg-red-600 text-white shadow-lg shadow-red-950/50' : 'text-slate-400 hover:text-white'
            }`}
          >
            📅 Interactive Calendar Booking
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('track')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition uppercase tracking-wider ${
              activeTab === 'track' ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔍 Live Job Tracker
          </button>
        </div>
      </div>

      {activeTab === 'book' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Packages */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Available Workshop Packages
            </h3>
            {servicePackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setForm({ ...form, serviceType: pkg.id })}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                  form.serviceType === pkg.id ? 'bg-red-950/20 border-red-500/80 shadow-lg' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-2xl p-2 bg-slate-950 rounded-xl border border-slate-800">{pkg.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">{pkg.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{pkg.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form with Slot Calendar */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-7 sm:p-8 rounded-3xl shadow-xl">
            <h3 className="text-lg font-bold text-white mb-1">Select Date &amp; Available Workshop Slot</h3>
            <p className="text-xs text-slate-400 mb-6">දැනටමත් වෙන්කර නොමැති (Available) වේලාවක් තෝරාගන්න.</p>

            <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Vehicle Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WP CAA-1234"
                    value={form.vehicleNumber}
                    onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white uppercase font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Vehicle Model *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Toyota Vitz 2018"
                    value={form.vehicleModel}
                    onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Kasun Fernando"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0771234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />
                </div>
              </div>

              {/* Feature 3: Interactive Calendar Slot Selection */}
              <div className="space-y-2 pt-2">
                <label className="text-[11px] text-slate-300 font-bold block">1. Select Appointment Date</label>
                <input
                  type="date"
                  required
                  value={form.preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-bold"
                />

                <label className="text-[11px] text-slate-300 font-bold block pt-2">2. Choose Workshop Time Slot</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {standardSlots.map((slot) => {
                    const isBooked = bookedSlotsForSelectedDate.includes(slot);
                    const isSelected = form.preferredTime === slot;

                    return (
                      <button
                        type="button"
                        key={slot}
                        disabled={isBooked}
                        onClick={() => setForm({ ...form, preferredTime: slot })}
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                          isBooked
                            ? 'bg-slate-950/40 border-slate-800/60 text-slate-600 cursor-not-allowed'
                            : isSelected
                            ? 'bg-red-600 border-red-500 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>⏰ {slot}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded ${isBooked ? 'bg-red-950/60 text-red-500' : 'bg-emerald-950 text-emerald-400'}`}>
                          {isBooked ? 'BOOKED' : 'AVAILABLE'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Special Notes</label>
                <textarea
                  rows="2"
                  placeholder="Any particular issue or requests..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg mt-2"
              >
                {submitting ? 'Confirming Appointment...' : 'Confirm Workshop Slot'}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'track' && (
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-center">
            <h3 className="text-xl font-black text-white">Live Service Job Tracker</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">වාහන අංකය ඇතුළත් කර සේවාවේ සජීවී තත්ත්වය පරීක්ෂා කරන්න.</p>
            <form onSubmit={handleTrackSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                required
                placeholder="e.g. CAA-1234"
                value={trackNumber}
                onChange={(e) => setTrackNumber(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs font-bold uppercase"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="px-6 py-3 bg-amber-400 text-slate-950 font-black text-xs uppercase rounded-xl transition"
              >
                Track
              </button>
            </form>
          </div>

          {trackingResults && trackingResults.length > 0 && (
            <div className="space-y-4">
              {trackingResults.map((job) => (
                <div key={job.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h4 className="text-base font-black text-white">{job.vehicleNumber} ({job.vehicleModel})</h4>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                      {job.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Package: <strong className="text-white">{job.serviceType}</strong></span>
                    <span>Date: <strong className="text-amber-400">{job.preferredDate} ({job.preferredTime})</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceCenter;