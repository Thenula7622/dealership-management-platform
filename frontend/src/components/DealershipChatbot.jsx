import React, { useState, useEffect, useRef } from 'react';

const DealershipChatbot = ({ vehicles, config, onInquire, onOpenCalculator }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `ආයුබෝවන්! ${config?.businessName || 'Thenula Enterprises'} AI Smart Assistant වෙත සාදරයෙන් පිළිගනිමු. මම ඔබගේ සජීවී මෝටර් රථ සහායක.\n\nඔබ සොයන Budget එක (e.g. "Cars under 8M"), Model එක, Leasing වාරික හෝ සර්විස් ගාස්තු ගැන ඕනෑම දෙයක් මෙහි විමසන්න (හෝ Mic එකෙන් කතා කරන්න).`
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice Recognition (Speech to Text)
  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('ඔබගේ Browser එක Voice Recognition සඳහා සහය නොදක්වයි. කරුණාකර Google Chrome භාවිතා කරන්න.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      handleAIProcessing(transcript);
    };

    recognition.start();
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input.trim();
    setInput('');
    handleAIProcessing(userText);
  };

  const handleAIProcessing = (userText) => {
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let matchedVehicles = [];
      let botReply = '';

      // 1. Budget Detection
      const priceMatch = lower.match(/(\d+)\s*(million|m|ලක්ෂ)/);
      if (priceMatch) {
        let maxVal = parseFloat(priceMatch[1]);
        if (priceMatch[2] === 'ලක්ෂ') maxVal = maxVal * 100000;
        else maxVal = maxVal * 1000000;

        matchedVehicles = vehicles.filter(v => parseFloat(v.price) <= maxVal);
        botReply = `ඔබ සොයන LKR ${maxVal.toLocaleString()} සීමාවට ගැළපෙන වාහන ${matchedVehicles.length}ක් අප ප්‍රදර්ශනාගාරයේ ඇත:`;
      } 
      // 2. Specific Vehicle Query
      else if (lower.includes('vitz') || lower.includes('vezel') || lower.includes('premio') || lower.includes('alto') || lower.includes('leaf') || lower.includes('bike') || lower.includes('van') || lower.includes('truck')) {
        matchedVehicles = vehicles.filter(v =>
          v.title.toLowerCase().includes('vitz') ||
          v.title.toLowerCase().includes('vezel') ||
          v.title.toLowerCase().includes('premio') ||
          v.title.toLowerCase().includes('alto') ||
          v.vehicleType?.toLowerCase().includes('bike') ||
          v.vehicleType?.toLowerCase().includes('van')
        );
        botReply = `ඔබ විමසූ වර්ගයට ගැළපෙන හොඳම තත්ත්වයේ වාහන පහත දැක්වේ:`;
      }
      // 3. Leasing Inquiry
      else if (lower.includes('lease') || lower.includes('ණය') || lower.includes('finance') || lower.includes('installment')) {
        botReply = `අපගේ සියලුම වාහන සඳහා 70% දක්වා ප්‍රමුඛ පෙළේ මූල්‍ය ආයතන මඟින් ලීසිං පහසුකම් දින 1කින් සලසා දිය හැක. වාහන කාඩ්පත් වල ඇති "Lease" බොත්තම ඔබා මාසික වාරිකය සහ නිල PDF Quotation එක ලබාගත හැක.`;
      }
      // 4. Workshop & Service Center
      else if (lower.includes('service') || lower.includes('repair') || lower.includes('ලූබ්‍රිකන්ට්') || lower.includes('සර්විස්')) {
        botReply = `අපගේ Workshop එකෙන් Full Lubrication, 3D Wheel Alignment, Hybrid Diagnostic Scan සහ Brake Overhaul සේවාවන් ලබාගත හැක. සේවා පියස (Service Center) වෙත ගොස් ඔබට පහසු වේලාවක් (Slot) Online වෙන්කරවා ගන්න.`;
      }
      // 5. Default Smart Pitch
      else {
        matchedVehicles = vehicles.slice(0, 2);
        botReply = `ස්තූතියි! ඔබගේ සෙවීමට අදාළව අප ප්‍රදර්ශනාගාරයේ දැනට ඇති ජනප්‍රියම ඒකක කිහිපයක් පහතින් පරීක්ෂා කළ හැක:`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          recommendedVehicles: matchedVehicles.slice(0, 3)
        }
      ]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen ? (
        <div className="bg-slate-900 border border-slate-700 w-80 sm:w-[420px] h-[520px] rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-2xl">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">AI Showroom Advisor</h4>
                <p className="text-[10px] text-slate-200">Connected to Live Fleet Inventory</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-80 p-1 text-sm font-bold">✕</button>
          </div>

          {/* Chat Messages Log */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}>
                <div className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-br-none shadow'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none whitespace-pre-line'
                }`}>
                  {m.text}
                </div>

                {/* Interactive Vehicle Mini-Cards */}
                {m.recommendedVehicles && m.recommendedVehicles.length > 0 && (
                  <div className="w-full space-y-2 pt-1">
                    {m.recommendedVehicles.map(veh => (
                      <div key={veh.id} className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 flex items-center gap-3">
                        <img src={veh.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover border border-slate-800" />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-white text-xs truncate">{veh.title}</h5>
                          <p className="text-[10px] text-amber-400 font-black">LKR {Number(veh.price).toLocaleString()}</p>
                          <div className="flex gap-2 mt-1">
                            <button
                              onClick={() => { setIsOpen(false); onInquire && onInquire(veh); }}
                              className="text-[10px] bg-red-600 hover:bg-red-500 text-white font-bold px-2 py-0.5 rounded-lg"
                            >
                              Test Drive
                            </button>
                            <button
                              onClick={() => { setIsOpen(false); onOpenCalculator && onOpenCalculator(veh); }}
                              className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-lg"
                            >
                              Lease
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice & Text Input */}
          <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <button
              type="button"
              onClick={startVoiceInput}
              className={`p-2.5 rounded-xl border transition ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse border-red-500'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
              title="Voice Search (Speak now)"
            >
              🎤
            </button>
            <input
              type="text"
              placeholder={isListening ? "Listening..." : "Ask budget, model, lease..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
            />
            <button type="submit" className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition">
              ➤
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:scale-105 text-white rounded-full shadow-2xl flex items-center gap-2.5 transition font-black text-xs uppercase tracking-wider"
        >
          <span className="text-xl">🤖</span>
          <span className="hidden sm:inline">Ask AI Advisor</span>
        </button>
      )}
    </div>
  );
};

export default DealershipChatbot;