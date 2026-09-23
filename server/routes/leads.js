import express from 'express';
import { query, getOne, execute } from '../db.js';

const router = express.Router();

const calculateAILeadScore = (data) => {
  let score = 50;
  const des = (data.designation || '').toLowerCase();
  if (des.includes('cxo') || des.includes('founder') || des.includes('vp') || des.includes('director')) score += 20;
  const budget = data.budget || '';
  if (budget.includes('5,00,000') || budget.includes('10,00,000')) score += 15;
  const timeline = data.timeline || '';
  if (timeline.includes('Immediate')) score += 12;
  if (data.company && data.company.length > 2) score += 5;
  return Math.min(score, 98);
};

// POST /api/leads - Capture a new B2B lead
router.post('/', async (req, res) => {
  try {
    const {
      eventId, eventTitle, name, email, phone, company,
      designation, interest, budget, timeline, notes
    } = req.body;

    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Name, email, and company are required.' });
    }

    const calculatedScore = req.body.score || calculateAILeadScore(req.body);
    const leadStatus = req.body.status || (calculatedScore >= 80 ? 'HOT LEAD' : calculatedScore >= 65 ? 'WARM LEAD' : 'COLD LEAD');
    const id = String(Date.now());

    await execute(
      `INSERT INTO leads (
        id, eventId, eventTitle, name, email, phone, company, designation,
        interest, budget, timeline, notes, score, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        eventId || null,
        eventTitle || '',
        name,
        email.toLowerCase().trim(),
        phone || '',
        company,
        designation || '',
        interest || '',
        budget || '',
        timeline || '',
        notes || '',
        calculatedScore,
        leadStatus
      ]
    );

    if (eventId) {
      await execute(`UPDATE events SET leads = leads + 1 WHERE id = ?`, [eventId]);
    }

    const createdLead = await getOne(`SELECT * FROM leads WHERE id = ?`, [id]);

    res.status(201).json({
      message: 'Lead captured successfully',
      lead: createdLead
    });
  } catch (err) {
    console.error('Capture lead error:', err);
    res.status(500).json({ error: 'Failed to capture lead.' });
  }
});

// GET /api/leads - Retrieve leads list
router.get('/', async (req, res) => {
  try {
    const { eventId } = req.query;
    let sql = `SELECT * FROM leads`;
    const params = [];

    if (eventId) {
      sql += ` WHERE eventId = ?`;
      params.push(eventId);
    }
    sql += ` ORDER BY created_at DESC`;

    const leads = await query(sql, params);
    res.json({ leads });
  } catch (err) {
    console.error('Fetch leads error:', err);
    res.status(500).json({ error: 'Failed to fetch leads.' });
  }
});

export default router;
