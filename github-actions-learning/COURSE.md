# GitHub Actions — full course

This lab is the complete learning path. Read modules **in order**. YAML under `modules/` is study-only. Hands-on is always [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning).

Canonical how-to-run: [`RUN-ON-GITHUB.md`](RUN-ON-GITHUB.md).

## Syllabus

| # | Module | You will be able to |
| --- | --- | --- |
| 01 | [Git and GitHub](modules/01-git-github/README.md) | Branch, commit, PR on the personal repo |
| 02 | [Workflow building blocks](modules/02-foundations/README.md) | Name workflow, event, job, runner, step, `run` vs `uses`, `needs` |
| 03 | [CI pipeline](modules/03-ci-pipeline/README.md) | Checkout, Node, `npm ci`, lint/test/build, red/green PR |
| 04 | [Events and triggers](modules/04-triggers/README.md) | `push`, `pull_request`, `workflow_dispatch`, `schedule`, filters, and the rest of the event catalog |
| 05 | [Variables and contexts](modules/05-variables-contexts/README.md) | `env`, `${{ }}`, `github`/`runner`/`needs`, `GITHUB_OUTPUT`, job outputs |
| 06 | [Cache and artifacts](modules/06-artifacts-cache/README.md) | Cache vs artifact, upload/download, `needs` between jobs |
| 07 | [Matrix](modules/07-matrix/README.md) | OS × Node matrix, `fail-fast`, `include`/`exclude` |
| 08 | [Secrets and security](modules/08-secrets-security/README.md) | Permissions, `GITHUB_TOKEN`, environments, never echo secrets, fork PRs |
| 09 | [Reusable workflows](modules/09-reusable-workflows/README.md) | `workflow_call`, `uses:`, inputs/outputs, composite vs reusable |
| 10 | [Custom actions](modules/10-custom-actions/README.md) | `action.yml`, JavaScript action, Docker action, GitHub API, action types |
| 11 | [Complete CI/CD](modules/11-complete-cicd/README.md) | Tag releases, artifacts, `gh release`, separate validate vs publish |
| 12 | [Concurrency and extras](modules/12-concurrency-extras/README.md) | Concurrency groups, timeouts, `continue-on-error`, service containers |
| 13 | [Runners](modules/13-runners/README.md) | GitHub-hosted vs self-hosted / org runners, labels, OIDC at a high level |
| 14 | [Debugging](modules/14-debugging/README.md) | Logs, re-run, `if`, expression functions, step debug |

## How this maps to kubernetes-learn

| Lab | Org repo |
| --- | --- |
| Module 03 CI | `.github/workflows/ci-validate.yml` |
| Module 04 triggers / paths | `ci-validate.yml` `on.push.paths` |
| Module 08 secrets + permissions | Vault secrets, `permissions:` on jobs |
| Module 11 release | `.github/workflows/publish-image.yml` |
| Module 04 extra events | `.github/workflows/retest-and-merge.yml` (`pull_request_review`) |
| Module 13 runners | `runs-on: webexcloudplatform-amd64-runners` |

Do **not** copy lab experiments into kubernetes-learn `.github/workflows/`.

## Topic map (full GitHub Actions surface)

| Topic | Module |
| --- | --- |
| Git, PRs, personal vs org repo | 01 |
| Workflow / job / step / `run` / `uses` / `needs` | 02 |
| Checkout, Node, `npm ci`, PR checks | 03 |
| `push`, `pull_request`, `workflow_dispatch`, `schedule`, path/branch filters, full event catalog, `github.ref` | 04 |
| `env`, contexts, `${{ }}`, `GITHUB_OUTPUT` / `GITHUB_ENV`, `if`, expression functions | 05 |
| Cache vs artifacts, job dependencies | 06 |
| Matrix, `fail-fast`, `include` / `exclude` | 07 |
| `permissions`, `GITHUB_TOKEN`, secrets, environments, `vars`, pinning, fork PRs | 08 |
| `workflow_call`, caller `with:`/`secrets:`, composite actions | 09 |
| JS / Docker / composite actions, `action.yml`, GitHub API | 10 |
| Validate vs publish, tags, GitHub Releases | 11 |
| Concurrency, timeouts, `continue-on-error`, services, job containers, `defaults` | 12 |
| Hosted vs self-hosted / org runners, labels, OIDC | 13 |
| Logs, re-run, `if: failure()`, step debug | 14 |
| Branch protection / required checks | 01 + 03 (PR must be green) |
| Dependabot for Actions versions | 08 (pin SHA); enable Dependabot on the personal repo if you want bumps |
| Org required workflows | Not used here; know they exist at org level |

Official reference: [GitHub Actions documentation](https://docs.github.com/en/actions).

## Study rhythm

1. Read the module README (self-check last).
2. Copy YAML to the **personal** repo when you want a run.
3. Change one thing; watch Actions.
4. Answer the self-check before the next module.
5. Log the run URL in [`progress.md`](progress.md).

You are **in the middle of the course**: modules 01–02 done, 03 in progress (break-test PR + self-check). Finish 03 before 04.
