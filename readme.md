# Run Instructions

## Tech Stack

- **Backend:** FastAPI (Python)
- **ORM / Database:** Piccolo ORM with PostgreSQL
- **Validation / Schemas:** Pydantic v2
- **Frontend:** React (Vite)
- **Tooling:** Node.js, npm, Vite, uv (piccolo runner)
- **Python version:** 3.14+

## Demo

Watch a short demonstration video here:

[Demo video on Google Drive](https://drive.google.com/file/d/16n-5pBWKqqlmgMSKAwrR-Xr9mIqL0Ihf/view)

Note: Ensure the Drive file's sharing settings allow anyone with the link to view.

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

