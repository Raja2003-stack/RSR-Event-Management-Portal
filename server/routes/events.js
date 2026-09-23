import express from 'express';
import { query, getOne, execute } from '../db.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Helper to parse stored JSON strings
const formatEvent = (e) => {
  if (!e) return null;
  return {
    ...e,
    isFeatured: Boolean(e.isFeatured),
    isFree: Boolean(e.isFree),
    tags: typeof e.tags === 'string' ? (e.tags.startsWith('[') ? JSON.parse(e.tags) : e.tags.split(',').map(s => s.trim())) : (e.tags || []),
    tickets: typeof e.tickets === 'string' ? JSON.parse(e.tickets) : (e.tickets || []),
    speakers: typeof e.speakers === 'string' ? JSON.parse(e.speakers) : (e.speakers || []),
    agenda: typeof e.agenda === 'string' ? JSON.parse(e.agenda) : (e.agenda || []),
    sponsors: typeof e.sponsors === 'string' ? (e.sponsors.startsWith('[') ? JSON.parse(e.sponsors) : e.sponsors.split(',').map(s => s.trim())) : (e.sponsors || [])
  };
};

// GET /api/events - list all events
router.get('/', async (req, res) => {
  try {
    const { search, category, city } = req.query;
    let sql = `SELECT * FROM events WHERE 1=1`;
    const params = [];

    if (category && category !== 'All') {
      sql += ` AND category = ?`;
      params.push(category);
    }
    if (city && city !== 'All') {
      sql += ` AND city = ?`;
      params.push(city);
    }
    if (search) {
      sql += ` AND (title LIKE ? OR description LIKE ? OR venue LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    sql += ` ORDER BY date ASC, created_at DESC`;

    const rawEvents = await query(sql, params);
    const events = rawEvents.map(formatEvent);

    res.json({ events });
  } catch (err) {
    console.error('Fetch events error:', err);
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

// GET /api/events/:id - get event by ID
router.get('/:id', async (req, res) => {
  try {
    const raw = await getOne(`SELECT * FROM events WHERE id = ?`, [req.params.id]);
    if (!raw) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.json({ event: formatEvent(raw) });
  } catch (err) {
    console.error('Fetch event detail error:', err);
    res.status(500).json({ error: 'Failed to fetch event.' });
  }
});

// POST /api/events - create new event
router.post('/', optionalAuth, async (req, res) => {
  try {
    const {
      title, category, date, time, endTime, city, venue, image,
      organizer, organizerLogo, description, tags, isFree,
      tickets, speakers, agenda, sponsors
    } = req.body;

    if (!title || !date || !city || !venue) {
      return res.status(400).json({ error: 'Title, date, city, and venue are required.' });
    }

    const id = String(Date.now());
    const tagsString = Array.isArray(tags) ? JSON.stringify(tags) : (tags || '');
    const ticketsString = JSON.stringify(tickets || []);
    const speakersString = JSON.stringify(speakers || []);
    const agendaString = JSON.stringify(agenda || []);
    const sponsorsString = Array.isArray(sponsors) ? sponsors.join(', ') : (sponsors || '');

    await execute(
      `INSERT INTO events (
        id, title, category, date, time, endTime, city, venue, image,
        organizer, organizerLogo, description, tags, isFeatured, isFree,
        registrations, attendees, leads, tickets, speakers, agenda, sponsors
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, ?, ?, ?)`,
      [
        id,
        title,
        category || 'Technology',
        date,
        time || '09:00',
        endTime || '17:00',
        city,
        venue,
        image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
        organizer || (req.user?.name || 'RSR Organizer'),
        organizerLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(organizer || 'RSR')}&background=1B4FD8&color=fff`,
        description || '',
        tagsString,
        0,
        isFree ? 1 : 0,
        ticketsString,
        speakersString,
        agendaString,
        sponsorsString
      ]
    );

    const created = await getOne(`SELECT * FROM events WHERE id = ?`, [id]);
    res.status(201).json({
      message: 'Event created successfully',
      event: formatEvent(created)
    });
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ error: 'Failed to create event.' });
  }
});

export default router;
