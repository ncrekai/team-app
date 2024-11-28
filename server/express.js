// require modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const authMiddleware = require('./middlewares/authMiddleware')

// Import routes
const assetsRouter = require('./assets-router');
const userRoutes = require('./routes/User');
const tripRoutes = require('./routes/Trip');
const profileRoutes = require('./routes/Profile');
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/Wishlist');

// Initialize the app
const app = express();

// Enable CORS to allow requests from the frontend
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('*', cors());

// Use middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Additional middlewares
app.use(cookieParser());
app.use(compress());
app.use(helmet());

// Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/src', assetsRouter);

// Use route handlers
app.use('/users', userRoutes);
app.use('/trips', tripRoutes);
app.use('/profiles', profileRoutes);
app.use('/wishlists', wishlistRoutes);
app.use('/api/auth', authRoutes);

// Example API endpoint
app.get('/api/v1', (req, res) => {
  res.json({
    project: 'React Project',
    from: 'COMP229',
  });
});

// API for contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find(); // Ensure `Contact` is imported
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// React fallback route for single-page applications
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;


