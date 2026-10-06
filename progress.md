# Progress Tracker

Use this file as a learning journal. Add the date, what you changed, and a link to the relevant GitHub Actions run.

## Repos

| Role | URL |
| --- | --- |
| Study notes | https://github.com/WebexCloudPlatform/kubernetes-learn (`github-actions-learning/`) |
| Hands-on (personal GitHub — reuse this) | https://github.com/auxislabs/github-actions-learning |
| Demo app | `demo-app/` at the **personal** repo root |
| Local clone | `/Users/sswamyap/suresh/git/github-actions-learning` |
| Actions | https://github.com/auxislabs/github-actions-learning/actions |

GitHub CLI: use `gh auth switch --user auxislabs` before pushing this repo; `sswamyap_cisco` is for kubernetes-learn only.

## Journal — 24 Sep 2026

- Created personal repo **auxislabs/github-actions-learning** and pushed the lab as the repo root (`demo-app/` at root). First `git push` failed as `sswamyap_cisco`; re-authenticated **auxislabs** with a new PAT, then `main` pushed successfully.
- **Module 02:** walkthrough + self-check done. Notes: `modules/02-foundations/README.md`.
- **Module 03:** started. TaskFlow CI is already in the personal repo (`.github/workflows/ci.yml`). Next: break a test on a feature branch, open a PR, see red then green. Notes: `modules/03-ci-pipeline/README.md`. Self-check not answered yet.

| Module | Status | Notes / workflow run |
| --- | --- | --- |
| 01 Git and GitHub | Done | Personal repo created and `main` pushed: https://github.com/auxislabs/github-actions-learning |
| 02 Foundations | Done | Walkthrough + self-check in `modules/02-foundations/README.md` |
| 03 CI pipeline | In progress | Notes in `modules/03-ci-pipeline/README.md`; first CI run: check Actions on auxislabs; exercise (break test / PR) not finished; self-check not answered |
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
- Personal repo: https://github.com/brm9999/github-actions-learning
