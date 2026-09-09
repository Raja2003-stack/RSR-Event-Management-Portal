import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Calendar, TrendingUp, DollarSign, Target, QrCode, 
  UserCheck, Download, Plus, Search, ArrowUpRight, Sparkles 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, CartesianGrid, PieChart, Pie, Cell 
} from 'recharts';
import { useStore } from '../store/useStore';
import StatsCard from '../components/dashboard/StatsCard';
import { formatCurrency, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const revenueData = [
  { month: 'Jan', revenue: 45000, leads: 180 },
  { month: 'Feb', revenue: 62000, leads: 240 },
  { month: 'Mar', revenue: 98000, leads: 410 },
  { month: 'Apr', revenue: 145000, leads: 680 },
  { month: 'May', revenue: 190000, leads: 820 },
  { month: 'Jun', revenue: 260000, leads: 1150 }
];

const leadFunnelData = [
  { name: 'Discovered', value: 4200, color: '#3B82F6' },
  { name: 'Registered', value: 2100, color: '#6366F1' },
  { name: 'Attended', value: 1650, color: '#8B5CF6' },
  { name: 'Hot Leads', value: 920, color: '#EC4899' },
  { name: 'Converted', value: 340, color: '#10B981' }
];

export default function Dashboard() {
  const { events, leads } = useStore();
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '1');

  const totalRegs = events.reduce((acc, e) => acc + (e.registrations || 0), 0);
  const totalAttendees = events.reduce((acc, e) => acc + (e.attendees || 0), 0);
  const totalLeads = events.reduce((acc, e) => acc + (e.leads || 0), 0) + leads.length;
  const estimatedRevenue = events.reduce((acc, e) => acc + (e.registrations * 1200), 0);

  const exportReport = () => {
    toast.success('📊 Exporting CSV Growth Analytics Report...');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Poppins,sans-serif'}}>
                Organizer Growth Control Center
              </h1>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Pro
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-1">Real-time attendance, lead generation, and event ROI monetization pipeline.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportReport}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition"
            >
              <Download className="w-4 h-4" /> Export Report
            </button>
            <Link
              to="/create-event"
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-sm"
            >
              <Plus className="w-4 h-4" /> Host New Event
            </Link>
          </div>
        </div>

        {/* 4 Big KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard
            title="Total Events Managed"
            value={events.length}
            subtitle="Active across 6 categories"
            icon={Calendar}
            color="blue"
            trend="+12% MoM"
          />
          <StatsCard
            title="Total Registrations"
            value={totalRegs.toLocaleString()}
            subtitle="88% check-in projection"
            icon={Users}
            color="purple"
            trend="+24% MoM"
          />
          <StatsCard
            title="Qualified Leads Captured"
            value={totalLeads.toLocaleString()}
            subtitle="Avg AI Score: 84/100"
            icon={Target}
            color="amber"
            trend="+38% MoM"
          />
          <StatsCard
            title="Monetization & Ticket Volume"
            value={formatCurrency(estimatedRevenue)}
            subtitle="Direct + Sponsorship ROI"
            icon={DollarSign}
            color="green"
            trend="+45% MoM"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue & Growth Trend */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900" style={{fontFamily:'Poppins,sans-serif'}}>
                  Event Growth & Lead Funnel Pipeline
                </h3>
                <p className="text-xs text-slate-500">Monthly ticket revenue (₹) vs Qualified B2B Leads</p>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">2026 YTD</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1B4FD8" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#1B4FD8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLead" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#1B4FD8" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" name="Revenue (₹)" />
                  <Area type="monotone" dataKey="leads" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorLead)" name="Leads Captured" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900" style={{fontFamily:'Poppins,sans-serif'}}>
                End-to-End Growth Funnel
              </h3>
              <p className="text-xs text-slate-500 mb-4">Discovery → Ticket → Check-in → Deal</p>
              <div className="space-y-3">
                {leadFunnelData.map((f) => (
                  <div key={f.name}>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{f.name}</span>
                      <span>{f.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${(f.value / 4200) * 100}%`, backgroundColor: f.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-800 font-bold">Overall Conversion</p>
                <p className="text-xl font-black text-emerald-700">8.1%</p>
              </div>
              <span className="text-xs bg-emerald-600 text-white font-bold px-2 py-1 rounded-lg">Top 5% in Sector</span>
            </div>
          </div>
        </div>

        {/* Event Management Table & Live Booth Actions */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900" style={{fontFamily:'Poppins,sans-serif'}}>Active Events & On-Ground Toolkit</h3>
              <p className="text-xs text-slate-500">Live QR Check-in scanners, Lead Booth capture, and CRM sync</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Event Name</th>
                  <th className="py-3 px-4">City / Date</th>
                  <th className="py-3 px-4">Registrations</th>
                  <th className="py-3 px-4">Checked-In</th>
                  <th className="py-3 px-4">Hot Leads</th>
                  <th className="py-3 px-4 text-right">Quick Toolkit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-4 font-semibold text-slate-900 flex items-center gap-3">
                      <img src={ev.image} alt={ev.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <span>{ev.title}</span>
                        <span className="block text-xs font-normal text-slate-500">{ev.category}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-xs">
                      <div>{ev.city}</div>
                      <div className="text-slate-400">{formatDate(ev.date)}</div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">{ev.registrations.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        <UserCheck className="w-3 h-3" /> {ev.attendees.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-amber-600">{ev.leads.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <Link
                        to={`/checkin/${ev.id}`}
                        className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        <QrCode className="w-3.5 h-3.5" /> Check-in
                      </Link>
                      <Link
                        to={`/lead-capture/${ev.id}`}
                        className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        <Target className="w-3.5 h-3.5" /> Capture Leads
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}