# simple-project

A minimal todo app used as a learning project.

## Stack

- Frontend: React (Vite)
- Backend: Node + Express
- Database: Postgres
- Orchestration: Docker Compose (single file)

## Quick start

```sh
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend health: http://localhost:3001/health (host port 3001 maps to container 3000)
- Postgres: localhost:5433 (user/password/db all `todo`) — host port is 5433 to avoid clashing with a local postgres on 5432

Stop with `docker compose down`. Add `-v` to also wipe the database volume.
