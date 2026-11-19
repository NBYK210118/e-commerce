import { INestApplication } from '@nestjs/common';
import { json } from 'express';

export function configureHttp(app: INestApplication) {
  const origins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  app.enableCors({ origin: origins.length ? origins : false });
  // The application accepts JSON (including image data), not URL-encoded forms.
  app.use(json({ limit: '10mb', strict: true }));
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    if (
      ['POST', 'PUT', 'PATCH'].includes(req.method) &&
      req.headers['content-type'] &&
      !req.is('application/json')
    ) {
      return res
        .status(415)
        .json({ message: 'Only application/json is supported' });
    }
    next();
  });
}
