require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pinoHttp = require('pino-http');
const connectDB = require('./config/db');
const leadsRoute = require('./routes/lead.routes');
const authRoute = require('./routes/auth.routes');
const { rateLimiter } = require('./middlewares/rateLimiter.middleware');
const { errorHandler } = require('./middlewares/error.middleware');
const logger = require('./utils/logger');

const app = express();

/* ======================
   GLOBAL MIDDLEWARES
====================== */

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL   ,
    credentials: true
  })
);

// ||  'https://localhost:5173'

app.use(express.json({ limit: '10kb' }));
app.use(pinoHttp({ logger }));

/* ======================
   HEALTH CHECK
====================== */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  })
);

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    env: 'development',
    uptime: process.uptime()
  });
});

/* ======================
   RATE LIMITING
====================== */

app.use('/api/leads', rateLimiter);

/* ======================
   ROUTES
====================== */

app.use('/api/leads', leadsRoute);
app.use('/api/auth', authRoute);

/* ======================
   ERROR HANDLER (LAST)
====================== */

app.use(errorHandler);

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true // only needed if you use cookies
// }));




/* ======================
   SERVER BOOTSTRAP
====================== */

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.fatal(err, '❌ Server failed to start');
    process.exit(1);
  }
})();
