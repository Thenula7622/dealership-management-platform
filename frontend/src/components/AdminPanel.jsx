import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const AdminPanel = ({ config, setConfig, vehicles, setVehicles, inquiries, currentStaffUser, onLogout }) => {
  const staffRole = currentStaffUser?.role || 'SUPER_ADMIN';

  const [activeAdminSubTab, setActiveAdminSubTab] = useState(() => {
    if (staffRole === 'WORKSHOP_MANAGER') return 'workshop';
    if (staffRole === 'SALES_EXECUTIVE') return 'inventory';
    return 'inventory';
  });

  const [adminSearch, setAdminSearch] = useState('');

  // 1. FLEET STATE (FULL CRUD)
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingAd, setIsGeneratingAd] = useState(false);
  const [generatedAd, setGeneratedAd] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({
    title: '', brand: '', model: '', vehicleType: 'CAR', manufactureYear: '',
    conditionType: 'USED', transmission: 'AUTOMATIC', fuelType: 'PETROL',
    engineCapacity: '', mileageKm: '', price: '', purchaseCost: '', repairCost: '',
    imageUrl: '', galleryUrls: '', engineScore: 95, batteryScore: 90, suspensionScore: 92, bodyPaintScore: 88,
    inspectorNotes: 'Certified Multi-Point Inspection Passed.', status: 'AVAILABLE'
  });

  // 2. SPARE PARTS STATE (FULL CRUD)
  const [spareParts, setSpareParts] = useState([]);
  const [editingPartId, setEditingPartId] = useState(null);
  const [showPartForm, setShowPartForm] = useState(false);
  const [partForm, setPartForm] = useState({
    name: '', partNumber: '', category: 'FILTERS', price: '', stockQuantity: 10,
    compatibleVehicles: '', imageUrl: '', description: ''
  });

  // 3. WORKSHOP STATE (FULL CRUD)
  const [serviceJobs, setServiceJobs] = useState([]);
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [newJobForm, setNewJobForm] = useState({
    customerName: '', phoneNumber: '', vehicleNumber: '', vehicleModel: '',
    serviceType: 'FULL_SERVICE', preferredDate: '', preferredTime: '', notes: '', estimatedCost: ''
  });

  // 4. INVOICES STATE (FULL CRUD + PDF)
  const [invoices, setInvoices] = useState([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    customerName: '', phoneNumber: '', customerAddress: '', itemType: 'VEHICLE_SALE',
    itemDescription: '', subTotal: '', discount: 0, paymentMethod: 'BANK_TRANSFER'
  });

  // 5. STAFF STATE (FULL CRUD)
  const [staffList, setStaffList] = useState([]);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [staffForm, setStaffForm] = useState({
    fullName: '', email: '', password: '', phoneNumber: '', role: 'TECHNICIAN',
    specialization: 'Hybrid Battery & Scan', monthlySalary: 95000, active: true
  });

  // 6. RESERVATIONS STATE (FULL CRUD)
  const [reservations, setReservations] = useState([]);

  // 7. LEADS STATE (FULL CRUD)
  const [leadsList, setLeadsList] = useState(inquiries || []);

  // 8. REVIEWS STATE (FULL CRUD)
  const [reviewsList, setReviewsList] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', vehicle: '', rating: 5, comment: '' });

  // 9. TRADE-IN STATE (FULL CRUD)
  const [tradeIns, setTradeIns] = useState([]);

  const fetchAllData = () => {
    fetch('http://localhost:8080/api/vehicles').then(r => r.json()).then(d => setVehicles(d)).catch(e => console.error(e));
    fetch('http://localhost:8080/api/services').then(r => r.json()).then(d => setServiceJobs(d)).catch(e => console.error(e));
    fetch('http://localhost:8080/api/spare-parts').then(r => r.json()).then(d => setSpareParts(d)).catch(e => console.error(e));
    fetch('http://localhost:8080/api/invoices').then(r => r.json()).then(d => setInvoices(d)).catch(e => console.error(e));
    fetch('http://localhost:8080/api/staff').then(r => r.json()).then(d => setStaffList(d)).catch(e => console.error(e));
    fetch('http://localhost:8080/api/reservations').then(r => r.json()).then(d => setReservations(d)).catch(e => console.error(e));
    fetch('http://localhost:8080/api/inquiries').then(r => r.json()).then(d => setLeadsList(d)).catch(e => console.error(e));
    fetch('http://localhost:8080/api/trade-ins').then(r => r.json()).then(d => setTradeIns(d)).catch(e => console.error(e));
    fetch('http://localhost:8080/api/reviews').then(r => r.json()).then(d => setReviewsList(d)).catch(e => console.error(e));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (inquiries && inquiries.length > 0) setLeadsList(inquiries);
  }, [inquiries]);

  // ==================== 1. FLEET CRUD ====================
  const handleMultipleFilesUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) formData.append('files', files[i]);

    setIsUploading(true);
    try {
      const res = await fetch('http://localhost:8080/api/uploads/multiple', { method: 'POST', body: formData });
      if (res.ok) {
        const newUrls = await res.json();
        const updated = [...uploadedImages, ...newUrls];
        setUploadedImages(updated);
        setVehicleForm(prev => ({ ...prev, imageUrl: updated[0] || '', galleryUrls: updated.join(',') }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateAd = async () => {
    if (!vehicleForm.title || !vehicleForm.price) return alert('Please enter Title and Price first.');
    setIsGeneratingAd(true);
    try {
      const res = await fetch('http://localhost:8080/api/ai/generate-ad-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: vehicleForm.title, brand: vehicleForm.brand, model: vehicleForm.model,
          year: vehicleForm.manufactureYear, price: vehicleForm.price,
          mileage: vehicleForm.mileageKm, transmission: vehicleForm.transmission
        })
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedAd(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAd(false);
    }
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleForm.title || !vehicleForm.price) return alert('Title & Price are required.');
    const finalMainImage = uploadedImages[0] || vehicleForm.imageUrl;
    const payload = {
      ...vehicleForm,
      imageUrl: finalMainImage,
      galleryUrls: uploadedImages.join(','),
      manufactureYear: parseInt(vehicleForm.manufactureYear || 2020, 10),
      engineCapacity: parseInt(vehicleForm.engineCapacity || 1000, 10),
      mileageKm: parseInt(vehicleForm.mileageKm || 0, 10),
      price: parseFloat(vehicleForm.price),
      purchaseCost: parseFloat(vehicleForm.purchaseCost || 0),
      repairCost: parseFloat(vehicleForm.repairCost || 0),
      engineScore: parseInt(vehicleForm.engineScore || 95, 10),
      batteryScore: parseInt(vehicleForm.batteryScore || 90, 10),
      suspensionScore: parseInt(vehicleForm.suspensionScore || 92, 10),
      bodyPaintScore: parseInt(vehicleForm.bodyPaintScore || 88, 10)
    };

    try {
      if (editingVehicleId) payload.id = editingVehicleId;
      const res = await fetch('http://localhost:8080/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert(editingVehicleId ? 'වාහනය සාර්ථකව Update කරන ලදී!' : 'වාහනය සාර්ථකව ඇතුළත් කරන ලදී!');
        setEditingVehicleId(null);
        setUploadedImages([]);
        setGeneratedAd(null);
        setVehicleForm({
          title: '', brand: '', model: '', vehicleType: 'CAR', manufactureYear: '',
          conditionType: 'USED', transmission: 'AUTOMATIC', fuelType: 'PETROL',
          engineCapacity: '', mileageKm: '', price: '', purchaseCost: '', repairCost: '',
          imageUrl: '', galleryUrls: '', engineScore: 95, batteryScore: 90, suspensionScore: 92, bodyPaintScore: 88,
          inspectorNotes: 'Certified Multi-Point Inspection Passed.', status: 'AVAILABLE'
        });
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEditVehicle = (v) => {
    setEditingVehicleId(v.id);
    let images = [];
    if (v.galleryUrls) images = v.galleryUrls.split(',').filter(Boolean);
    else if (v.imageUrl) images = [v.imageUrl];
    setUploadedImages(images);
    setVehicleForm({ ...v });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm('Delete this vehicle permanently?')) return;
    try {
      await fetch(`http://localhost:8080/api/vehicles/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // ==================== 2. SPARE PARTS CRUD ====================
  const handlePartSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...partForm,
      price: parseFloat(partForm.price),
      stockQuantity: parseInt(partForm.stockQuantity || 10, 10)
    };
    try {
      const method = editingPartId ? 'PUT' : 'POST';
      const url = editingPartId ? `http://localhost:8080/api/spare-parts/${editingPartId}` : 'http://localhost:8080/api/spare-parts';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert(editingPartId ? 'Part updated!' : 'Part added!');
        setEditingPartId(null);
        setShowPartForm(false);
        setPartForm({ name: '', partNumber: '', category: 'FILTERS', price: '', stockQuantity: 10, compatibleVehicles: '', imageUrl: '', description: '' });
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEditPart = (p) => {
    setEditingPartId(p.id);
    setShowPartForm(true);
    setPartForm({ ...p });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleDeletePart = async (id) => {
    if (!window.confirm('Delete this spare part?')) return;
    try {
      await fetch(`http://localhost:8080/api/spare-parts/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // ==================== 3. WORKSHOP CRUD ====================
  const handleCreateServiceJob = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newJobForm,
          status: 'RECEIVED',
          estimatedCost: newJobForm.estimatedCost ? parseFloat(newJobForm.estimatedCost) : null
        }),
      });
      if (res.ok) {
        alert('Workshop booking added!');
        setShowAddJobForm(false);
        setNewJobForm({ customerName: '', phoneNumber: '', vehicleNumber: '', vehicleModel: '', serviceType: 'FULL_SERVICE', preferredDate: '', preferredTime: '', notes: '', estimatedCost: '' });
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateJobStatus = async (jobId, newStatus, newCost) => {
    setServiceJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus, estimatedCost: newCost || j.estimatedCost } : j));
    try {
      const payload = { status: newStatus };
      if (newCost !== undefined && newCost !== '') payload.estimatedCost = newCost;
      await fetch(`http://localhost:8080/api/services/${jobId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Delete service job?')) return;
    try {
      await fetch(`http://localhost:8080/api/services/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // ==================== 4. STAFF CRUD ====================
  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingStaffId ? 'PUT' : 'POST';
      const url = editingStaffId ? `http://localhost:8080/api/staff/${editingStaffId}` : 'http://localhost:8080/api/staff';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffForm),
      });
      if (res.ok) {
        alert(editingStaffId ? 'Staff updated!' : 'Staff created!');
        setEditingStaffId(null);
        setShowStaffForm(false);
        setStaffForm({ fullName: '', email: '', password: '', phoneNumber: '', role: 'TECHNICIAN', specialization: 'Hybrid & Diagnostic', monthlySalary: 95000, active: true });
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEditStaff = (s) => {
    setEditingStaffId(s.id);
    setShowStaffForm(true);
    setStaffForm({ ...s, password: '' });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleDeleteStaff = async (id) => {
    if (!window.confirm('Delete staff member?')) return;
    try {
      await fetch(`http://localhost:8080/api/staff/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // ==================== 5. INVOICES CRUD + PDF ====================
  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    const sub = parseFloat(invoiceForm.subTotal) || 0;
    const disc = parseFloat(invoiceForm.discount) || 0;
    try {
      const res = await fetch('http://localhost:8080/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...invoiceForm, subTotal: sub, discount: disc, totalAmount: sub - disc, paymentStatus: 'PAID' }),
      });
      if (res.ok) {
        const saved = await res.json();
        setInvoices([saved, ...invoices]);
        setShowInvoiceModal(false);
        printInvoicePDF(saved);
        setInvoiceForm({ customerName: '', phoneNumber: '', customerAddress: '', itemType: 'VEHICLE_SALE', itemDescription: '', subTotal: '', discount: 0, paymentMethod: 'BANK_TRANSFER' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInvoice = async (id) => {
    if (!window.confirm('Delete invoice?')) return;
    try {
      await fetch(`http://localhost:8080/api/invoices/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const printInvoicePDF = (inv) => {
    const doc = new jsPDF();
    const businessName = (config?.businessName || 'Thenula Enterprises').toUpperCase();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(239, 68, 68);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(businessName, 14, 20);
    doc.setTextColor(203, 213, 225);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('OFFICIAL DEALERSHIP SALES INVOICE & RECEIPT', 14, 28);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`INVOICE: ${inv.invoiceNumber}`, 14, 52);
    doc.setFont('helvetica', 'normal');
    doc.text(`Customer: ${inv.customerName} | Phone: ${inv.phoneNumber}`, 14, 60);

    doc.setFillColor(241, 245, 249);
    doc.rect(14, 70, 182, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Item Description', 18, 77);
    doc.text('Amount (LKR)', 160, 77);

    doc.setFont('helvetica', 'normal');
    doc.text(inv.itemDescription, 18, 90);
    doc.text(Number(inv.totalAmount).toLocaleString(), 160, 90);

    doc.save(`${inv.invoiceNumber}_Receipt.pdf`);
  };

  // ==================== 6. REVIEWS CRUD ====================
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingReviewId ? 'PUT' : 'POST';
      const url = editingReviewId ? `http://localhost:8080/api/reviews/${editingReviewId}` : 'http://localhost:8080/api/reviews';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewForm),
      });
      if (res.ok) {
        alert(editingReviewId ? 'Review updated!' : 'Review created!');
        setEditingReviewId(null);
        setShowReviewForm(false);
        setReviewForm({ name: '', vehicle: '', rating: 5, comment: '' });
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEditReview = (r) => {
    setEditingReviewId(r.id);
    setShowReviewForm(true);
    setReviewForm({ name: r.name, vehicle: r.vehicle || '', rating: r.rating || 5, comment: r.comment || '' });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete review?')) return;
    try {
      await fetch(`http://localhost:8080/api/reviews/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  // ==================== 7. TRADE-IN, RESERVATIONS & LEADS CRUD ====================
  const handleDeleteTradeIn = async (id) => {
    if (!window.confirm('Delete trade-in request?')) return;
    try {
      await fetch(`http://localhost:8080/api/trade-ins/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTradeInOffer = async (id, status, offer) => {
    try {
      const res = await fetch(`http://localhost:8080/api/trade-ins/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, offer }),
      });
      if (res.ok) fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReservation = async (id) => {
    if (!window.confirm('Delete this reservation?')) return;
    try {
      await fetch(`http://localhost:8080/api/reservations/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Delete inquiry message?')) return;
    try {
      await fetch(`http://localhost:8080/api/inquiries/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateLeadStatus = async (id, status) => {
    setLeadsList(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    try {
      await fetch(`http://localhost:8080/api/inquiries/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const sendWhatsApp = (phone, text) => {
    const clean = (phone || '').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const safeVehicles = vehicles || [];
  const filteredVehicles = safeVehicles.filter(v =>
    (v.title && v.title.toLowerCase().includes(adminSearch.toLowerCase())) ||
    (v.brand && v.brand.toLowerCase().includes(adminSearch.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* 🛡️ Current Authenticated Staff Identity */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-red-600/10 border border-red-500/30 text-red-500 rounded-xl text-lg font-bold">
            {staffRole === 'SUPER_ADMIN' ? '👑' : staffRole === 'WORKSHOP_MANAGER' ? '🔧' : '💼'}
          </span>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Enterprise Staff Session:</span>
            <p className="text-xs font-black text-white">{currentStaffUser?.fullName || 'Thenula Rathnayaka'} &bull; <span className="text-amber-400">{staffRole.replace('_', ' ')}</span></p>
          </div>
        </div>
        <button onClick={onLogout} className="px-3.5 py-1.5 bg-red-950/40 text-red-400 border border-red-500/30 text-xs font-bold rounded-xl hover:bg-red-900/60">
          Sign Out
        </button>
      </div>

      {/* 🚀 Role Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {(staffRole === 'SUPER_ADMIN' || staffRole === 'SALES_EXECUTIVE') && (
            <button onClick={() => setActiveAdminSubTab('inventory')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeAdminSubTab === 'inventory' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'}`}>🚗 Fleet ({safeVehicles.length})</button>
          )}
          {(staffRole === 'SUPER_ADMIN' || staffRole === 'WORKSHOP_MANAGER') && (
            <button onClick={() => setActiveAdminSubTab('workshop')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeAdminSubTab === 'workshop' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'}`}>🛠️ Workshop ({serviceJobs.length})</button>
          )}
          {(staffRole === 'SUPER_ADMIN' || staffRole === 'WORKSHOP_MANAGER') && (
            <button onClick={() => setActiveAdminSubTab('spareparts')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeAdminSubTab === 'spareparts' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'}`}>⚙️ Spare Parts ({spareParts.length})</button>
          )}
          {(staffRole === 'SUPER_ADMIN' || staffRole === 'SALES_EXECUTIVE') && (
            <button onClick={() => setActiveAdminSubTab('reservations')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeAdminSubTab === 'reservations' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'}`}>💳 Reservations ({reservations.length})</button>
          )}
          {(staffRole === 'SUPER_ADMIN' || staffRole === 'SALES_EXECUTIVE') && (
            <button onClick={() => setActiveAdminSubTab('inquiries')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeAdminSubTab === 'inquiries' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'}`}>💬 Leads ({leadsList.length})</button>
          )}
          {(staffRole === 'SUPER_ADMIN' || staffRole === 'SALES_EXECUTIVE') && (
            <button onClick={() => setActiveAdminSubTab('tradeins')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeAdminSubTab === 'tradeins' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'}`}>🔄 Trade-In ({tradeIns.length})</button>
          )}
          {staffRole === 'SUPER_ADMIN' && (
            <button onClick={() => setActiveAdminSubTab('reviews')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeAdminSubTab === 'reviews' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'}`}>⭐ Reviews ({reviewsList.length})</button>
          )}
          {staffRole === 'SUPER_ADMIN' && (
            <button onClick={() => setActiveAdminSubTab('invoices')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeAdminSubTab === 'invoices' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'}`}>🖨️ Invoices ({invoices.length})</button>
          )}
          {staffRole === 'SUPER_ADMIN' && (
            <button onClick={() => setActiveAdminSubTab('staff')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeAdminSubTab === 'staff' ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-400'}`}>👷 Staff ({staffList.length})</button>
          )}
        </div>

        <button onClick={fetchAllData} className="px-3 py-1.5 bg-slate-800 text-xs font-bold text-slate-300 rounded-xl hover:text-white">
          ↻ Refresh Data
        </button>
      </div>

      {/* ==================== 1. FLEET FULL CRUD ==================== */}
      {activeAdminSubTab === 'inventory' && (
        <div className="space-y-8">
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">{editingVehicleId ? '✏️ Edit Vehicle' : '➕ Add Vehicle to Showroom'}</h3>
              <button
                type="button"
                onClick={handleGenerateAd}
                disabled={isGeneratingAd}
                className="px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold"
              >
                <span>✨</span> {isGeneratingAd ? 'Writing...' : 'Generate AI Marketing Ad'}
              </button>
            </div>

            {generatedAd && (
              <div className="p-4 bg-slate-950 border border-amber-500/40 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block mb-1">සිංහල Ad:</span>
                  <textarea readOnly rows="6" value={generatedAd.sinhalaAd} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 text-[11px]" />
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-1">English Ad:</span>
                  <textarea readOnly rows="6" value={generatedAd.englishAd} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 text-[11px]" />
                </div>
              </div>
            )}

            <form onSubmit={handleVehicleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input required placeholder="Title *" value={vehicleForm.title} onChange={e => setVehicleForm({ ...vehicleForm, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white md:col-span-2" />
                <input required placeholder="Brand *" value={vehicleForm.brand} onChange={e => setVehicleForm({ ...vehicleForm, brand: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
                <input required placeholder="Model *" value={vehicleForm.model} onChange={e => setVehicleForm({ ...vehicleForm, model: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input required type="number" placeholder="Selling Price (LKR) *" value={vehicleForm.price} onChange={e => setVehicleForm({ ...vehicleForm, price: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-amber-400 font-bold" />
                <input type="number" placeholder="Purchase Cost (LKR)" value={vehicleForm.purchaseCost} onChange={e => setVehicleForm({ ...vehicleForm, purchaseCost: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
                <input type="number" placeholder="Year" value={vehicleForm.manufactureYear} onChange={e => setVehicleForm({ ...vehicleForm, manufactureYear: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
                <input type="number" placeholder="Mileage (KM)" value={vehicleForm.mileageKm} onChange={e => setVehicleForm({ ...vehicleForm, mileageKm: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center">
                <span className="text-xs text-white font-bold">📸 Upload Photos from Device:</span>
                <input type="file" multiple accept="image/*" onChange={handleMultipleFilesUpload} className="text-xs text-slate-300" />
              </div>

              <div className="flex gap-2">
                <button type="submit" className={`flex-1 py-3.5 rounded-xl font-bold uppercase text-white ${editingVehicleId ? 'bg-amber-600' : 'bg-red-600'}`}>
                  {editingVehicleId ? 'Update Vehicle' : '+ Publish Vehicle'}
                </button>
                {editingVehicleId && (
                  <button type="button" onClick={() => { setEditingVehicleId(null); setUploadedImages([]); }} className="px-6 py-3.5 bg-slate-800 text-slate-300 rounded-xl font-bold">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Table */}
          <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Live Fleet Table ({safeVehicles.length})</h3>
              <input type="text" placeholder="Search..." value={adminSearch} onChange={e => setAdminSearch(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 text-[10px] uppercase text-slate-500">
                  <tr>
                    <th className="py-2.5 px-2">Vehicle</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th className="text-right px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredVehicles.map(v => (
                    <tr key={v.id} className="hover:bg-slate-950/40">
                      <td className="py-2.5 px-2 font-bold text-white">{v.title}</td>
                      <td>{v.vehicleType}</td>
                      <td className="text-amber-400 font-bold">LKR {Number(v.price).toLocaleString()}</td>
                      <td><span className={`px-2 py-0.5 rounded text-[10px] ${v.status === 'RESERVED' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800'}`}>{v.status}</span></td>
                      <td className="text-right px-2 space-x-2">
                        <button onClick={() => startEditVehicle(v)} className="px-3 py-1 bg-slate-800 text-slate-200 rounded-lg">Edit</button>
                        <button onClick={() => handleDeleteVehicle(v.id)} className="px-3 py-1 bg-red-950/40 text-red-400 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* ==================== 2. SPARE PARTS FULL CRUD ==================== */}
      {activeAdminSubTab === 'spareparts' && (
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Spare Parts Inventory ({spareParts.length})</h3>
            <button onClick={() => { setShowPartForm(!showPartForm); setEditingPartId(null); }} className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs">
              {showPartForm ? 'Close' : '+ Add New Part'}
            </button>
          </div>

          {showPartForm && (
            <form onSubmit={handlePartSubmit} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <input required placeholder="Part Name" value={partForm.name} onChange={e => setPartForm({ ...partForm, name: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white md:col-span-2" />
              <input required placeholder="OEM Number" value={partForm.partNumber} onChange={e => setPartForm({ ...partForm, partNumber: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <input required type="number" placeholder="Price (LKR)" value={partForm.price} onChange={e => setPartForm({ ...partForm, price: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <button type="submit" className="md:col-span-4 py-2.5 bg-emerald-600 text-white font-bold rounded-xl">{editingPartId ? 'Update Part' : 'Save Part'}</button>
            </form>
          )}

          <table className="w-full text-left text-xs text-slate-300">
            <tbody className="divide-y divide-slate-800/60">
              {spareParts.map(p => (
                <tr key={p.id}>
                  <td className="py-2.5 px-2 font-bold text-white">{p.name} ({p.partNumber})</td>
                  <td className="text-emerald-400 font-bold">LKR {Number(p.price).toLocaleString()}</td>
                  <td className="text-right space-x-2">
                    <button onClick={() => startEditPart(p)} className="px-3 py-1 bg-slate-800 text-slate-200 rounded-lg">Edit</button>
                    <button onClick={() => handleDeletePart(p.id)} className="px-3 py-1 bg-red-950/40 text-red-400 rounded-lg">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* ==================== 3. WORKSHOP FULL CRUD ==================== */}
      {activeAdminSubTab === 'workshop' && (
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Workshop Service Orders ({serviceJobs.length})</h3>
            <button onClick={() => setShowAddJobForm(!showAddJobForm)} className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs">
              {showAddJobForm ? 'Cancel' : '+ Add Manual Job'}
            </button>
          </div>

          {showAddJobForm && (
            <form onSubmit={handleCreateServiceJob} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <input required placeholder="Vehicle # (WP CAA-1234)" value={newJobForm.vehicleNumber} onChange={e => setNewJobForm({ ...newJobForm, vehicleNumber: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white uppercase font-bold" />
              <input required placeholder="Model (Toyota Vitz)" value={newJobForm.vehicleModel} onChange={e => setNewJobForm({ ...newJobForm, vehicleModel: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <input required placeholder="Customer Name" value={newJobForm.customerName} onChange={e => setNewJobForm({ ...newJobForm, customerName: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <input required placeholder="Phone Number" value={newJobForm.phoneNumber} onChange={e => setNewJobForm({ ...newJobForm, phoneNumber: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <button type="submit" className="md:col-span-4 py-3 bg-emerald-600 text-white font-bold rounded-xl">+ Save Order</button>
            </form>
          )}

          <div className="space-y-3">
            {serviceJobs.map(job => (
              <div key={job.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between gap-4 text-xs">
                <div>
                  <span className="font-black text-amber-400 text-sm">{job.vehicleNumber}</span> ({job.vehicleModel})
                  <p className="text-slate-400">Client: {job.customerName} | Phone: {job.phoneNumber}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={job.status || 'RECEIVED'}
                    onChange={e => handleUpdateJobStatus(job.id, e.target.value, job.estimatedCost)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                  >
                    <option value="RECEIVED">📥 RECEIVED</option>
                    <option value="INSPECTION">🔍 INSPECTION</option>
                    <option value="WORK_IN_PROGRESS">⚙️ WORK IN PROGRESS</option>
                    <option value="READY_FOR_DELIVERY">✅ READY FOR DELIVERY</option>
                    <option value="COMPLETED">🏁 COMPLETED</option>
                  </select>

                  <button
                    onClick={() => {
                      const cost = prompt('Enter repair cost in LKR:', job.estimatedCost || '');
                      if (cost !== null) handleUpdateJobStatus(job.id, job.status, cost);
                    }}
                    className="px-3 py-1.5 bg-slate-800 text-amber-400 font-bold rounded-xl"
                  >
                    {job.estimatedCost ? `LKR ${Number(job.estimatedCost).toLocaleString()}` : '+ Cost'}
                  </button>

                  <button onClick={() => sendWhatsApp(job.phoneNumber, `Your vehicle ${job.vehicleNumber} status is: ${job.status}.`)} className="px-3 py-1.5 bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold rounded-xl">
                    WhatsApp
                  </button>

                  <button onClick={() => handleDeleteJob(job.id)} className="px-2.5 py-1.5 bg-red-950/40 text-red-400 rounded-xl">
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 4. RESERVATIONS FULL CRUD ==================== */}
      {activeAdminSubTab === 'reservations' && (
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-bold text-white">Paid Vehicle Holds ({reservations.length})</h3>
          <div className="space-y-3">
            {reservations.map(r => (
              <div key={r.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center text-xs">
                <div>
                  <span className="font-mono text-amber-400 font-bold">{r.reservationCode}</span> &bull; <strong className="text-white">{r.vehicleTitle}</strong>
                  <p className="text-slate-400">Customer: {r.customerName} ({r.customerPhone})</p>
                  <p className="text-emerald-400 font-bold mt-1">Deposit: LKR {Number(r.advanceAmountPaid).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => sendWhatsApp(r.customerPhone, `Hello ${r.customerName}, regarding reservation ${r.reservationCode}...`)} className="px-3 py-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-xl">
                    WhatsApp
                  </button>
                  <button onClick={() => handleDeleteReservation(r.id)} className="px-3 py-1.5 bg-red-950/40 text-red-400 rounded-xl">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 5. LEADS FULL CRUD ==================== */}
      {activeAdminSubTab === 'inquiries' && (
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-bold text-white">Customer Leads &amp; Messages ({leadsList.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leadsList.map(iq => (
              <div key={iq.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2">
                <div className="flex justify-between font-bold text-white">
                  <span>{iq.customerName} ({iq.phoneNumber})</span>
                  <span className="text-amber-400 uppercase">{iq.inquiryType}</span>
                </div>
                <p className="text-slate-300 italic">"{iq.message}"</p>
                <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                  <select value={iq.status || 'PENDING'} onChange={e => handleUpdateLeadStatus(iq.id, e.target.value)} className="p-1 rounded bg-slate-900 border border-slate-700 text-white text-[11px]">
                    <option value="PENDING">PENDING</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                  <div className="flex gap-2">
                    <button onClick={() => sendWhatsApp(iq.phoneNumber, `Hello ${iq.customerName}...`)} className="text-emerald-400 font-bold">Reply</button>
                    <button onClick={() => handleDeleteLead(iq.id)} className="text-red-400 font-bold">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 6. TRADE-IN FULL CRUD ==================== */}
      {activeAdminSubTab === 'tradeins' && (
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-bold text-white">Trade-In Applications ({tradeIns.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tradeIns.map(t => (
              <div key={t.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white">{t.vehicleBrand} {t.vehicleModel} ({t.manufactureYear})</h4>
                    <p className="text-slate-400">Owner: {t.customerName} | Phone: {t.phoneNumber}</p>
                  </div>
                  <button onClick={() => handleDeleteTradeIn(t.id)} className="text-red-400">Delete</button>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => { const offer = prompt('Enter Offer in LKR:', t.showroomValuationOffer || ''); if (offer !== null) handleUpdateTradeInOffer(t.id, 'OFFERED', offer); }} className="flex-1 py-1.5 bg-emerald-600 text-white font-bold rounded-xl">
                    {t.showroomValuationOffer ? `Offer: LKR ${Number(t.showroomValuationOffer).toLocaleString()}` : '+ Set Offer'}
                  </button>
                  <button onClick={() => sendWhatsApp(t.phoneNumber, `Valuation offer is LKR ${Number(t.showroomValuationOffer || 0).toLocaleString()}.`)} className="px-3 py-1.5 bg-slate-800 text-white font-bold rounded-xl">
                    WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 7. REVIEWS FULL CRUD ==================== */}
      {activeAdminSubTab === 'reviews' && (
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Reviews ({reviewsList.length})</h3>
            <button onClick={() => { setShowReviewForm(!showReviewForm); setEditingReviewId(null); }} className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs">
              {showReviewForm ? 'Cancel' : '+ Add Review'}
            </button>
          </div>

          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <input required placeholder="Customer Name *" value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <input placeholder="Vehicle Purchased" value={reviewForm.vehicle} onChange={e => setReviewForm({ ...reviewForm, vehicle: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <select value={reviewForm.rating} onChange={e => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value, 10) })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white">
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3}>⭐⭐⭐ (3 Stars)</option>
              </select>
              <textarea required rows="2" placeholder="Feedback..." value={reviewForm.comment} onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white md:col-span-3" />
              <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl">{editingReviewId ? 'Update Review' : 'Save Review'}</button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviewsList.map(r => (
              <div key={r.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-400">{'⭐'.repeat(r.rating || 5)}</span>
                  <div className="flex gap-2">
                    <button onClick={() => startEditReview(r)} className="text-slate-300">Edit</button>
                    <button onClick={() => handleDeleteReview(r.id)} className="text-red-400">Delete</button>
                  </div>
                </div>
                <p className="font-bold text-white">{r.name}</p>
                <p className="text-slate-400 italic">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 8. INVOICES FULL CRUD ==================== */}
      {activeAdminSubTab === 'invoices' && (
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Invoices &amp; Receipts ({invoices.length})</h3>
            <button onClick={() => setShowInvoiceModal(!showInvoiceModal)} className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs">+ Create Invoice</button>
          </div>

          {showInvoiceModal && (
            <form onSubmit={handleCreateInvoice} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <input required placeholder="Customer Name *" value={invoiceForm.customerName} onChange={e => setInvoiceForm({ ...invoiceForm, customerName: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <input required placeholder="Phone Number *" value={invoiceForm.phoneNumber} onChange={e => setInvoiceForm({ ...invoiceForm, phoneNumber: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <input required placeholder="Item Description *" value={invoiceForm.itemDescription} onChange={e => setInvoiceForm({ ...invoiceForm, itemDescription: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <input required type="number" placeholder="Subtotal (LKR) *" value={invoiceForm.subTotal} onChange={e => setInvoiceForm({ ...invoiceForm, subTotal: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <button type="submit" className="md:col-span-3 py-3 bg-emerald-600 text-white font-bold rounded-xl uppercase">Generate Receipt</button>
            </form>
          )}

          <div className="space-y-2">
            {invoices.map(i => (
              <div key={i.id} className="p-3 bg-slate-950 rounded-xl flex justify-between items-center text-xs">
                <div><span className="font-bold text-amber-400">{i.invoiceNumber}</span> &bull; {i.customerName} ({i.itemDescription})</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => printInvoicePDF(i)} className="px-3 py-1 bg-slate-800 text-white rounded-lg">PDF</button>
                  <button onClick={() => handleDeleteInvoice(i.id)} className="px-3 py-1 bg-red-950/40 text-red-400 rounded-lg">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 9. STAFF FULL CRUD ==================== */}
      {activeAdminSubTab === 'staff' && (
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Staff Management ({staffList.length})</h3>
            <button onClick={() => { setShowStaffForm(!showStaffForm); setEditingStaffId(null); }} className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs">
              {showStaffForm ? 'Cancel' : '+ Add Staff'}
            </button>
          </div>

          {showStaffForm && (
            <form onSubmit={handleStaffSubmit} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <input required placeholder="Full Name" value={staffForm.fullName} onChange={e => setStaffForm({ ...staffForm, fullName: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <input required type="email" placeholder="Login Email" value={staffForm.email} onChange={e => setStaffForm({ ...staffForm, email: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <input required type="password" placeholder="Password" value={staffForm.password} onChange={e => setStaffForm({ ...staffForm, password: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <select value={staffForm.role} onChange={e => setStaffForm({ ...staffForm, role: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white">
                <option value="SUPER_ADMIN">👑 Super Admin</option>
                <option value="WORKSHOP_MANAGER">🔧 Workshop Manager</option>
                <option value="SALES_EXECUTIVE">💼 Sales Executive</option>
                <option value="TECHNICIAN">⚙️ Technician</option>
              </select>
              <input placeholder="Phone" value={staffForm.phoneNumber} onChange={e => setStaffForm({ ...staffForm, phoneNumber: e.target.value })} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-white" />
              <button type="submit" className="md:col-span-3 py-3 bg-emerald-600 text-white font-bold rounded-xl uppercase">Save Staff Account</button>
            </form>
          )}

          <div className="space-y-2">
            {staffList.map(s => (
              <div key={s.id} className="p-3 bg-slate-950 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-white">{s.fullName}</span> ({s.email}) &bull; <span className="text-amber-400">{s.role}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEditStaff(s)} className="px-3 py-1 bg-slate-800 text-slate-200 rounded-lg">Edit</button>
                  <button onClick={() => handleDeleteStaff(s.id)} className="px-3 py-1 bg-red-950/40 text-red-400 rounded-lg">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default AdminPanel;