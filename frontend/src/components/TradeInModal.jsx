import React, { useState } from 'react';

const TradeInModal = ({ isOpen, onClose, customerUser, vehicles }) => {
  const [form, setForm] = useState({
    name: customerUser?.name || '',
    phone: customerUser?.phoneNumber || '',
    brand: 'Toyota',
    model: 'Vitz',
    year: '2018',
    mileage: '48000',
    targetExchangeVehicle: '',
    notes: '',
    imageUrl: ''
  });

  const [aiPrediction, setAiPrediction] = useState(null);
  const [damageAnalysis, setDamageAnalysis] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  // Feature 3: AI Instant Market Valuation Prediction
  const handleAIEvaluate = async () => {
    setEvaluating(true);
    try {
      const res = await fetch('http://localhost:8080/api/ai/predict-valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: form.brand,
          model: form.model,
          year: form.year,
          mileage: form.mileage
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiPrediction(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  // Feature 2: AI Computer Vision Damage Scan
  const handleScanDamage = async () => {
    if (!form.imageUrl) return alert('කරුණාකර පළමුව වාහනයේ ඡායාරූප Link එක ඇතුළත් කරන්න.');
    try {
      const res = await fetch('http://localhost:8080/api/ai/scan-damage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: form.imageUrl })
      });
      if (res.ok) {
        const data = await res.json();
        setDamageAnalysis(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      customerId: customerUser?.id || null,
      customerName: form.name,
      phoneNumber: form.phone,
      vehicleBrand: form.brand,
      vehicleModel: form.model,
      manufactureYear: parseInt(form.year, 10),
      mileageKm: parseInt(form.mileage || 0, 10),
      expectedPrice: aiPrediction ? aiPrediction.estimatedMarketValue : 7500000,
      targetExchangeVehicle: form.targetExchangeVehicle,
      vehicleConditionNotes: form.notes,
      vehicleImageUrl: form.imageUrl,
      status: 'PENDING',
      showroomValuationOffer: aiPrediction ? aiPrediction.instantCashOffer : null
    };

    try {
      const res = await fetch('http://localhost:8080/api/trade-ins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('ඔබගේ Trade-in / Valuation ඉල්ලීම සාර්ථකව Showroom Valuator වෙත යොමු විය!');
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xl p-6 shadow-2xl max-h-[92vh] overflow-y-auto space-y-5">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <span>⚡</span> AI Smart Valuation &amp; Vehicle Trade-In
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">Sell or Exchange Your Vehicle</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Your Name *</label>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
            </div>
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Phone Number *</label>
              <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Make</label>
              <input required value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
            </div>
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Model</label>
              <input required value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
            </div>
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Year</label>
              <input required type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
            </div>
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Mileage</label>
              <input type="number" value={form.mileage} onChange={e => setForm({ ...form, mileage: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
            </div>
          </div>

          {/* AI Valuation Trigger Button */}
          <button
            type="button"
            onClick={handleAIEvaluate}
            disabled={evaluating}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-400/30 rounded-xl font-bold flex items-center justify-center gap-2 transition"
          >
            <span>🎯</span> {evaluating ? 'Analyzing Market Rates...' : 'Calculate Instant AI Market Valuation'}
          </button>

          {/* AI Valuation Result Card */}
          {aiPrediction && (
            <div className="p-4 bg-slate-950 border border-amber-400/40 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Sri Lankan Market Value:</span>
                <span className="text-sm font-black text-white">LKR {Number(aiPrediction.estimatedMarketValue).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-900">
                <span className="text-[10px] text-emerald-400 font-bold uppercase">Instant Showroom Buyout Offer:</span>
                <span className="text-base font-black text-emerald-400">LKR {Number(aiPrediction.instantCashOffer).toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-slate-500 italic">* Based on current market conditions &amp; demand index.</p>
            </div>
          )}

          <div>
            <label className="text-slate-400 font-semibold mb-1 block">Exchange Swap Vehicle (Optional)</label>
            <select
              value={form.targetExchangeVehicle}
              onChange={e => setForm({ ...form, targetExchangeVehicle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            >
              <option value="">Direct Cash Sale to Showroom</option>
              {vehicles.map(v => (
                <option key={v.id} value={`${v.title} (${v.manufactureYear})`}>Exchange For: {v.title}</option>
              ))}
            </select>
          </div>

          {/* Image & Vision Damage Scanner */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                placeholder="Vehicle Image URL (e.g. Google Drive / Direct URL)..."
                value={form.imageUrl}
                onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
              <button
                type="button"
                onClick={handleScanDamage}
                className="px-3 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl font-bold"
              >
                Scan Damage
              </button>
            </div>

            {damageAnalysis && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Body Integrity Score: {damageAnalysis.bodyIntegrityScore}%</span>
                  <span>{damageAnalysis.paintCondition}</span>
                </div>
                <p className="text-slate-400">AI Finding: {damageAnalysis.detectedIssues[0]}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-600 text-white font-black uppercase tracking-wider rounded-xl transition shadow-lg mt-2"
          >
            {submitting ? 'Submitting Valuation...' : 'Submit Vehicle for Showroom Offer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeInModal;