# 03 - Continuous integration pipeline

This module takes the [module 02](../02-foundations/README.md) blocks and uses them for a real CI gate: **checkout the code, then lint, test, and build**.

The example checks out the repository, installs Node.js, restores the npm cache, runs linting and tests, and builds the application.

## Run on GitHub

Hands-on is on **your personal GitHub repo**, not kubernetes-learn.

- **First time:** create a personal repo and push [`demo-app/`](../../demo-app) — [Run on GitHub](../../RUN-ON-GITHUB.md).
- **Already pushed:** use that **existing** personal repo. Do not create a new GitHub repo for this module.

Copy [`ci.yml`](ci.yml) to `.github/workflows/ci.yml` on the **personal** repo (`working-directory: demo-app` is correct there). Compare with [`../../.github/workflows/ci.yml`](../../.github/workflows/ci.yml).

## Exercise

Break a test on a feature branch. Confirm that the pull request check becomes red. Fix the test and confirm that the check becomes green.

---

## From 02 to 03

| Module 02 | Module 03 |
|---|---|
| Event: `workflow_dispatch` (click Run) | Event: `push` and `pull_request` (every change) |
| No checkout (only `echo`) | **Must** `actions/checkout@v4` — you need the source |
| One job, two `run:` steps | Same job shape, plus `uses:` for checkout and Node |
| Does not prove the app works | Red/green PR check |

GitHub still only runs files in the **personal** repo root **`.github/workflows/`**. YAML under `modules/` in kubernetes-learn is for study. On the personal repo, keep `working-directory: demo-app` as written.

Continuous Integration = **automatically prove the branch is healthy** before merge. For TaskFlow that is the same commands you would run locally in `demo-app/`:

```
npm ci     →  install from package-lock (repeatable)
npm run lint
npm test
npm run build
```

---

## The example: `ci.yml`

```yaml
name: Example - CI pipeline

on:
  push:
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: demo-app
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: demo-app/package-lock.json
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

Using module 02 names:

- **Workflow:** `Example - CI pipeline`
- **Events:** `push`, `pull_request` (any branch — no filter)
- **Job:** `ci`
- **Runner:** `ubuntu-latest`
- **Steps:** checkout → setup-node → `npm ci` → lint → test → build

`defaults.run.working-directory: demo-app` means every `run:` is as if you `cd demo-app` first. `uses:` steps are **not** affected by that (checkout still clones the whole repo).

---

## Why each step exists

The VM starts **empty** (that is why module 02 did not need checkout).

1. **`actions/checkout@v4`** — clone this commit into `$GITHUB_WORKSPACE`. Without it, `npm test` has no files.
2. **`actions/setup-node@v4`** — install Node 20. `cache: npm` + `cache-dependency-path` reuses downloads keyed by `package-lock.json`.
3. **`npm ci`** — install from the lockfile. Repeatable. Not `npm install` (that can change the tree).
4. **`npm run lint` / `test` / `build`** — same scripts as `demo-app/package.json`. Any non-zero exit fails the job; later steps in this job **do not run** (same rule as module 02).

If tests fail, the PR check is red. That is the exercise.

---

## Lab active workflow vs module file

[`github-actions-learning/.github/workflows/ci.yml`](../../.github/workflows/ci.yml) is the same pipeline with two extra habits:

- `on.push` / `on.pull_request` only for **`main`**
- `permissions: contents: read` (same idea as module 02)

The module file runs on **every** branch. Narrower triggers come in [module 04](../04-triggers/README.md). This repo’s [`ci-validate.yml`](../../../.github/workflows/ci-validate.yml) already uses path filters.

---

## Same idea in `ci-validate.yml`

| Lab module 03 (Node) | This repo |
|---|---|
| checkout | checkout |
| setup-node | setup-java |
| `npm ci` | Maven (sometimes after Vault) |
| lint / test / build | version sync, utest, stest, Docker **build no push** |
| `ubuntu-latest` | `webexcloudplatform-amd64-runners` |

Still one job, sequential steps, fail-fast inside the job. Not a deploy. Deploy / publish is later (module 11 / Publish image workflow).

---

## Mental model

| Question | Answer |
|---|---|
| What does this module add vs 02? | Real quality gates, not `echo` |
| Why `npm ci` not `npm install`? | Lockfile-exact, reproducible CI |
| Why checkout first? | The VM starts empty |
| Why working-directory? | App lives in `demo-app/`, not repo root |
| When does the PR go red? | Any step exits non-zero |
| Does this deploy? | No |

---

## Self-check

1. What four npm commands does the job run, in order?
2. If `npm test` fails, does `npm run build` still run?
3. Why is `actions/checkout` required here but not in `first-workflow.yml`?
4. Why `npm ci` instead of `npm install`?
5. What does `working-directory: demo-app` apply to — `run:` steps, `uses:` steps, or both?
6. How do the **triggers** on the module `ci.yml` differ from the lab’s active `ci.yml`?

---

## Review answers

1. `npm ci`, `npm run lint`, `npm test`, `npm run build`.
2. No. Later steps in the same job are skipped (module 02 rule).
3. This job must read `demo-app/` (lint/test/build). Module 02 only printed env vars, so the empty VM was enough.
4. `npm ci` installs exactly what `package-lock.json` pins. `npm install` can resolve newer versions and is not a clean CI install.
5. Only `run:` steps. `uses:` (checkout, setup-node) still operate on the repo / runner as designed.
6. Module `ci.yml`: every `push` and `pull_request` (any branch). Lab `.github/workflows/ci.yml`: only when the branch is `main`.

---

Next: [04 - Events and triggers](../04-triggers/README.md).
