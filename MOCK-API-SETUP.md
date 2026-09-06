# Mock API setup

## Local

Terminal 1:

```bash
npm install
npm run mock-api
```

JSON Server runs on `http://localhost:3000`.

Terminal 2:

```bash
npm start
```

The Windows launcher is handled by `mock-server.cjs`, so `npm run mock-api` works with the Windows Node/npm setup as well.

## Render

Use:

- Build Command: `npm install`
- Start Command: `npm run mock-api:prod`

The server listens on Render's `PORT` environment variable.
