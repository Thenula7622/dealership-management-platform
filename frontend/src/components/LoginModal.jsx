import React, { useState } from 'react';

// Vercel Demo Accounts
const DEMO_STAFF_ACCOUNTS = [
  {
    id: 1,
    fullName: 'Thenula Rathnayaka (Executive)',
    email: 'admin@thenula.lk',
    password: 'admin123',
    role: 'SUPER_ADMIN',
    phoneNumber: '0768202700',
  },
  {
    id: 2,
    fullName: 'Nimal Perera (Service Lead)',
    email: 'service@thenula.lk',
    password: 'service123',
    role: 'WORKSHOP_MANAGER',
    phoneNumber: '0771234567',
  },
  {
    id: 3,
    fullName: 'Ruwan Silva (Sales Consultant)',
    email: 'sales@thenula.lk',
    password: 'sales123',
    role: 'SALES_EXECUTIVE',
    phoneNumber: '0719876543',
  },
];

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@thenula.lk');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Backend එකට call කරන්නේ නැතුව කෙළින්ම Demo Account එක verify කරයි
    const matchedStaff = DEMO_STAFF_ACCOUNTS.find(
      (s) => s.email.toLowerCase() === cleanEmail && s.password === cleanPass
    );

    setTimeout(() => {
      if (matchedStaff) {
        onLoginSuccess(matchedStaff);
        onClose();
      } else {
        setErrorMsg('Invalid Credentials! Please click the quick buttons above.');
      }
      setLoading(false);
    }, 250);
  };

  const handleQuickFill = (roleEmail, rolePass) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-7 shadow-2xl space-y-6">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Enterprise DMS Access</span>
            <h3 className="text-xl font-black text-white mt-0.5">Staff &amp; Admin Sign In</h3>
            <p className="text-xs text-slate-400">ඔබගේ කාර්යභාරයට අදාළ ගිණුමෙන් ඇතුළත් වන්න.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2">✕</button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-400 rounded-xl text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Quick Demo One-Click Login Buttons */}
        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Instant Demo Access:</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/20">Click &amp; Sign In</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <button
              type="button"
              onClick={() => handleQuickFill('admin@thenula.lk', 'admin123')}
              className="p-2 rounded-xl bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900/60 font-bold truncate transition"
            >
              👑 Super Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('service@thenula.lk', 'service123')}
              className="p-2 rounded-xl bg-blue-950/40 text-blue-400 border border-blue-500/30 hover:bg-blue-900/60 font-bold truncate transition"
            >
              🔧 Workshop Mgr
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('sales@thenula.lk', 'sales123')}
              className="p-2 rounded-xl bg-amber-950/40 text-amber-400 border border-amber-500/30 hover:bg-amber-900/60 font-bold truncate transition"
            >
              💼 Sales Exec
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-bold block mb-1">Staff Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 font-medium"
            />
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1">Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-red-950/50"
          >
            {loading ? 'Entering Dashboard...' : 'Sign In to Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;