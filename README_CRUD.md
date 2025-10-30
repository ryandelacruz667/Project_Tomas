## CRUD Page and API (SQLite)

### Run the server

1) Open a terminal in `server` folder:
```bash
cd server
npm install
npm run dev
```

2) Open the UI:
- CRUD UI: `http://localhost:3000/crud.html`
- Existing site files are also served from the project root.

### API endpoints
- GET `/api/items` → list items
- GET `/api/items/:id` → get one
- POST `/api/items` → create `{ name, description }`
- PUT `/api/items/:id` → update `{ name, description }`
- DELETE `/api/items/:id` → delete

The SQLite file is created at `server/data.sqlite` automatically on first run.

