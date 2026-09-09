import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState('organizer@rsrevents.in');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('organizer');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: email.split('@')[0], email, role });
    toast.success(`Welcome back (${role.toUpperCase()})!`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-700/30">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Poppins,sans-serif'}}>Welcome Back to RSR</h2>
          <p className="text-xs text-slate-500 mt-1">India's Leading Event-Led Growth Platform</p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {['organizer', 'attendee', 'sponsor'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize transition ${
                role === r ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-700/20 text-sm"
          >
            Sign In to Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-700 font-bold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}