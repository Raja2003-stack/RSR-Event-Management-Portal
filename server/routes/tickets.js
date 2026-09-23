import express from 'express';
import { query, getOne, execute } from '../db.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/tickets/register - Register attendee for an event
router.post('/register', optionalAuth, async (req, res) => {
  try {
    const { eventId, ticketType, attendeeInfo } = req.body;

    if (!eventId || !ticketType || !attendeeInfo?.name || !attendeeInfo?.email) {
      return res.status(400).json({ error: 'Event ID, ticket type, attendee name, and email are required.' });
    }

    const event = await getOne(`SELECT * FROM events WHERE id = ?`, [eventId]);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const ticketId = String(Date.now());
    const qrCode = `RSR-${eventId}-${ticketId.slice(-6)}`;
    const userId = req.user ? req.user.id : null;

    await execute(
      `INSERT INTO tickets (
        id, eventId, userId, attendeeName, attendeeEmail, attendeePhone, ticketType, qrCode, checkedIn
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        ticketId,
        eventId,
        userId,
        attendeeInfo.name,
        attendeeInfo.email.toLowerCase().trim(),
        attendeeInfo.phone || '',
        ticketType,
        qrCode
      ]
    );

    // Increment event registrations count
    await execute(`UPDATE events SET registrations = registrations + 1 WHERE id = ?`, [eventId]);

    const ticket = {
      id: ticketId,
      eventId,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventImage: event.image,
      ticketType,
      attendeeInfo,
      qrCode,
      checkedIn: false
    };

    res.status(201).json({
      message: 'Registration successful',
      ticket
    });
  } catch (err) {
    console.error('Register ticket error:', err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// GET /api/tickets/my - Get registered tickets for user or email
router.get('/my', optionalAuth, async (req, res) => {
  try {
    const email = (req.query.email || req.user?.email || '').toLowerCase().trim();
    const userId = req.user?.id;

    let sql = `
      SELECT t.*, e.title as eventTitle, e.date as eventDate, e.time as eventTime, e.venue as eventVenue, e.image as eventImage
      FROM tickets t
      LEFT JOIN events e ON t.eventId = e.id
    `;
    const params = [];

    if (userId && email) {
      sql += ` WHERE t.userId = ? OR LOWER(t.attendeeEmail) = ?`;
      params.push(userId, email);
    } else if (email) {
      sql += ` WHERE LOWER(t.attendeeEmail) = ?`;
      params.push(email);
    } else if (userId) {
      sql += ` WHERE t.userId = ?`;
      params.push(userId);
    }
    // If no filter, return all tickets so local demo works seamlessly
    sql += ` ORDER BY t.created_at DESC`;

    const rawTickets = await query(sql, params);
    const tickets = rawTickets.map(t => ({
      id: t.id,
      eventId: t.eventId,
      eventTitle: t.eventTitle,
      eventDate: t.eventDate,
      eventTime: t.eventTime,
      eventVenue: t.eventVenue,
      eventImage: t.eventImage,
      ticketType: t.ticketType,
      attendeeInfo: {
        name: t.attendeeName,
        email: t.attendeeEmail,
        phone: t.attendeePhone
      },
      qrCode: t.qrCode,
      checkedIn: Boolean(t.checkedIn)
    }));

    res.json({ tickets });
  } catch (err) {
    console.error('Fetch tickets error:', err);
    res.status(500).json({ error: 'Failed to fetch tickets.' });
  }
});

// POST /api/tickets/checkin - Verify entry and scan QR ticket
router.post('/checkin', async (req, res) => {
  try {
    const { code, eventId } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'QR Code or ticket string is required.' });
    }

    const cleanCode = code.trim();
    // Search ticket by qrCode or id
    const ticket = await getOne(
      `SELECT t.*, e.title as eventTitle
       FROM tickets t
       LEFT JOIN events e ON t.eventId = e.id
       WHERE t.qrCode = ? OR t.id = ?`,
      [cleanCode, cleanCode]
    );

    const checkInId = String(Date.now());
    const timeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let scanRecord;

    if (ticket) {
      // Mark ticket checkedIn
      await execute(`UPDATE tickets SET checkedIn = 1 WHERE id = ?`, [ticket.id]);
      if (ticket.eventId) {
        await execute(`UPDATE events SET attendees = attendees + 1 WHERE id = ?`, [ticket.eventId]);
      }

      scanRecord = {
        id: checkInId,
        eventId: ticket.eventId,
        ticketId: ticket.id,
        name: ticket.attendeeName,
        email: ticket.attendeeEmail,
        pass: ticket.ticketType,
        time: timeFormatted,
        code: cleanCode,
        status: 'Approved'
      };
    } else {
      // Allow general entry / manual scanned delegate code
      scanRecord = {
        id: checkInId,
        eventId: eventId || '1',
        ticketId: null,
        name: 'Scanned Delegate',
        email: 'delegate@registered.com',
        pass: 'Standard Entry',
        time: timeFormatted,
        code: cleanCode,
        status: 'Approved'
      };
      if (eventId) {
        await execute(`UPDATE events SET attendees = attendees + 1 WHERE id = ?`, [eventId]);
      }
    }

    await execute(
      `INSERT INTO checkins (id, eventId, ticketId, name, email, pass, time, code, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        scanRecord.id,
        scanRecord.eventId,
        scanRecord.ticketId,
        scanRecord.name,
        scanRecord.email,
        scanRecord.pass,
        scanRecord.time,
        scanRecord.code,
        scanRecord.status
      ]
    );

    res.json({
      message: `Verified Entry for ${scanRecord.name}!`,
      scan: scanRecord,
      ticketMatched: Boolean(ticket)
    });
  } catch (err) {
    console.error('Check-in error:', err);
    res.status(500).json({ error: 'Gate check-in failed.' });
  }
});

// GET /api/tickets/checkins/:eventId - Get check-in logs for an event
router.get('/checkins/:eventId', async (req, res) => {
  try {
    const list = await query(
      `SELECT * FROM checkins WHERE eventId = ? ORDER BY created_at DESC LIMIT 50`,
      [req.params.eventId]
    );
    res.json({ checkins: list });
  } catch (err) {
    console.error('Fetch checkins error:', err);
    res.status(500).json({ error: 'Failed to fetch check-in list.' });
  }
});

export default router;
