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

Module 02: added `.github/workflows/first-workflow.yml` (`workflow_dispatch`). Manual run **First workflow #1** succeeded. Job `hello` on `ubuntu-latest` printed `Hello from GitHub Actions`.

Module 03: copied `ci.yml` to `.github/workflows/ci.yml` and pushed to `main`. First CI run succeeded: https://github.com/brm9999/github-actions-learning/actions/runs/37459694244

Module 04: added `.github/workflows/triggers.yml` (`push` with path filters, `pull_request`, `workflow_dispatch` inputs, weekday cron). First triggers run succeeded: https://github.com/brm9999/github-actions-learning/actions/runs/37463398543  
PR #4 log: `Event: pull_request` · `Ref: refs/pull/4/merge` · `Manual environment:` empty (expected). Notes: `modules/04-triggers/README.md`.

Module 05: added variables/contexts workflow (`workflow_dispatch`). Workflow `env.PROJECT_NAME`, step `$GITHUB_OUTPUT`, job `outputs`, and `needs:` all worked. Run: https://github.com/brm9999/github-actions-learning/actions/runs/37467826773  
Notes: `modules/05-variables-contexts/README.md`.

## Module status

| Module | Status | Notes / workflow run |
|--------|--------|----------------------|
| 01 Git and GitHub | Done | Personal repo created and main pushed: https://github.com/brm9999/github-actions-learning |
| 02 Foundations | Done | Walkthrough + first workflow (manual `workflow_dispatch`) |
| 03 CI pipeline | Done | First CI run green: https://github.com/brm9999/github-actions-learning/actions/runs/37459694244 |
| 04 Triggers | Done | `triggers.yml` run: https://github.com/brm9999/github-actions-learning/actions/runs/37463398543 |
| 05 Variables and contexts | Done | Run: https://github.com/brm9999/github-actions-learning/actions/runs/37467826773 |
| 06 Cache and artifacts | Not started | Notes in `modules/06-artifacts-cache/README.md` |
| 07 Matrix | Not started | Notes in `modules/07-matrix/README.md` |
| 08 Secrets and security | Not started | Notes in `modules/08-secrets-security/README.md` |
| 09 Reusable workflows | Not started | Notes in `modules/09-reusable-workflows/README.md` |
| 10 Custom actions | Not started | Notes in `modules/10-custom-actions/README.md` |
| 11 Complete CI/CD | Not started | Notes in `modules/11-complete-cicd/README.md` |
| 12 Concurrency and extras | Not started | Notes in `modules/12-concurrency-extras/README.md` |
| 13 Runners | Not started | Notes in `modules/13-runners/README.md` |
| 14 Debugging | Not started | Notes in `modules/14-debugging/README.md` |