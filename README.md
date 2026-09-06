# Home Expense Notebook - Angular 22 + JSON Server

## Local development

Terminal 1:
```bash
npm install
npm run mock-api
```

Terminal 2:
```bash
npm start
```

Local Angular uses `http://localhost:3000`.

## Vercel production

The production Angular build uses:
`https://home-expense-notebook-angular22-json.onrender.com`

Angular's production build replaces `environment.ts` with `environment.production.ts`, so the API URL is an absolute HTTPS URL and cannot become a relative Vercel path.

After pushing to GitHub, trigger a fresh Vercel deployment. If Vercel has an old cached build, use **Redeploy** with the latest commit.

## Render JSON Server

Build command:
```bash
npm install; npm run build
```

Start command:
```bash
npm run mock-api:prod
```
