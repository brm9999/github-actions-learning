# 12 - Concurrency, timeouts, continue-on-error, services

Production workflows need more than “jobs and steps”: cancel stale runs, fail slow jobs, allow a flaky lint to be non-blocking, and run **service containers** (Postgres, Redis) next to the job.

Example: [`concurrency.yml`](concurrency.yml).

## Run on GitHub

Hands-on: [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning). Copy `concurrency.yml` to `.github/workflows/`. [Run on GitHub](../../RUN-ON-GITHUB.md).

## Exercise

Push twice quickly to the same branch and confirm the first run is **cancelled**. Then add a `timeout-minutes: 1` step that `sleep 120` and watch it fail.

---

## Concurrency

```yaml
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

Same `group` → only one run at a time. `cancel-in-progress: true` kills the older run (good for PR CI). Use `false` for production deploys so you never cancel a half-applied release.

---

## Timeouts and `continue-on-error`

```yaml
jobs:
  ci:
    timeout-minutes: 15
    steps:
      - continue-on-error: true
        run: npm run lint
      - run: npm test
```

Job timeout kills the whole job. Step `timeout-minutes` kills that step. `continue-on-error: true` marks the step failed (orange) but **later steps still run** — exception to module 02.

---

## Service containers

```yaml
jobs:
  integration:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_PASSWORD: ci
        ports:
          - 5432:5432
```

GitHub starts Postgres **next to** the job. Your tests use `localhost:5432`. Do not put real passwords here — CI-only. kubernetes-learn uses Postgres in Kind/Helm, not Actions services; same idea (a database for tests).

A **job container** is different: the job steps run *inside* `container: image: ...` instead of on the host VM. Services still attach as sidecars. Use a job container when the tool you need is already a Docker image (e.g. a pinned Maven image). GitHub-hosted Ubuntu + `setup-node` is enough for TaskFlow.

A **Docker action** is one step whose `action.yml` says `using: docker`. The example is [module 10 `docker-action`](../10-custom-actions/docker-action/action.yml).

---

## Defaults and shell

```yaml
defaults:
  run:
    shell: bash
    working-directory: demo-app
```

Windows jobs may need `shell: bash` explicitly if you write bash scripts.

## Mental model

Concurrency = one active CI per branch. Timeout = don’t hang forever. Services = sidecar containers on GitHub-hosted Ubuntu.

## Self-check

1. What does `cancel-in-progress: true` do?
2. When should it be `false`?
3. Does `continue-on-error` on lint still run tests?
4. Where does the job talk to `services.postgres`?

## Review answers

1. Cancels an older run in the same `concurrency.group`.
2. Deploys / publishes — don’t cancel a live production job.
3. Yes.
4. `localhost` and the mapped port on GitHub-hosted runners.

---

Next: [13 - Runners](../13-runners/README.md).
