require('dotenv').config();
const adminRoutes = require('./routes/admin.routes');
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
const cookieParser = require('cookie-parser');

const app = express();


app.set('trust proxy', 1);
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // required for cookies
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
  })
);
app.use(cookieParser());



app.use(express.json({ limit: '10kb' }));
app.use(pinoHttp({ logger }));

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
app.use('/api/admin', adminRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

console.log('BOOT CHECK', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI_EXISTS: !!process.env.MONGO_URI,
  FRONTEND_URL: process.env.FRONTEND_URL
});



(async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.fatal(err, 'Server failed to start');
    process.exit(1);
  }
})();
