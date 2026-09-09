import { create } from 'zustand';
import { events as initialEvents } from '../data/events';

export const useStore = create((set, get) => ({
  events: initialEvents,
  myTickets: [],
  leads: [],
  user: null,
  isLoggedIn: false,

  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),

  addEvent: (event) => set((state) => ({
    events: [{ ...event, id: String(Date.now()), registrations: 0, attendees: 0, leads: 0, isFeatured: false }, ...state.events]
  })),

  registerForEvent: (eventId, ticketType, attendeeInfo) => {
    const event = get().events.find(e => e.id === eventId);
    if (!event) return;
    const ticket = {
      id: String(Date.now()),
      eventId,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventImage: event.image,
      ticketType,
      attendeeInfo,
      qrCode: `RSR-${eventId}-${Date.now()}`,
      checkedIn: false
    };
    set((state) => ({ myTickets: [...state.myTickets, ticket] }));
    return ticket;
  },

  checkIn: (ticketId) => set((state) => ({
    myTickets: state.myTickets.map(t => t.id === ticketId ? { ...t, checkedIn: true } : t)
  })),

  addLead: (lead) => set((state) => ({
    leads: [{ ...lead, id: String(Date.now()), score: Math.floor(Math.random() * 40) + 60, createdAt: new Date().toISOString() }, ...state.leads]
  })),
}));
