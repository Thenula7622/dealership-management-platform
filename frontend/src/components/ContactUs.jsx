import React, { useState } from 'react';

const ContactUs = ({ config }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('කරුණාකර නම, දුරකථන අංකය සහ පණිවිඩය ඇතුළත් කරන්න.');
      return;
    }

    setSubmitting(true);
    const payload = {
      customerName: name.trim(),
      phoneNumber: phone.trim(),
      inquiryType: 'GENERAL_CONTACT',
      message: `[Email: ${email.trim() || 'N/A'}] ${message.trim()}`,
      status: 'PENDING'
    };

    try {
      const res = await fetch('http://localhost:8080/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('ඔබගේ පණිවිඩය සාර්ථකව Showroom Admin වෙත යොමු විය! අප ඔබව ඉක්මනින් සම්බන්ධ කරගන්නෙමු.');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        alert('පණිවිඩය යැවීම අසාර්ථක විය.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error connecting to Backend.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-red-500 font-bold text-xs uppercase tracking-widest">Get In Touch</span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-1">Contact Our Showroom</h2>
        <p className="text-slate-400 text-sm mt-3">
          ප්‍රදර්ශනාගාරයට පැමිණීමට, වාහන පරීක්ෂාවට හෝ ඕනෑම විමසීමකට අප හා සම්බන්ධ වන්න.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 text-xl font-bold">
            📞
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Hotline</span>
            <p className="text-sm font-black text-white">{config?.contactPhone || '94 76 820 2700'}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-bold">
            💬
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">WhatsApp</span>
            <p className="text-sm font-black text-emerald-400">+{config?.whatsappNumber || '94 76 820 2700'}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-bold">
            ✉️
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Email</span>
            <p className="text-sm font-black text-white truncate max-w-[180px]">{config?.email || 'thenula2002@gmail.com'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-7 sm:p-8 rounded-3xl shadow-xl">
          <h3 className="text-lg font-bold text-white mb-1">Send a Direct Message</h3>
          <p className="text-xs text-slate-400 mb-6">පහත පෝරමය පුරවා අප වෙත ක්ෂණික පණිවිඩයක් යොමු කරන්න.</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Kasun Fernando"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0771234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Your Message / Inquiry *</label>
              <textarea
                rows="4"
                required
                placeholder="ඔබට අවශ්‍ය වාහනය හෝ විමසීම මෙහි සටහන් කරන්න..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-red-950/50"
            >
              {submitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Map & Location */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Showroom Location</span>
            <h3 className="text-lg font-black text-white">Visit Our Dealership</h3>
            <p className="text-xs text-slate-400 mt-0.5">📍 {config?.address || 'Mawathagama, Sri Lanka'}</p>
          </div>

          <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-800">
            <iframe
              title="Showroom Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2710189445173!2d80.4357774!3d7.4243673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae341c2c31e97d1%3A0x6b4c1aa5546e8c07!2sMawathagama!5e0!3m2!1sen!2slk!4v1711270000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>Showroom Hours: Mon-Sat 8:30 AM - 6:30 PM</span>
            <span className="text-emerald-400 font-bold">✓ Open for Walk-ins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;