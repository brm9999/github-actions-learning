# GitHub Actions Learning Lab

This is a **full GitHub Actions course**: fourteen modules covering workflow syntax, CI, every common trigger, contexts, cache/artifacts, matrix, security, reusable workflows, custom actions, release CD, concurrency, runners, and debugging.

Each module has notes, copyable YAML, an exercise, a self-check, and a mapping back to kubernetes-learn. Full syllabus: [`COURSE.md`](COURSE.md).

The only demo application is **TaskFlow** in [`demo-app/`](demo-app/). Study it here; **push it to your personal GitHub** and do every hands-on exercise **from that personal repo**.

## Repositories

| Role | Details |
| --- | --- |
| Study notes (read here) | [WebexCloudPlatform/kubernetes-learn](https://github.com/WebexCloudPlatform/kubernetes-learn) · folder `github-actions-learning/` |
| Hands-on (create once, then reuse) | [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning) — `demo-app/` at the repo root |
| First time | Create the personal repo and `git push` (see [`RUN-ON-GITHUB.md`](RUN-ON-GITHUB.md)) |
| Later modules | **Use that existing personal repo.** Do not create a new GitHub repo per module. Do not run lab workflows on kubernetes-learn. |

Record your personal repo URL in [`progress.md`](progress.md).

kubernetes-learn `ci-validate.yml` is the real Java/Kubernetes CI. Leave it alone; lab experiments belong on the personal repo.

## Start here

Prerequisites:

- Git and a **personal** GitHub account
- Node.js 20 or newer
- A code editor such as VS Code
- Module 01: create the personal repo and push this lab ([`RUN-ON-GITHUB.md`](RUN-ON-GITHUB.md))

Run the demo application locally (from this folder or from your personal clone):

```bash
cd demo-app
npm test
npm run lint
npm run build
npm start
```

Copy a module YAML into the **personal** repo `.github/workflows/` when you want a GitHub run. YAML under `modules/` is study-only.

## Learning path

Work through **01 → 14** in order. Details and the topic map: [`COURSE.md`](COURSE.md).

| Module | Topic | Main outcome |
| --- | --- | --- |
| 01 | [Git and GitHub](modules/01-git-github/README.md) | Create personal repo, push demo-app, open a PR |
| 02 | [Workflow building blocks](modules/02-foundations/README.md) | Workflow, event, job, runner, step, `run` vs `uses`, `needs` |
| 03 | [CI pipeline](modules/03-ci-pipeline/README.md) | Checkout, `npm ci`, lint/test/build, red/green PR |
| 04 | [Events and triggers](modules/04-triggers/README.md) | `push`, `pull_request`, `workflow_dispatch`, `schedule`, filters, event catalog |
| 05 | [Variables and contexts](modules/05-variables-contexts/README.md) | `env`, `${{ }}`, contexts, `GITHUB_OUTPUT`, `if` |
| 06 | [Cache and artifacts](modules/06-artifacts-cache/README.md) | Cache vs artifact, upload/download, `needs` |
| 07 | [Matrix](modules/07-matrix/README.md) | OS × Node, `fail-fast`, `include`/`exclude` |
| 08 | [Secrets and security](modules/08-secrets-security/README.md) | Permissions, secrets, environments, `vars`, pinning |
| 09 | [Reusable workflows](modules/09-reusable-workflows/README.md) | `workflow_call`, composite actions |
| 10 | [Custom actions](modules/10-custom-actions/README.md) | `action.yml`, JavaScript action, Docker action, GitHub API |
| 11 | [Complete CI/CD](modules/11-complete-cicd/README.md) | Validate vs publish, tags, GitHub Release |
| 12 | [Concurrency and extras](modules/12-concurrency-extras/README.md) | Concurrency, timeouts, services, job containers |
| 13 | [Runners](modules/13-runners/README.md) | Hosted vs org/self-hosted runners, OIDC |
| 14 | [Debugging](modules/14-debugging/README.md) | Logs, re-run, `if: failure()`, step debug |

## Suggested study rhythm

1. Read the module README (including **Run on GitHub**).
2. Copy the example into your **personal** repo `.github/workflows/` only when you are ready to run it.
3. Change one thing deliberately and observe the run on that personal repo.
4. Complete the exercise before moving to the next module.
5. Keep notes in `progress.md` and link successful workflow runs from the personal repo.

## Important safety note

The examples are educational. Before using them in a production repository, review action versions, pin third-party actions to trusted commit SHAs, set minimal `permissions`, and never print secrets. The security module explains these choices.
