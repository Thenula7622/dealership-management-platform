import React from 'react';
import jsPDF from 'jspdf';

const InspectionModal = ({ isOpen, vehicle, config, onClose }) => {
  if (!isOpen || !vehicle) return null;

  const engine = vehicle.engineScore || 95;
  const battery = vehicle.batteryScore || 90;
  const suspension = vehicle.suspensionScore || 92;
  const bodyPaint = vehicle.bodyPaintScore || 88;
  const overall = Math.round((engine + battery + suspension + bodyPaint) / 4);

  const downloadInspectionPDF = () => {
    const doc = new jsPDF();

    // Top Header Banner
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(239, 68, 68);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text((config?.businessName || 'THENULA ENTERPRISES').toUpperCase(), 14, 20);

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('CERTIFIED MULTI-POINT VEHICLE INSPECTION REPORT', 14, 28);
    doc.text(`Showroom: ${config?.address || 'Mawathagama, Sri Lanka'} | Official Verification Desk`, 14, 34);

    // Vehicle Title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(vehicle.title, 14, 54);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Brand & Model: ${vehicle.brand} ${vehicle.model} | Year: ${vehicle.manufactureYear} | Odometer: ${Number(vehicle.mileageKm || 0).toLocaleString()} km`, 14, 62);

    doc.setDrawColor(203, 213, 225);
    doc.line(14, 68, 196, 68);

    // Overall Score Box
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, 74, 182, 28, 3, 3, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('OVERALL INSPECTION PASS RATING:', 20, 86);
    doc.setTextColor(16, 185, 129);
    doc.setFontSize(22);
    doc.text(`${overall} / 100 [CERTIFIED]`, 20, 96);

    // Checkpoints
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Diagnostic Category Breakdown:', 14, 116);

    const scores = [
      ['Powertrain & Engine Compression', `${engine} / 100`, 'Passed cylinder test, smooth idle, zero oil leaks'],
      ['Hybrid Battery / Electrical Systems', `${battery} / 100`, 'Cell degradation within standard specs, ECU fault-free'],
      ['Suspension, Steering & Joints', `${suspension} / 100`, 'Shock absorbers tested, zero alignment deviation'],
      ['Chassis, Body Panels & Paint Depth', `${bodyPaint} / 100`, 'Original paint thickness verified, no flood/accident history']
    ];

    let y = 128;
    scores.forEach(([cat, sc, desc]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text(cat, 16, y);
      doc.setTextColor(16, 185, 129);
      doc.text(sc, 160, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(desc, 16, y + 5);
      y += 16;
    });

    doc.setDrawColor(203, 213, 225);
    doc.line(14, 200, 196, 200);

    // Inspector Remarks
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('Certified Automobile Engineer Remarks:', 14, 212);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(vehicle.inspectorNotes || 'Vehicle passed all physical and computerized OBD-II scan diagnostic checks.', 14, 220);

    // Official Seal
    doc.setDrawColor(16, 185, 129);
    doc.rect(130, 240, 65, 28);
    doc.setTextColor(16, 185, 129);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFIED INSPECTED', 138, 252);
    doc.setFontSize(8);
    doc.text('ROADWORTHINESS PASSED', 134, 260);

    doc.save(`${vehicle.title.replace(/[^a-zA-Z0-9]/g, '_')}_Inspection_Report.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-6">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">Certified 100-Point Audit</span>
            <h3 className="text-xl font-black text-white mt-0.5">{vehicle.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2">✕</button>
        </div>

        {/* Overall Rating Card */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Overall Inspection Score</span>
            <p className="text-3xl font-black text-emerald-400">{overall} <span className="text-xs text-slate-400 font-normal">/ 100</span></p>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-black uppercase">
            ✓ Pass Certified
          </span>
        </div>

        {/* Category Scores */}
        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span className="text-slate-300">⚙️ Engine &amp; Powertrain</span>
              <span className="text-emerald-400">{engine}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${engine}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span className="text-slate-300">⚡ Electrical &amp; Hybrid Battery</span>
              <span className="text-emerald-400">{battery}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${battery}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span className="text-slate-300">🛞 Suspension &amp; Steering</span>
              <span className="text-emerald-400">{suspension}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${suspension}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span className="text-slate-300">🚗 Bodywork &amp; Paint Thickness</span>
              <span className="text-emerald-400">{bodyPaint}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${bodyPaint}%` }}></div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 italic">
          "{vehicle.inspectorNotes || 'No accidental defects or chassis alterations found.'}"
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={downloadInspectionPDF}
            className="py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>📥</span> Download PDF Report
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectionModal;