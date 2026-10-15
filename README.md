# Habit Tracker — Frontend

A responsive habit-tracking interface built with React and TypeScript.
Create daily or weekly habits, record check-ins, and follow your daily
progress.

## Features

- Registration and login with a JWT-based backend
- Create, edit, and delete personal habits
- Daily and weekly habit frequencies
- Check-ins with duplicate prevention
- Daily streaks for daily habits
- Dashboard summaries and daily completion progress
- Custom delete confirmation dialog
- Responsive landing page and dashboard
- Subtle animations with reduced-motion support

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Fetch API
- ESLint

## Run Locally

Install dependencies:

```bash
npm ci
```

Start the backend on port 3000 using its own setup instructions.
Then start the frontend:

```bash
npm run dev
```

Open the Local URL printed in the terminal.

The Vite development proxy forwards `/api` requests to
`http://localhost:3000`, removing the `/api` prefix.

## Checks

```bash
npm run build
npm run lint
```

The production build is generated in `dist/`.

## Backend Integration

The frontend connects to an Express API using JWT bearer tokens.

- `POST /auth/register`
- `POST /auth/login`
- `GET /habits`
- `POST /habits`
- `PATCH /habits/:id`
- `DELETE /habits/:id`
- `POST /habits/:id/checks`
- `GET /habits/:id/streak`

## Current Limitations

- The session is held in memory; refreshing requires logging in again.
- Check-in status refreshes at login and after a check-in. A dashboard
  left open across midnight needs to be refreshed and logged into again.
- Weekly habits support check-ins, but weekly streaks are not implemented.
- Check-in dates follow the backend server's local date.
- Production hosting needs an API routing configuration; the development
  proxy alone does not configure a deployed website.

## Author

Enjo Yohannes