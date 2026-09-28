import React, { useState, useEffect } from 'react';

const Careers = ({ config }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyForm, setApplyForm] = useState({ name: '', phone: '', email: '', experience: '', cvLink: '' });
  const [submitted, setSubmitted] = useState(false);

  // Fetch OPEN vacancies from Backend Database
  const fetchOpenVacancies = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/vacancies/open')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOpenVacancies();
  }, []);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.phone) return;

    try {
      const res = await fetch('http://localhost:8080/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: applyForm.name,
          phoneNumber: applyForm.phone,
          inquiryType: 'JOB_APPLICATION',
          message: `[Position: ${selectedJob.title}] [Email: ${applyForm.email}] [Exp: ${applyForm.experience}] [CV: ${applyForm.cvLink}]`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSelectedJob(null);
          setSubmitted(false);
          setApplyForm({ name: '', phone: '', email: '', experience: '', cvLink: '' });
          alert('ඔබගේ අයදුම්පත සාර්ථකව යොමු විය! අපගේ HR කණ්ඩායම ඔබව අමතනු ඇත.');
        }, 800);
      }
    } catch (err) {
      console.error(err);
      alert('අයදුම්පත යැවීම අසාර්ථක විය.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Join Our Automotive Team</span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-2">Careers & Vacancies</h2>
        <p className="text-slate-400 text-sm mt-3">
          ශ්‍රී ලංකාවේ ප්‍රමුඛ පෙළේ මෝටර් රථ ප්‍රදර්ශනාගාර ජාලය සමඟ එක්ව ඔබේ වෘත්තීය ගමන අරඹන්න.
        </p>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 text-sm">
          Loading active showroom vacancies...
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 p-8 max-w-lg mx-auto">
          <span className="text-4xl block mb-3">💼</span>
          <h3 className="text-lg font-bold text-white">No Vacancies Available Right Now</h3>
          <p className="text-xs text-slate-400 mt-1">
            දැනට විවෘත රැකියා ඇබෑර්තු නොමැත. කරුණාකර නැවත පසුව පරීක්ෂා කරන්න.
          </p>
        </div>
      ) : (
        /* Job Listings Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => {
            const reqList = job.requirements
              ? job.requirements.split(/[\n,]+/).map((r) => r.trim()).filter(Boolean)
              : [];

            return (
              <div
                key={job.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-red-500/50 hover:shadow-xl transition"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-amber-400 px-2.5 py-1 rounded-lg">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      {job.jobType}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">📍 {job.location}</p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Remuneration</span>
                    <p className="text-xs font-black text-amber-400">{job.salary || 'Negotiable'}</p>
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">{job.description}</p>

                  {reqList.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Requirements:</p>
                      {reqList.map((req, i) => (
                        <p key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                          <span className="text-red-500 font-bold">•</span> {req}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-red-950/40"
                  >
                    Apply for Position
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-7 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-bold">Quick Application</span>
                <h3 className="text-xl font-black text-white">{selectedJob.title}</h3>
                <p className="text-xs text-slate-400">{selectedJob.department} • {selectedJob.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Fernando"
                  value={applyForm.name}
                  onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0771234567"
                    value={applyForm.phone}
                    onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Email</label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={applyForm.email}
                    onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Brief Experience / Qualifications</label>
                <textarea
                  rows="2"
                  placeholder="ඔබගේ අත්දැකීම් හෝ අධ්‍යාපන සුදුසුකම් කෙටියෙන්..."
                  value={applyForm.experience}
                  onChange={(e) => setApplyForm({ ...applyForm, experience: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Google Drive / LinkedIn / CV Link</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={applyForm.cvLink}
                  onChange={(e) => setApplyForm({ ...applyForm, cvLink: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider rounded-xl transition shadow-lg shadow-red-950/40"
                >
                  {submitted ? 'Submitting Application...' : 'Submit Application Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;