import React, { useState } from 'react';
import jsPDF from 'jspdf';

const ReservationModal = ({ isOpen, vehicle, config, customerUser, onClose, onReservationSuccess }) => {
  const [advanceAmount, setAdvanceAmount] = useState(50000);
  const [name, setName] = useState(customerUser?.name || '');
  const [phone, setPhone] = useState(customerUser?.phoneNumber || '');
  const [email, setEmail] = useState(customerUser?.email || '');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !vehicle) return null;

  const handlePayAndReserve = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('කරුණාකර නම සහ දුරකථන අංකය ඇතුළත් කරන්න.');
      return;
    }

    setProcessing(true);
    const reservationCode = 'RES-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    const payload = {
      reservationCode,
      vehicleId: vehicle.id,
      vehicleTitle: vehicle.title,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim(),
      advanceAmountPaid: advanceAmount,
      paymentMethod: 'PAYHERE_CARD_GATEWAY',
      paymentReference: 'TXN_' + Date.now(),
      status: 'CONFIRMED'
    };

    try {
      const res = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        alert(`සුබ පැතුම්! ඔබගේ වාහන වෙන්කරවා ගැනීම (Reservation) සාර්ථකයි.\nReservation Code: ${saved.reservationCode}\nමෙම වාහනය දින 3ක් සඳහා ඔබට පමණක් Hold කර තැබේ.`);
        downloadReservationSlip(saved);
        onReservationSuccess(vehicle.id);
        onClose();
      } else {
        alert('Reservation payment failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error.');
    } finally {
      setProcessing(false);
    }
  };

  const downloadReservationSlip = (resData) => {
    const doc = new jsPDF();
    const bName = (config?.businessName || 'Thenula Enterprises').toUpperCase();

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(239, 68, 68);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(bName, 14, 20);

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('OFFICIAL VEHICLE HOLD & ADVANCE RESERVATION RECEIPT', 14, 28);
    doc.text(`Showroom: ${config?.address || 'Mawathagama, Sri Lanka'} | Customer Priority Desk`, 14, 34);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`RESERVATION CODE: ${resData.reservationCode}`, 14, 52);

    doc.setDrawColor(203, 213, 225);
    doc.line(14, 58, 196, 58);

    doc.setFontSize(11);
    doc.text(`Reserved Vehicle: ${vehicle.title} (${vehicle.manufactureYear})`, 16, 68);
    doc.text(`Full Vehicle Price: LKR ${Number(vehicle.price).toLocaleString()}`, 16, 76);
    doc.text(`Advance Deposit Paid: LKR ${Number(resData.advanceAmountPaid).toLocaleString()}`, 16, 84);
    doc.text(`Balance Due at Delivery: LKR ${Number(vehicle.price - resData.advanceAmountPaid).toLocaleString()}`, 16, 92);

    doc.line(14, 100, 196, 100);
    doc.text('Customer Credentials:', 14, 110);
    doc.setFont('helvetica', 'normal');
    doc.text(`Customer Name: ${resData.customerName}`, 16, 118);
    doc.text(`Phone: ${resData.customerPhone} | Email: ${resData.customerEmail || 'N/A'}`, 16, 126);
    doc.text(`Hold Validity: Valid for 72 Hours from ${new Date().toLocaleDateString()}`, 16, 134);

    doc.setDrawColor(16, 185, 129);
    doc.rect(130, 150, 65, 26);
    doc.setTextColor(16, 185, 129);
    doc.setFont('helvetica', 'bold');
    doc.text('PAYMENT VERIFIED', 138, 162);
    doc.setFontSize(8);
    doc.text('VEHICLE HOLD LOCKED', 137, 169);

    doc.save(`${resData.reservationCode}_HoldSlip.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-6">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Online Advance Hold Gateway</span>
            <h3 className="text-xl font-black text-white mt-0.5">{vehicle.title}</h3>
            <p className="text-xs text-slate-400">Total Price: <span className="text-amber-400 font-bold">LKR {Number(vehicle.price).toLocaleString()}</span></p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2">✕</button>
        </div>

        <form onSubmit={handlePayAndReserve} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-bold block mb-1">Your Full Name *</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="text-slate-400 font-bold block mb-1">Phone Number *</label>
              <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
            </div>
          </div>

          <div>
            <label className="text-slate-400 font-bold block mb-1">Select Advance Hold Deposit</label>
            <div className="grid grid-cols-3 gap-2">
              {[25000, 50000, 100000].map(amt => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setAdvanceAmount(amt)}
                  className={`p-3 rounded-xl border font-bold transition text-center ${
                    advanceAmount === amt ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  LKR {amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Secure Payment Card Mockup */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>🔒</span> PayHere 256-Bit SSL Card Gateway
            </span>
            <div className="space-y-2">
              <input placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-xs" />
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-xs" />
                <input type="password" placeholder="CVV •••" defaultValue="782" className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-xs" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2"
          >
            {processing ? 'Authorizing Payment...' : `Pay LKR ${advanceAmount.toLocaleString()} & Lock Vehicle Hold`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;