# Astrobee 33

This repository contains a full-stack project split into separate top-level folders:

- `backend/` — Spring Boot API
- `frontend/` — React application
- `database/` — database scripts and helper utilities

## Project structure

```text
.
├── backend/
│   ├── build.gradle
│   ├── gradlew
│   ├── src/
│   └── ...
├── frontend/
│   ├── package.json
│   ├── src/
│   └── ...
├── database/
│   ├── backup_db.sh
│   ├── restore_db.sh
│   └── ...
├── assets/
├── figmafiles/
├── kavia-docs/
├── .gitignore
├── .project_manifest.yaml
├── .config.json
└── README.md
```

## Backend

The backend is a Spring Boot app configured for local development.

### Run backend

```bash
cd backend
./gradlew bootRun --no-daemon --args='--server.port=8081 --server.address=0.0.0.0'
```

### Backend endpoints

- `GET /health` → returns `OK`
- `GET /api/info` → returns app information
- Swagger UI: `http://localhost:8081/swagger-ui.html`

## Frontend

The frontend is a React app using a development proxy to connect to the backend.

### Install dependencies

```bash
cd frontend
npm install
```

### Run frontend

```bash
cd frontend
PORT=3000 HOST=0.0.0.0 npm start
```

### Frontend URL

- `http://localhost:3000`

## Deploy on Netlify

The frontend is a static React site and does not currently call the backend API. The root `netlify.toml` config builds `frontend/` and publishes its `build/` directory.

1. Import `skyguideastro/astrobee_33` in Netlify and authorize access to the repository.
2. Deploy from the `main` branch; Netlify will use the settings in `netlify.toml` and automatically deploy future pushes.
3. After the first successful deploy, add `astrobee33.com` under the site's **Domain management** settings and configure the DNS records Netlify provides at your domain registrar.

Netlify Free currently includes custom domains and SSL within its usage limits. Domain registration is a separate annual cost.

## Database

The database folder contains scripts for database setup and a local visualizer.

### Typical usage

```bash
cd database
./startup.sh
```

## Notes

- The backend runs on port `8081` in local development.
- The frontend runs on port `3000` in local development.
- The frontend proxies requests to the backend through the local dev server.

## Repository

GitHub repository:

- https://github.com/skyguideastro/astrobee_33
