import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, Clock, MapPin, Download, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useStore } from '../store/useStore';
import { formatDate, getDaysLeft } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function MyTickets() {
  const { myTickets } = useStore();

  const handleDownloadTicket = (ticketId) => {
    toast.success(`🎟️ Downloading Ticket #${ticketId} PDF with pass badge...`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                <Ticket className="w-5 h-5 text-blue-700" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Poppins,sans-serif'}}>
                My Registered Event Passes
              </h1>
            </div>
            <p className="text-slate-500 text-sm mt-1">
              Present these digital QR tickets at the venue check-in desk for direct badge printing.
            </p>
          </div>
          <Link
            to="/events"
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition shadow-sm w-fit"
          >
            Explore More Events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tickets Grid or Empty State */}
        {myTickets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>
              No tickets registered yet!
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              Browse our live roster of business summits, startup conclaves, and masterclasses across India to secure your passes.
            </p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-blue-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-800 transition"
            >
              Discover & Register Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myTickets.map((ticket) => {
              const daysLeft = getDaysLeft(ticket.eventDate);
              return (
                <div
                  key={ticket.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="p-6">
                    {/* Status badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {ticket.ticketType}
                      </span>
                      {ticket.checkedIn ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Checked-In
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                          <AlertCircle className="w-3.5 h-3.5" /> {daysLeft > 0 ? `In ${daysLeft} days` : 'Happening Today'}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3" style={{fontFamily:'Poppins,sans-serif'}}>
                      {ticket.eventTitle}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{formatDate(ticket.eventDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{ticket.eventTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="truncate">{ticket.eventVenue}</span>
                      </div>
                    </div>

                    {/* QR Code Container */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center gap-6">
                      <div className="bg-white p-2.5 rounded-lg shadow-xs border border-slate-200">
                        <QRCodeSVG value={ticket.qrCode} size={90} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Pass Code</p>
                        <p className="font-mono text-xs font-bold text-blue-700 mt-0.5">{ticket.qrCode}</p>
                        <p className="text-[11px] text-slate-400 mt-1">Attendee: {ticket.attendeeInfo?.name || 'Delegate'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Valid for 1 Entry</span>
                    <button
                      onClick={() => handleDownloadTicket(ticket.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" /> Save / Download Pass
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}