import React, { useState } from 'react';
import jsPDF from 'jspdf';

const FinanceCalculatorModal = ({ isOpen, vehicle, onClose, config }) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [loanPeriodYears, setLoanPeriodYears] = useState(5);
  const [interestRate, setInterestRate] = useState(14); // Annual interest rate %

  if (!isOpen || !vehicle) return null;

  const vehiclePrice = parseFloat(vehicle.price) || 0;
  const downPaymentAmount = (vehiclePrice * downPaymentPercent) / 100;
  const loanAmount = vehiclePrice - downPaymentAmount;

  // Monthly installment calculation (Standard Flat / Diminishing average)
  const totalMonths = loanPeriodYears * 12;
  const totalInterest = loanAmount * (interestRate / 100) * loanPeriodYears;
  const totalPayable = loanAmount + totalInterest;
  const monthlyRental = Math.round(totalPayable / totalMonths);

  const businessName = config?.businessName || 'Thenula Enterprises';

  const downloadQuotationPDF = () => {
    const doc = new jsPDF();

    // Header Banner
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 42, 'F');

    doc.setTextColor(239, 68, 68);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(businessName.toUpperCase(), 14, 20);

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('OFFICIAL AUTOMOTIVE LEASING / LOAN QUOTATION', 14, 28);
    doc.text(`Showroom Address: ${config?.address || 'Mawathagama, Sri Lanka'} | Phone: ${config?.contactPhone || '077 123 4567'}`, 14, 35);

    // Vehicle Details
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Vehicle Information:', 14, 55);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Vehicle: ${vehicle.title} (${vehicle.manufactureYear})`, 16, 64);
    doc.text(`Brand & Model: ${vehicle.brand} ${vehicle.model}`, 16, 72);
    doc.text(`Full Vehicle Value: LKR ${vehiclePrice.toLocaleString()}`, 16, 80);

    doc.setDrawColor(203, 213, 225);
    doc.line(14, 88, 196, 88);

    // Financial Breakdown
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Financial & Repayment Breakdown:', 14, 102);

    const breakdown = [
      ['Customer Down Payment', `${downPaymentPercent}% (LKR ${Math.round(downPaymentAmount).toLocaleString()})`],
      ['Total Financed / Lease Amount', `LKR ${Math.round(loanAmount).toLocaleString()}`],
      ['Repayment Period', `${loanPeriodYears} Years (${totalMonths} Monthly Installments)`],
      ['Estimated Annual Interest Rate', `${interestRate}% p.a.`],
      ['Total Interest Payable', `LKR ${Math.round(totalInterest).toLocaleString()}`],
      ['Total Loan Repayment Value', `LKR ${Math.round(totalPayable).toLocaleString()}`],
      ['Estimated Monthly Rental', `LKR ${monthlyRental.toLocaleString()} / month`],
    ];

    let y = 114;
    breakdown.forEach(([label, val]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, 16, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${val}`, 95, y);
      y += 10;
    });

    // Stamp & Note Box
    doc.setDrawColor(203, 213, 225);
    doc.line(14, 195, 196, 195);

    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('* Note: This is an estimated quotation generated for budgeting purposes.', 14, 205);
    doc.text('* Final terms and rates are subject to finance/leasing company credit evaluation.', 14, 211);
    doc.text(`* Valid for 14 days from generation date: ${new Date().toLocaleDateString()}`, 14, 217);

    // Authorized Stamp
    doc.setDrawColor(220, 38, 38);
    doc.rect(130, 230, 65, 30);
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('OFFICIALLY ISSUED', 142, 242);
    doc.setFontSize(8);
    doc.text(`${businessName.toUpperCase()}`, 136, 250);
    doc.text('SALES & LEASING DESK', 140, 255);

    doc.save(`${vehicle.title.replace(/[^a-zA-Z0-9]/g, '_')}_Lease_Quotation.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xl p-7 shadow-2xl space-y-6">
        <div className="flex justify-between items-start border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Lease &amp; Loan Calculator</span>
            <h3 className="text-xl font-black text-white mt-0.5">{vehicle.title}</h3>
            <p className="text-xs text-slate-400">Total Price: <span className="text-amber-400 font-bold">LKR {vehiclePrice.toLocaleString()}</span></p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2">✕</button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between mb-1.5 font-bold">
              <span className="text-slate-300">Down Payment:</span>
              <span className="text-amber-400">{downPaymentPercent}% (LKR {Math.round(downPaymentAmount).toLocaleString()})</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-bold block mb-1.5">Repayment Term (Years)</label>
              <select
                value={loanPeriodYears}
                onChange={(e) => setLoanPeriodYears(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-bold"
              >
                <option value={1}>1 Year (12 Months)</option>
                <option value={2}>2 Years (24 Months)</option>
                <option value={3}>3 Years (36 Months)</option>
                <option value={4}>4 Years (48 Months)</option>
                <option value={5}>5 Years (60 Months)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1.5">Interest Rate (% p.a.)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-bold"
              />
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-center space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Estimated Monthly Rental</span>
            <p className="text-3xl font-black text-emerald-400">LKR {monthlyRental.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ month</span></p>
            <p className="text-[11px] text-slate-500 pt-1">Finance Amount: LKR {Math.round(loanAmount).toLocaleString()}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={downloadQuotationPDF}
            className="py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2"
          >
            <span>📥</span> Download Quotation PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceCalculatorModal;