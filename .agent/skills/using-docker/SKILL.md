---
name: using-docker
description: Containerizes applications using Docker and orchestrates them with Docker Compose. Use when the user asks to "dockerize" an app, create a Dockerfile, or fix container networking.
---

# Using Docker & Docker Compose

## When to use this skill

- When the user mentions "Docker", "Container", "Image", "Volume", or "Compose".
- When the user wants to ensure a consistent development environment across machines.
- When deploying to container-based services (ECS, DigitalOcean App Platform, Render).
- When the user asks to write a `Dockerfile`.

## Workflow

1. **Dockerfile Creation**:
    - Select Base Image: `FROM node:20-alpine` (use alpine for size).
    - Set Workdir: `WORKDIR /app`.
    - Install Deps: Copy `package.json` -> `RUN npm ci`.
    - Copy Code: `COPY . .`.
    - Build/Start: `RUN npm run build` (if needed) -> `CMD ["npm", "start"]`.
2. **Docker Compose**:
    - Create `docker-compose.yml`.
    - Define services (app, db, redis).
    - Map ports (`ports: ["3000:3000"]`).
    - Define environment variables (`env_file: .env`).
3. **Execution**:
    - Build: `docker compose build`.
    - Up: `docker compose up -d` (detached).
    - Logs: `docker compose logs -f`.

## Instructions

### Standard Node.js Dockerfile (Production Ready)

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose Example

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
  
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### Best Practices

- **Layer Caching**: Always copy `package.json` and install dependencies *before* copying source code. This prevents re-installing modules when only code changes.
- **Micro-containers**: Use `alpine` or `slim` tags to minimize image size (~10x smaller).
- **Security**: Don't run as root (use `USER node` in final stage if possible).

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Compose File Reference](https://docs.docker.com/compose/compose-file/)
