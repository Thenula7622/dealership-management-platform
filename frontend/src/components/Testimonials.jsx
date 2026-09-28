import React, { useState, useEffect } from 'react';

const Testimonials = ({ language }) => {
  const [reviews, setReviews] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formVehicle, setFormVehicle] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');

  // Fetch Reviews directly from MySQL Database
  const fetchReviews = () => {
    fetch('http://localhost:8080/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formComment) return;

    const payload = {
      name: formName,
      vehicle: formVehicle || 'Verified Customer',
      rating: parseInt(formRating, 10),
      comment: formComment,
    };

    try {
      const res = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        setReviews([saved, ...reviews]);
        setFormName('');
        setFormVehicle('');
        setFormComment('');
        setIsFormOpen(false);
        alert(language === 'en' ? 'Thank you! Your review has been saved in the database.' : 'ඔබගේ අදහස සාර්ථකව Database එකේ තැන්පත් විය!');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving review to database.');
    }
  };

  return (
    <section className="border-t border-slate-800 bg-slate-950 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Submit CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <span className="text-red-500 font-bold text-xs uppercase tracking-widest">
              {language === 'en' ? 'Verified Client Reviews' : 'පාරිභෝගික අදහස්'}
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              {language === 'en' ? 'What Our Buyers Say' : 'අපගේ සේවාදායකයින්ගේ අත්දැකීම්'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 font-bold text-xs rounded-xl transition shadow"
          >
            {isFormOpen ? 'Cancel' : '✍️ Write a Review'}
          </button>
        </div>

        {/* Review Submission Form */}
        {isFormOpen && (
          <form
            onSubmit={handleReviewSubmit}
            className="mb-10 bg-slate-900 border border-slate-800 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Kasun Fernando"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Purchased Vehicle (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Toyota Vitz / Bajaj Boxer"
                value={formVehicle}
                onChange={(e) => setFormVehicle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Star Rating</label>
              <select
                value={formRating}
                onChange={(e) => setFormRating(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                <option value="3">⭐⭐⭐ (3 Stars)</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Your Feedback / Review *</label>
              <textarea
                rows="3"
                required
                placeholder="Share your buying experience or vehicle condition..."
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg"
              >
                Save Review to Database
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid */}
        {reviews.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            No reviews added yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-amber-400 text-sm">
                      {'⭐'.repeat(r.rating || 5)}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs italic leading-relaxed">
                    "{r.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold text-white">{r.name}</h4>
                  <p className="text-[10px] text-emerald-400 font-semibold">{r.vehicle}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;