import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';
import MyTickets from './pages/MyTickets';
import CheckIn from './pages/CheckIn';
import LeadCapture from './pages/LeadCapture';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/checkin/:eventId" element={<CheckIn />} />
            <Route path="/lead-capture/:eventId" element={<LeadCapture />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}