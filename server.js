const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:9000',
      'https://yohanpermana.netlify.app',
    ];

    // Allow requests with no origin (like mobile apps or Vercel functions)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // For production, also allow the deployed frontend URL
      if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all for now, restrict later with FRONTEND_URL env
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Import Routes
const profileRoutes = require('./routes/profile');
const experienceRoutes = require('./routes/experience');
const projectRoutes = require('./routes/projects');
const technologyRoutes = require('./routes/technologies');
const certificationRoutes = require('./routes/certifications');
const educationRoutes = require('./routes/education');
const contactRoutes = require('./routes/contact');
const aboutRoutes = require('./routes/about');
const portfolioContextRoutes = require('./routes/portfolioContext');
const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/portfolio-context', portfolioContextRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/upload', uploadRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// ###################################################################################################
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Import Routes
// const profileRoutes = require('./routes/profile');
// const experienceRoutes = require('./routes/experience');
// const projectRoutes = require('./routes/projects');
// const certificationRoutes = require('./routes/certifications');
// const educationRoutes = require('./routes/education');
// const contactRoutes = require('./routes/contact');
// const aboutRoutes = require('./routes/about');
// const portfolioContextRoutes = require('./routes/portfolioContext');
// const chatRoutes = require('./routes/chat');
// const authRoutes = require('./routes/auth');

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/api/experience', experienceRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/certifications', certificationRoutes);
// app.use('/api/education', educationRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/about', aboutRoutes);
// app.use('/api/portfolio-context', portfolioContextRoutes);
// app.use('/api/chat', chatRoutes);

// // Root test
// app.get('/', (req, res) => {
//   res.send('Portfolio API is running...');
// });

// // ⭐ Wajib untuk Railway ⭐
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
