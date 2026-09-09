import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Lock, Mail, User, Building } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('organizer');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: name || 'New User', email, role });
    toast.success('🎉 Account successfully created!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-700/30">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Poppins,sans-serif'}}>Get Started with RSR</h2>
          <p className="text-xs text-slate-500 mt-1">Join 2,400+ organizers scaling events today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Vikram Sharma"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="vikram@company.com"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="organizer">Event Organizer / Host</option>
              <option value="attendee">Attendee / Delegate</option>
              <option value="sponsor">Sponsor / Brand</option>
              <option value="vendor">Venue / Service Vendor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-700/20 text-sm"
          >
            Create Free Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-700 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}