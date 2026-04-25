# Project conventions

A minimal todo app. Keep things simple — this is a learning project, not production.

## Stack

- Frontend: React via Vite
- Backend: Node + Express
- Database: Postgres, accessed with raw `pg` (no ORM)
- One `docker-compose.yml` orchestrates frontend, backend, and db

## Working style

- **Incremental commits.** Deliver one logical change per commit. Do not bundle unrelated work. Stop after each step for review before moving on.
- **Conventional Commits.** Use `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:` prefixes. Scope is optional (`feat(backend): ...`).
- **No `Co-Authored-By: Claude` trailer** in commit messages. Keep the log clean.
- **No premature abstraction.** Three similar lines is fine. Don't add layers, helpers, or config knobs until a second use case appears.
- **No speculative error handling.** Validate at boundaries (HTTP input, DB results). Trust internal calls.

## Repo layout (target)

```
simple-project/
  backend/      # Express API
  frontend/     # Vite + React
  docker-compose.yml
```
