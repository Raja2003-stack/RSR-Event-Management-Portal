import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Target, TrendingUp, MapPin, Star, CheckCircle, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';
import EventCard from '../components/events/EventCard';
import { stats, categories } from '../data/events';
import { formatDate } from '../utils/helpers';

const categoryIcons = ['💻','💼','📣','💰','🏥','🎓','🎵','⚽','🍕','🎨','🤖','🌱'];
const steps = [
  { icon: '🔍', title: 'Discover', desc: 'Browse thousands of events by category, city, or date' },
  { icon: '📝', title: 'Register', desc: 'Sign up in seconds — free or paid, your choice' },
  { icon: '📅', title: 'Attend', desc: 'Get your QR ticket and attend the event effortlessly' },
  { icon: '🤝', title: 'Engage', desc: 'Network, learn, and connect with like-minded people' },
  { icon: '📊', title: 'Leads & ROI', desc: 'Track leads, analytics, and event ROI in real time' },
  { icon: '🔄', title: 'Repeat', desc: 'Build your event presence and grow every time' },
];

export default function Home() {
  const { events } = useStore();
  const featured = events.filter(e => e.isFeatured);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>India's #1 Event Growth Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6" style={{fontFamily:'Poppins,sans-serif'}}>
              Turn Every Event Into A <span className="text-amber-400">Growth Engine</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
              Events are not just experiences. They are measurable growth opportunities. Discover, register, attend, engage, lead, convert, retain & repeat.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/events" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-amber-500/30">
                Discover Events <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/create-event" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-all">
                List Your Event <Zap className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-black/20 backdrop-blur border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Events Listed', value: stats.totalEvents.toLocaleString()+'+' },
                { label: 'Total Attendees', value: (stats.totalAttendees/1000).toFixed(0)+'K+' },
                { label: 'Leads Generated', value: (stats.totalLeads/1000).toFixed(0)+'K+' },
                { label: 'Cities Covered', value: stats.citiesCovered+'+' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-extrabold text-white" style={{fontFamily:'Poppins,sans-serif'}}>{s.value}</p>
                  <p className="text-sm text-blue-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{fontFamily:'Poppins,sans-serif'}}>Browse by Category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link key={cat} to={`/events?category=${cat}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all group cursor-pointer">
                <span className="text-2xl">{categoryIcons[i] || '🎪'}</span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 text-center leading-tight">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily:'Poppins,sans-serif'}}>Featured Events</h2>
              <p className="text-gray-500 text-sm mt-1">Handpicked events with the most impact</p>
            </div>
            <Link to="/events" className="flex items-center gap-1 text-blue-700 font-semibold text-sm hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily:'Poppins,sans-serif'}}>How It Works</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">One platform, endless possibilities — for organizers, attendees, sponsors & businesses</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mx-auto mb-3 relative">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-700 text-white text-xs font-bold rounded-full flex items-center justify-center">{i+1}</span>
                </div>
                <p className="font-semibold text-gray-800 text-sm" style={{fontFamily:'Poppins,sans-serif'}}>{step.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why RSR */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{fontFamily:'Poppins,sans-serif'}}>Why RSR Event Growth Platform?</h2>
            <p className="text-blue-200 mt-3">Not just visibility — measurable business results</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: 'Events Drive Real Business', desc: 'Not just footfall — track leads, revenue and ROI from every event' },
              { icon: Target, title: 'Bridge Marketing & Sales', desc: 'AI helps qualify and convert attendees into actual customers' },
              { icon: Zap, title: 'Centralized Platform', desc: 'Events, Leads, CRM, Analytics — all in one place, zero tools-switching' },
              { icon: Users, title: 'Multiple Revenue Streams', desc: 'Tickets, sponsorships, ads, vendor marketplace and more' },
            ].map(item => (
              <div key={item.title} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{fontFamily:'Poppins,sans-serif'}}>{item.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{fontFamily:'Poppins,sans-serif'}}>Ready to Grow with Events?</h2>
          <p className="text-gray-600 mb-8 text-lg">Join 2,400+ event organizers and 180,000+ attendees already using RSR Event Growth Platform.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg">
              Get Started Free
            </Link>
            <Link to="/create-event" className="border-2 border-blue-700 text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all">
              List Your Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}