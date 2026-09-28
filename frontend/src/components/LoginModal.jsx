import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@thenula.lk');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:8080/api/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      if (res.ok) {
        const staffUser = await res.json();
        onLoginSuccess(staffUser);
        onClose();
      } else {
        const err = await res.text();
        setErrorMsg(err || 'Invalid Staff Credentials.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Cannot connect to Backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (roleEmail, rolePass) => {
    setEmail(roleEmail);
    setPassword(rolePass);
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

        {/* Quick Demo Login Credentials Bar */}
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Quick Demo Credentials:</span>
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <button
              type="button"
              onClick={() => handleQuickFill('admin@thenula.lk', 'admin123')}
              className="p-1.5 rounded-lg bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900 font-bold truncate"
            >
              👑 Super Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('service@thenula.lk', 'service123')}
              className="p-1.5 rounded-lg bg-blue-950/40 text-blue-400 border border-blue-500/30 hover:bg-blue-900 font-bold truncate"
            >
              🔧 Workshop Mgr
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('sales@thenula.lk', 'sales123')}
              className="p-1.5 rounded-lg bg-amber-950/40 text-amber-400 border border-amber-500/30 hover:bg-amber-900 font-bold truncate"
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
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1">Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-red-950/50"
          >
            {loading ? 'Authenticating Staff...' : 'Sign In to Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;