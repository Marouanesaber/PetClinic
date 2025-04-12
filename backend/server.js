import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import petRoutes from './routes/pets.js';
import ownerRoutes from './routes/owners.js';
import appointmentRoutes from './routes/appointments.js';
import consultationRoutes from './routes/consultations.js';
import laboratoryRoutes from './routes/laboratory.js';
import vaccinationRoutes from './routes/vaccinations.js';
import surgeryRoutes from './routes/surgery.js';
import authRoutes from './routes/auth.js';
import shopRoutes from './routes/shop.js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware
app.use(cors({
  origin: 'http://localhost:8080', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow credentials
}));
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'pet_clinic'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Authentication middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    // Allow request to proceed without user info if no token
    req.user = null;
    return next();
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    // If token is invalid, proceed without user info
    req.user = null;
    next();
  }
};

// Make db connection available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Apply the auth middleware to all routes
app.use(verifyToken);

// Routes
app.use('/api/pets', petRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/laboratory', laboratoryRoutes);
app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/surgery', surgeryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/shop', shopRoutes);

// Add stats endpoint for appointments
app.get('/api/appointments/stats', verifyToken, (req, res) => {
  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  db.query(
    'SELECT COUNT(*) as count FROM appointments WHERE DATE(appointment_date) = ?',
    [today],
    (err, results) => {
      if (err) {
        console.error('Error fetching appointment stats:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({ 
        todayCount: results[0].count,
        date: today
      });
    }
  );
});

// Token verification endpoint
app.get('/api/auth/verify', verifyToken, (req, res) => {
  if (req.user) {
    return res.status(200).json({ valid: true, user: req.user });
  }
  return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
});

// Test route - improved to provide more details
app.get('/api/test', (req, res) => {
  // Check database connection
  db.query('SELECT 1', (err, result) => {
    if (err) {
      return res.status(500).json({ 
        message: 'Backend API is working but database connection failed!',
        error: err.message,
        user: req.user || 'Not authenticated',
        dbStatus: 'Error'
      });
    }
    
    res.json({ 
      message: 'Backend API is working!', 
      user: req.user || 'Not authenticated',
      dbStatus: 'Connected',
      serverTime: new Date().toISOString()
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
