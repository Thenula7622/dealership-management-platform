import React, { useState } from 'react';

const InquiryModal = ({ isOpen, vehicle, onClose, onInquirySent, customerUser }) => {
  const [name, setName] = useState(customerUser?.name || '');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('TEST_DRIVE');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    const payload = {
      customerId: customerUser?.id || null,
      customerName: name,
      phoneNumber: phone,
      inquiryType: type,
      vehicleId: vehicle ? vehicle.id : null,
      appointmentDate: `${date} ${time}`.trim(),
      message: message,
      status: 'PENDING'
    };

    try {
      const res = await fetch('http://localhost:8080/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        if (onInquirySent) onInquirySent(saved);
        alert('ඔබගේ Appointment එක සාර්ථකව වෙන්කරන ලදී! අපගේ කණ්ඩායම ඔබව අමතනු ඇත.');
        onClose();
        setName('');
        setPhone('');
        setDate('');
        setTime('');
        setMessage('');
      } else {
        alert('Appointment එක යොමු කිරීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-7 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Appointment Booking</span>
            <h3 className="text-xl font-black text-white mt-0.5">
              {type === 'TEST_DRIVE' ? 'Book a Test Drive' : 'Vehicle Inspection Request'}
            </h3>
            {vehicle && (
              <p className="text-xs text-amber-400 font-semibold mt-1">
                Vehicle: {vehicle.title} ({vehicle.manufactureYear})
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Your Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Kasun Fernando"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. 0771234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Booking Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
              >
                <option value="TEST_DRIVE">🚗 Test Drive</option>
                <option value="INSPECTION">🔍 In-Person Inspection</option>
                <option value="PRICE_NEGOTIATION">💬 Price Negotiation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Preferred Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Preferred Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Special Notes or Questions</label>
            <textarea
              rows="3"
              placeholder="කරුණාකර ඔබට අවශ්‍ය විශේෂිත වෙලාවක් හෝ සටහනක් ඇත්නම් මෙහි දක්වන්න..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-red-950/40"
          >
            {isSubmitting ? 'Confirming Appointment...' : 'Confirm Showroom Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;