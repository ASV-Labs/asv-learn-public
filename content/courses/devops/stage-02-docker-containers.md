# Docker & Containerization

## Why this lesson exists

Containers package an app with the runtime it needs. The goal is **repeatability**: the same image should behave the same in development, staging, and production — with clear boundaries for secrets, ports, health, and rollback.

This stage teaches you to write a **container release card** before editing a Dockerfile. "It runs in Docker" is not a release claim until image identity, build checks, traffic path, health proof, rollback partner, and secret rules are named.

Practice is local terminal / authorized lab only. ASV Learn does not host a Docker sandbox for this lesson.

## Reminder: where you work

```bash
cd ~/asv-learn-devops
mkdir -p stage-02
cd stage-02
```

Create `container_release_card.sh`. If Docker is installed locally, you may optionally run read-only commands like `docker version` — never against unauthorized hosts.

## Container boundary

| Artifact | Why it matters |
| --- | --- |
| Image name and tag | Identifies exact release candidate |
| Dockerfile checks | What belongs inside the image |
| Runtime port | How traffic reaches the app |
| Health check | Proves container answers after start |
| Rollback image | Previous known-good tag |
| Secret rule | Tokens come from runtime, not baked in |

Containers clarify boundaries; they do not remove operational responsibility.

## What belongs in the image

**Inside:** application code, runtime dependencies, non-root user when possible, health-check endpoint.

**Outside (runtime config):** API keys, database URLs, environment-specific URLs — inject via env vars or secret manager at deploy time.

| Bake into image | Inject at runtime |
| --- | --- |
| App source / build output | API keys, DB passwords |
| Locked dependency install | Environment-specific URLs |
| Non-secret defaults | Per-env feature flags with secrets |
| Healthcheck binary/script | Cloud credentials |

## Image layers and repeatability

Docker images stack **layers**. Instructions that change often (app code) should come **after** instructions that change rarely (dependency install) so rebuilds stay fast and cache-friendly.

Typical order:

1. Base image (pinned tag, not bare `latest` in production)
2. Install OS packages if needed
3. Copy dependency manifests → install dependencies
4. Copy application source
5. Set non-root user, expose port, define health check and CMD

When a teammate asks "what runs in prod?", the release card plus Dockerfile should answer together — image tag, build steps, port, health URL, rollback tag.

## Local Docker commands (optional, if installed)

Read-only inspection on your laptop:

| Goal | Example | Scope |
| --- | --- | --- |
| Confirm install | `docker version` | Local only |
| List images | `docker image ls` | Local only |
| Inspect one image | `docker image inspect IMAGE` | Local only |
| Run known local image | `docker run --rm -p 3000:3000 IMAGE` | Only if image exists locally |

```bash
docker version
docker image ls
# docker run --rm -p 3000:3000 learner-api:staging-2026-08-07  # only when image exists locally
```

Never push to a registry or deploy without authorization. This stage proves **release discipline**, not cloud access.

### If Docker is not installed

That is fine for stage proof. Complete the release card, Dockerfile sketch, and secret rule. Install Docker later on your own machine or authorized lab when you are ready to build — do not wait for a hosted sandbox that this course does not provide.

## Compose vs single container (honest scope)

**docker compose** (or similar) helps local multi-container setups — app + database for dev. Production may use Kubernetes or managed services instead. On your release card, name whether this deploy is **one container** or a **composed stack** so reviewers know the boundary you tested.

Compose tip for local notes: write `compose_boundary.txt` with one sentence — "dev stack = api + postgres; prod path is not this compose file." Honesty about boundaries beats pretending compose equals production.

## Common beginner mistakes

- `:latest` tag with no rollback tag recorded
- Baking `.env` files into images
- No health check (orchestrator cannot tell ready vs started)
- Running as root without reason
- Claiming containerization replaces monitoring or rollback planning
- Pushing practice images to shared registries without permission
- Expecting ASV Learn to grade a live `docker build` inside the lesson

## Your local task

### Step 1 — Create the release card

Create `container_release_card.sh`:

```bash
#!/usr/bin/env bash
# container_release_card.sh — Stage 02: Docker

image_name="learner-api:staging-2026-08-07"
dockerfile_checks="pinned base image, dependency lockfile, non-root USER"
runtime_port="3000"
container_healthcheck="curl -f http://localhost:3000/health"
rollback_image="learner-api:staging-previous"
no_secret_rule="never COPY .env or tokens; use runtime env injection"

printf '%s\n' \
  "image=$image_name" \
  "dockerfile_checks=$dockerfile_checks" \
  "runtime_port=$runtime_port" \
  "healthcheck=$container_healthcheck" \
  "rollback=$rollback_image" \
  "secret_rule=$no_secret_rule"
```

### Step 2 — Run

```bash
bash container_release_card.sh
```

Verify every field is something a teammate could act on during deploy.

### Step 3 — Optional Dockerfile sketch

Create `Dockerfile.sketch` (not required to build) with comments only:

```dockerfile
# FROM node:20-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --omit=dev
# COPY . .
# USER node
# EXPOSE 3000
# HEALTHCHECK CMD curl -f http://localhost:3000/health || exit 1
# CMD ["node", "server.js"]
```

Match each line to a field on your release card.

### Step 4 — One change

Update the tag with today's date pattern you would actually use. Add one dockerfile check (e.g. "no devDependencies in prod stage"). Re-run the card script.

### Step 5 — Secret smell test

Create `secret_smell_test.txt` listing three paths that must never appear in a Dockerfile `COPY` (examples: `.env`, `id_rsa`, cloud credential JSON). For each, write the runtime alternative (env injection, secret manager, mounted secret).

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| image | Immutable filesystem snapshot for containers |
| container | Running instance of an image |
| tag | Version label for an image |
| Dockerfile | Recipe to build an image |
| health check | Command proving the app is ready |
| layer cache | Reused build steps when inputs unchanged |
| runtime config | Values injected when the container starts |

## Proof checklist

- [ ] Release card script prints six fields
- [ ] Rollback image is named before deploy discussion
- [ ] Secret rule forbids baking credentials
- [ ] You can explain port vs health check vs tag
- [ ] Optional Dockerfile sketch matches the card
- [ ] `secret_smell_test.txt` names three forbidden bake-ins
- [ ] Any Docker commands were local or authorized-lab only

When those are true, continue to **Kubernetes Orchestration**.

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). Keep scope legal and documented. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
