import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Share2, Heart, ArrowLeft, User, CheckCircle, Star, Tag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatDate, formatCurrency, getDaysLeft } from '../utils/helpers';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

export default function EventDetail() {
  const { id } = useParams();
  const { events, registerForEvent, isLoggedIn } = useStore();
  const event = events.find(e => e.id === id);
  const [tab, setTab] = useState('about');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showRegModal, setShowRegModal] = useState(false);
  const [regDone, setRegDone] = useState(null);
  const [formData, setFormData] = useState({ name:'', email:'', phone:'' });

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Event Not Found</h2>
        <Link to="/events" className="text-blue-700 font-medium hover:underline">Browse events</Link>
      </div>
    </div>
  );

  const daysLeft = getDaysLeft(event.date);

  const handleRegister = () => {
    if (!formData.name || !formData.email) { toast.error('Please fill in name and email'); return; }
    const ticket = registerForEvent(event.id, selectedTicket.type, formData);
    setRegDone(ticket);
    toast.success('Registration successful!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link to="/events" className="flex items-center gap-2 bg-white/20 backdrop-blur text-white px-3 py-1.5 rounded-lg text-sm hover:bg-white/30 transition">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
        <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs font-semibold bg-blue-600 text-white px-2.5 py-1 rounded-full">{event.category}</span>
            {event.isFree && <span className="text-xs font-semibold bg-green-500 text-white px-2.5 py-1 rounded-full">FREE</span>}
            {daysLeft <= 7 && daysLeft > 0 && <span className="text-xs font-semibold bg-red-500 text-white px-2.5 py-1 rounded-full">{daysLeft} days left</span>}
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight" style={{fontFamily:'Poppins,sans-serif'}}>{event.title}</h1>
          <p className="text-blue-200 mt-2 text-sm">by {event.organizer}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Calendar, label: formatDate(event.date), sub: 'Date' },
                { icon: Clock, label: event.time+' - '+event.endTime, sub: 'Time' },
                { icon: MapPin, label: event.city, sub: 'City' },
                { icon: Users, label: event.registrations.toLocaleString(), sub: 'Registered' },
              ].map(item => (
                <div key={item.sub} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                {['about','agenda','speakers','sponsors'].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${tab===t ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {tab === 'about' && (
                  <div>
                    <p className="text-gray-600 leading-relaxed mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 text-blue-500" /> <span className="font-medium">{event.venue}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {event.tags.map(tag => (
                        <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">#{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
                {tab === 'agenda' && (
                  <div className="space-y-4">
                    {event.agenda.map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">{item.time}</div>
                          {i < event.agenda.length - 1 && <div className="w-0.5 h-8 bg-blue-100 mt-1" />}
                        </div>
                        <div className="pt-2">
                          <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {tab === 'speakers' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.speakers.map(speaker => (
                      <div key={speaker.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <img src={speaker.avatar} alt={speaker.name} className="w-14 h-14 rounded-full" />
                        <div>
                          <p className="font-semibold text-gray-800" style={{fontFamily:'Poppins,sans-serif'}}>{speaker.name}</p>
                          <p className="text-sm text-gray-500">{speaker.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {tab === 'sponsors' && (
                  <div className="flex flex-wrap gap-4">
                    {event.sponsors.map(sponsor => (
                      <div key={sponsor} className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3">
                        <img src={`https://ui-avatars.com/api/?name=${sponsor}&background=random&color=fff&size=40`} alt={sponsor} className="w-10 h-10 rounded-lg" />
                        <span className="font-medium text-gray-700 text-sm">{sponsor}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Tickets */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-20">
              <h3 className="font-bold text-lg text-gray-800 mb-4" style={{fontFamily:'Poppins,sans-serif'}}>Get Tickets</h3>
              <div className="space-y-3 mb-6">
                {event.tickets.map(ticket => (
                  <button key={ticket.type} onClick={() => { setSelectedTicket(ticket); setShowRegModal(true); setRegDone(null); }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedTicket?.type === ticket.type ? 'border-blue-700 bg-blue-50' : 'border-gray-100 hover:border-blue-300'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-800" style={{fontFamily:'Poppins,sans-serif'}}>{ticket.type}</span>
                      <span className="font-bold text-blue-700" style={{fontFamily:'Poppins,sans-serif'}}>{formatCurrency(ticket.price)}</span>
                    </div>
                    <p className="text-xs text-gray-500">{ticket.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{ticket.available} seats available</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                  <Heart className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl p-6 text-white">
              <h4 className="font-bold mb-4" style={{fontFamily:'Poppins,sans-serif'}}>Event Stats</h4>
              <div className="space-y-3">
                {[
                  { label: 'Registrations', value: event.registrations.toLocaleString() },
                  { label: 'Attendees', value: event.attendees.toLocaleString() },
                  { label: 'Leads Generated', value: event.leads.toLocaleString() },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm">{s.label}</span>
                    <span className="font-bold" style={{fontFamily:'Poppins,sans-serif'}}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegModal && selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowRegModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            {regDone ? (
              <div className="text-center py-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Registration Successful!</h3>
                <p className="text-gray-500 text-sm mb-6">Your QR ticket is ready</p>
                <div className="bg-gray-50 p-6 rounded-xl inline-block mb-4">
                  <QRCodeSVG value={regDone.qrCode} size={160} />
                </div>
                <p className="text-xs text-gray-400 mb-4">Ticket ID: {regDone.qrCode}</p>
                <Link to="/my-tickets" className="block w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition" onClick={() => setShowRegModal(false)}>
                  View My Tickets
                </Link>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-800 mb-1" style={{fontFamily:'Poppins,sans-serif'}}>Register for Event</h3>
                <p className="text-sm text-gray-500 mb-6">{selectedTicket.type} Ticket — {formatCurrency(selectedTicket.price)}</p>
                <div className="space-y-4 mb-6">
                  <input placeholder="Full Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Email *" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button onClick={handleRegister}
                  className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition text-sm">
                  {selectedTicket.price > 0 ? `Pay ${formatCurrency(selectedTicket.price)} & Register` : 'Register Now — Free'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}