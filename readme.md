# Run Instructions

## Database Migrations

Run these commands from the `backend` folder when you need to create or apply Piccolo migrations:

```bash
uv run piccolo migrations new RBNS --auto
```

```bash
uv run piccolo migrations forwards RBNS
```


## Backend

1. Open a terminal in the `backend` folder.
2. Start the FastAPI server:

```bash
fastapi run main.py --port 8001
```

## Frontend

1. Open a second terminal in the `frontend` folder.
2. Install dependencies if needed:

```bash
npm install
```

3. Start the React app:

```bash
npm run dev
```

## Notes

- Keep the backend running before opening the frontend.
- The frontend talks to the backend at `http://127.0.0.1:8001`.

