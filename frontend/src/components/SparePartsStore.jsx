import React, { useState, useEffect } from 'react';

const SparePartsStore = ({ config, customerUser }) => {
  const [parts, setParts] = useState([]);
  const [category, setCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [ordering, setOrdering] = useState(false);

  const fetchParts = () => {
    fetch('http://localhost:8080/api/spare-parts')
      .then((r) => r.json())
      .then((d) => setParts(d))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    const itemList = cart.map((c) => `• ${c.name} (${c.partNumber}) x ${c.qty} = LKR ${(c.price * c.qty).toLocaleString()}`).join('\n');
    const msg = `Hello ${config?.businessName || 'Thenula Enterprises'}, I want to order the following Spare Parts:\n\n${itemList}\n\nTotal: LKR ${cartTotal.toLocaleString()}\nCustomer Name: ${customerUser?.name || 'Guest'}`;
    const url = `https://wa.me/${config?.whatsappNumber || '94771234567'}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const categories = ['ALL', 'FILTERS', 'BRAKES', 'LUBRICANTS', 'ELECTRICAL', 'ACCESSORIES'];

  const filteredParts = parts.filter((p) => {
    const matchesCat = category === 'ALL' || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.partNumber.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b border-slate-800 pb-6">
        <div>
          <span className="text-red-500 font-bold text-xs uppercase tracking-widest">Genuine 3S Parts Store</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-1">Spare Parts &amp; Accessories</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Original OEM filters, brake components, high-grade lubricants &amp; car accessories.</p>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg"
        >
          <span>🛒 Parts Cart</span>
          {cart.length > 0 && <span className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full text-[10px]">{cart.length}</span>}
        </button>
      </div>

      {/* Categories & Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                category === c ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by part name or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
        />
      </div>

      {/* Grid */}
      {filteredParts.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 text-slate-400 text-xs">
          No parts listed yet in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredParts.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between hover:border-slate-700 transition">
              <div>
                <div className="h-44 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden mb-4 relative">
                  <img src={item.imageUrl || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80'} alt="" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-900/90 text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded-lg border border-slate-800">
                    {item.category}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">{item.name}</h4>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Part #: {item.partNumber}</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{item.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Price</span>
                  <p className="text-base font-black text-amber-400">LKR {Number(item.price).toLocaleString()}</p>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(item)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition"
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-end z-50">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                <h3 className="text-lg font-black text-white">Your Parts Cart ({cart.length})</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white p-2">✕</button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 text-slate-500 text-xs">Your cart is empty.</div>
              ) : (
                <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">
                  {cart.map((c) => (
                    <div key={c.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-white">{c.name}</p>
                        <p className="text-[10px] text-slate-400">LKR {c.price.toLocaleString()} x {c.qty}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-amber-400">LKR {(c.price * c.qty).toLocaleString()}</span>
                        <button onClick={() => removeFromCart(c.id)} className="text-red-400 font-bold">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-400">Total Price:</span>
                <span className="text-amber-400 text-lg font-black">LKR {cartTotal.toLocaleString()}</span>
              </div>
              <button
                type="button"
                onClick={handleCheckoutWhatsApp}
                disabled={cart.length === 0}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition shadow-lg"
              >
                Checkout &amp; Inquire via WhatsApp →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SparePartsStore;