import React, { useState } from 'react';

const CustomerAuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const endpoint = isSignUp 
        ? 'http://localhost:8080/api/customers/register'
        : 'http://localhost:8080/api/customers/login';

      const payload = isSignUp ? { name, email, password } : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('customerUser', JSON.stringify(data));
        onAuthSuccess(data);
        onClose();
      } else {
        setErrorMsg(data.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not connect to database server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-7 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-black text-white">
              {isSignUp ? 'Create Customer Account' : 'Customer Sign In'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isSignUp
                ? 'Sign up to sync your wishlist permanently across all devices.'
                : 'Sign in to access your saved vehicles and test drives.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-400 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {isSignUp && (
            <div>
              <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Kasun Fernando"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 text-xs"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Email Address *</label>
            <input
              type="email"
              required
              placeholder="e.g. yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 text-xs"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-red-950/40 mt-2"
          >
            {loading ? 'Connecting to Database...' : isSignUp ? 'Sign Up (Save Account)' : 'Sign In'}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
            }}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Create One"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerAuthModal;