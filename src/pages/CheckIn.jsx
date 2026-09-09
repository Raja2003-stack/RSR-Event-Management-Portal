import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QrCode, CheckCircle2, XCircle, Search, UserCheck, ArrowLeft, Camera, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function CheckIn() {
  const { eventId } = useParams();
  const { events, myTickets, checkIn } = useStore();
  const event = events.find(e => e.id === eventId) || events[0];

  const [scanInput, setScanInput] = useState('');
  const [lastScanned, setLastScanned] = useState(null);
  const [checkedList, setCheckedList] = useState([
    { id: '101', name: 'Rahul Sharma', email: 'rahul@xyzpvt.com', pass: 'VIP Pass', time: '09:15 AM', status: 'Approved' },
    { id: '102', name: 'Dr. Priya Desai', email: 'priya@techcorp.in', pass: 'Free Pass', time: '09:22 AM', status: 'Approved' }
  ]);

  const handleManualScan = (codeToProcess) => {
    const code = codeToProcess || scanInput;
    if (!code.trim()) {
      toast.error('Enter a ticket QR string or attendee code');
      return;
    }

    const matchedTicket = myTickets.find(t => t.qrCode === code);

    const newScan = {
      id: String(Date.now()),
      name: matchedTicket?.attendeeInfo?.name || 'Scanned Delegate',
      email: matchedTicket?.attendeeInfo?.email || 'delegate@registered.com',
      pass: matchedTicket?.ticketType || 'Standard Entry',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      code: code,
      status: 'Approved'
    };

    if (matchedTicket) {
      checkIn(matchedTicket.id);
    }

    setCheckedList([newScan, ...checkedList]);
    setLastScanned(newScan);
    setScanInput('');
    toast.success(`✅ Verified Entry for ${newScan.name}!`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" /> Gate Scanner Active
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-black tracking-tight" style={{fontFamily:'Poppins,sans-serif'}}>
            Live Gate Check-In & Badging
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Scanning for: <span className="text-blue-400 font-semibold">{event?.title}</span>
          </p>
        </div>

        {/* Scanner Box Simulator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl flex flex-col justify-between items-center text-center relative overflow-hidden">
            <div className="w-full">
              <div className="w-48 h-48 mx-auto border-2 border-dashed border-blue-500 rounded-2xl flex flex-col items-center justify-center relative bg-slate-900/60 p-4">
                <div className="absolute inset-x-2 top-0 h-0.5 bg-blue-400 animate-pulse" />
                <Camera className="w-12 h-12 text-blue-400 mb-2 opacity-80" />
                <span className="text-xs text-slate-400 font-medium">Position QR Code in View</span>
              </div>
            </div>

            <div className="w-full mt-6 space-y-3">
              <p className="text-xs text-slate-400">Or simulate scan by code / quick test buttons:</p>
              <div className="flex gap-2">
                <input
                  value={scanInput}
                  onChange={e => setScanInput(e.target.value)}
                  placeholder="Enter QR e.g. RSR-1-17882..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleManualScan()}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-sm transition"
                >
                  Verify
                </button>
              </div>

              {myTickets.length > 0 && (
                <div className="pt-2 text-left">
                  <p className="text-[11px] text-slate-400 mb-1">Quick click registered test tickets:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {myTickets.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleManualScan(t.qrCode)}
                        className="text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-200"
                      >
                        {t.attendeeInfo?.name || 'Ticket'} ({t.ticketType})
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Last Scanned Attendee Card */}
          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl flex flex-col justify-between">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Latest Scan Result</h3>

            {lastScanned ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-5 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <div>
                  <span className="text-xs font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">
                    {lastScanned.pass}
                  </span>
                  <h4 className="text-xl font-bold text-white mt-2">{lastScanned.name}</h4>
                  <p className="text-xs text-slate-400">{lastScanned.email}</p>
                </div>
                <div className="pt-2 border-t border-emerald-500/20 flex justify-between text-xs text-slate-300 font-mono">
                  <span>Badge Printed</span>
                  <span>{lastScanned.time}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <QrCode className="w-12 h-12 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No attendee scanned yet in this session.</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mt-4 text-center">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400">Total Checked-In</p>
                <p className="text-xl font-black text-white">{checkedList.length + 1047}</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400">Scan Speed</p>
                <p className="text-xl font-black text-emerald-400">&lt; 1.2s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Attendance Stream Table */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6">
          <h3 className="text-base font-bold text-white mb-4" style={{fontFamily:'Poppins,sans-serif'}}>
            Live Gate Attendance Stream
          </h3>
          <div className="space-y-3">
            {checkedList.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.email} • <span className="text-blue-400">{item.pass}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400">{item.time}</span>
                  <span className="block text-[11px] text-emerald-400 font-semibold">Entry Granted</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}