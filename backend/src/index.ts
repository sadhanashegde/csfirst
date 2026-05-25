import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import repoRoutes from './routes/repoRoutes';
import contributorRoutes from './routes/contributorRoutes';
import commitRoutes from './routes/commitRoutes';
import languageRoutes from './routes/languageRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Routes
app.use('/api/repo', repoRoutes);
app.use('/api/contributors', contributorRoutes);
app.use('/api/commits', commitRoutes);
app.use('/api/languages', languageRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'GitHub Insights API is running' });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
