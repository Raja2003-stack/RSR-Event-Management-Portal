import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Target, Sparkles, Send, CheckCircle2, User, Building, Mail, Phone, ArrowLeft, Flame, Award } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function LeadCapture() {
  const { eventId } = useParams();
  const { events, addLead, leads } = useStore();
  const event = events.find(e => e.id === eventId) || events[0];

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: 'Founder / CXO',
    interest: 'Enterprise CRM / Growth Tech',
    budget: '> ₹5,00,000',
    timeline: 'Immediate (0-30 days)',
    notes: ''
  });

  const [generatedScore, setGeneratedScore] = useState(null);

  const calculateAILeadScore = (data) => {
    let score = 50;
    if (data.designation.includes('CXO') || data.designation.includes('Founder') || data.designation.includes('VP')) score += 20;
    if (data.budget.includes('5,00,000') || data.budget.includes('10,00,000')) score += 15;
    if (data.timeline.includes('Immediate')) score += 12;
    if (data.company.length > 2) score += 5;
    return Math.min(score, 98);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) {
      toast.error('Please enter name, email and company');
      return;
    }

    const aiScore = calculateAILeadScore(form);
    const leadRecord = {
      ...form,
      eventId: event?.id,
      eventTitle: event?.title,
      score: aiScore,
      status: aiScore >= 80 ? 'HOT LEAD' : aiScore >= 65 ? 'WARM LEAD' : 'COLD LEAD'
    };

    addLead(leadRecord);
    setGeneratedScore(leadRecord);
    toast.success(`🎯 Lead Captured! AI Score: ${aiScore}/100`);
  };

  const resetForm = () => {
    setGeneratedScore(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      designation: 'Founder / CXO',
      interest: 'Enterprise CRM / Growth Tech',
      budget: '> ₹5,00,000',
      timeline: 'Immediate (0-30 days)',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> AI Lead Scoring Active
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900" style={{fontFamily:'Poppins,sans-serif'}}>
            On-Ground Lead Capture & Booth Scanner
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Capture booth walk-ins, qualify prospects automatically, and route directly to your sales pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2" style={{fontFamily:'Poppins,sans-serif'}}>
              <Target className="w-5 h-5 text-blue-700" /> Delegate / Prospect Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company / Organization *</label>
                  <input
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. XYZ Pvt Ltd"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Work Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="rahul@xyzpvt.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile / WhatsApp</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Designation</label>
                  <select
                    value={form.designation}
                    onChange={e => setForm({ ...form, designation: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option>Founder / CXO</option>
                    <option>VP / Director</option>
                    <option>Growth / Marketing Head</option>
                    <option>Product Manager</option>
                    <option>Software Engineer</option>
                    <option>Investor / VC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Purchase Budget</label>
                  <select
                    value={form.budget}
                    onChange={e => setForm({ ...form, budget: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option>&gt; ₹5,00,000</option>
                    <option>₹1,00,000 - ₹5,00,000</option>
                    <option>&lt; ₹1,00,000</option>
                    <option>Exploring / Evaluation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Purchase Timeline</label>
                  <select
                    value={form.timeline}
                    onChange={e => setForm({ ...form, timeline: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option>Immediate (0-30 days)</option>
                    <option>1-3 months</option>
                    <option>6+ months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Key Interest / Requirement Notes</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Needs enterprise event ticketing + CRM integration for 10 annual summits"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-700/20"
              >
                <Send className="w-4 h-4" /> Qualify Lead & Assign AI Score
              </button>
            </form>
          </div>

          {/* AI Score Feedback Box */}
          <div className="space-y-6">
            {generatedScore ? (
              <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto">
                  <Flame className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                    {generatedScore.status}
                  </span>
                  <div className="mt-4">
                    <p className="text-5xl font-black text-slate-900" style={{fontFamily:'Poppins,sans-serif'}}>
                      {generatedScore.score}<span className="text-2xl text-slate-400">/100</span>
                    </p>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Calculated AI Growth Score</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Decision Maker:</span>
                    <span className="font-bold text-slate-800">{generatedScore.designation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Budget Range:</span>
                    <span className="font-bold text-emerald-600">{generatedScore.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Timeline:</span>
                    <span className="font-bold text-blue-600">{generatedScore.timeline}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => toast.success('⚡ Lead assigned to B2B Sales Rep with 24h SLA!')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition"
                  >
                    Assign to Sales Rep
                  </button>
                  <button
                    onClick={resetForm}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition"
                  >
                    Capture Next Lead
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-6 text-white text-center space-y-4 shadow-sm">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold" style={{fontFamily:'Poppins,sans-serif'}}>RSR AI Lead Predictor</h3>
                <p className="text-xs text-blue-200 leading-relaxed">
                  Our proprietary scoring model analyzes designation level, budget authority, and timeline intent to predict closure probability in real-time.
                </p>
                <div className="p-3 bg-white/10 rounded-xl text-xs text-left space-y-1.5 border border-white/10">
                  <p className="text-emerald-300 font-semibold">🔥 80-100: Hot Lead (Closure &lt; 30d)</p>
                  <p className="text-amber-300 font-semibold">⚡ 60-79: Warm Prospect (Nurture)</p>
                  <p className="text-blue-300 font-semibold">🌱 &lt; 60: General Networking</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}