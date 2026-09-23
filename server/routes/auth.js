import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query, getOne, execute } from '../db.js';
import { JWT_SECRET, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await getOne(`SELECT id FROM users WHERE email = ?`, [cleanEmail]);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const plainPassword = password || 'password123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const userRole = role || 'organizer';

    const result = await execute(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      [name, cleanEmail, hashedPassword, userRole]
    );

    const user = { id: result.id, name, email: cleanEmail, role: userRole };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const userRecord = await getOne(`SELECT * FROM users WHERE email = ?`, [cleanEmail]);

    if (!userRecord) {
      // If user doesn't exist yet, we can either reject or auto-create demo user
      // But standard is 401
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (password) {
      const match = await bcrypt.compare(password, userRecord.password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
    }

    const user = {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      role: role || userRecord.role
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Logged in successfully',
      token,
      user
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await getOne(`SELECT id, name, email, role, created_at FROM users WHERE id = ?`, [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Server error fetching user.' });
  }
});

export default router;
