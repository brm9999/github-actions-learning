# Progress Tracker

Use this file as a learning journal. Add the date, what you changed, and a link to the relevant GitHub Actions run.

## Repos

| Role | URL |
|------|-----|
| Study notes | https://github.com/WebexCloudPlatform/kubernetes-learn (github-actions-learning/) |
| Hands-on (personal GitHub — reuse this) | https://github.com/brm9999/github-actions-learning |
| Demo app | `demo-app/` at the personal repo root |
| Local clone | flattened so `demo-app/` and `.github/` are at the repo root |
| Actions | https://github.com/brm9999/github-actions-learning/actions |

GitHub CLI: use `gh auth switch --user brm9999` before pushing this repo; `bmache_cisco` is for kubernetes-learn only. Cisco Enterprise has Actions disabled.

## Journal — 06 Oct 2026

Created / reused personal repo `brm9999/github-actions-learning` so workflows can run (Actions are disabled on the Cisco Enterprise account). First push failed as `bmache_cisco` (macOS Keychain); cleared those credentials and re-authenticated `brm9999` with a PAT. Nested clone flattened so `.github/workflows/` sits at the repo root. Installed Node.js v20.20.2 / npm 10.8.2 via Homebrew.

Module 02: added `.github/workflows/first-workflow.yml` (`workflow_dispatch`). Manual run **First workflow #1** succeeded (~5s). Job `hello` on `ubuntu-latest` printed `Hello from GitHub Actions`; runner OS Linux, workspace `/home/runner/work/github-actions-learning/github-actions-learning`. Notes: `modules/02-foundations/README.md`.

Module 03: not started. Next: CI for `demo-app` (checkout, Node 20, `npm ci`, lint, test, build) on push/PR. Notes: `modules/03-ci-pipeline/README.md`.

## Module status

| Module | Status | Notes / workflow run |
|--------|--------|----------------------|
| 01 Git and GitHub | Done | Personal repo created and main pushed: https://github.com/brm9999/github-actions-learning |
| 02 Foundations | Done | Walkthrough + first workflow. Run: _paste URL from Actions, e.g._ https://github.com/brm9999/github-actions-learning/actions/runs/37457501650/job/112248614387 |
| 03 CI pipeline | Not started | Notes in `modules/03-ci-pipeline/README.md` |
| 04 Triggers | Not started | Full notes + event catalog: `modules/04-triggers/README.md` |
| 05 Variables and contexts | Not started | Notes in `modules/05-variables-contexts/README.md` |
| 06 Cache and artifacts | Not started | Notes in `modules/06-artifacts-cache/README.md` |
| 07 Matrix | Not started | Notes in `modules/07-matrix/README.md` |
| 08 Secrets and security | Not started | Notes in `modules/08-secrets-security/README.md` |
| 09 Reusable workflows | Not started | Notes in `modules/09-reusable-workflows/README.md` |
| 10 Custom actions | Not started | Notes in `modules/10-custom-actions/README.md` |
| 11 Complete CI/CD | Not started | Notes in `modules/11-complete-cicd/README.md` |
| 12 Concurrency and extras | Not started | Notes in `modules/12-concurrency-extras/README.md` |
| 13 Runners | Not started | Notes in `modules/13-runners/README.md` |
| 14 Debugging | Not started | Notes in `modules/14-debugging/README.md` |