const express = require('express');
const Sentry = require('./config/sentry');
const app = express();
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const pinoHttp = require('pino-http');
const logger = require('./utils/logger');

app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(
  pinoHttp({
    logger,
    autoLogging: {
      ignore: (req) =>
        req.url === '/health' || req.url === '/favicon.ico'
    }
  })
);

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
