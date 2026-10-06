# 05 - Variables, contexts, expressions, and outputs

Values move through a workflow in two layers:

- **GitHub expressions** `${{ }}` — evaluated by GitHub **before** the step shell starts
- **Shell env vars** `$NAME` — evaluated by bash **on the runner**

Study [`variables-contexts.yml`](variables-contexts.yml).

## Run on GitHub

Hands-on: [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning). Copy `variables-contexts.yml` to `.github/workflows/` when you want a run. [Run on GitHub](../../RUN-ON-GITHUB.md).

## Exercise

Change `prepare` so it outputs the version from `demo-app/package.json`. Print that value in `report`.

---

## `env` levels

```yaml
env:                    # workflow — all jobs
  PROJECT_NAME: TaskFlow
jobs:
  prepare:
    env:                # job
    steps:
      - env:            # step
          EVENT_NAME: ${{ github.event_name }}
```

Later/more specific `env` wins for the same name. Secrets belong in `secrets.*`, not `env:` in the file.

---

## Contexts you will use

| Context | Examples |
|---|---|
| `github` | `github.event_name`, `github.ref`, `github.ref_name`, `github.sha`, `github.repository`, `github.actor` |
| `runner` | `runner.os`, `runner.arch`, `GITHUB_WORKSPACE` (env) |
| `env` | `env.PROJECT_NAME` |
| `secrets` | `secrets.GITHUB_TOKEN`, `secrets.DEPLOY_TARGET` (module 08) |
| `inputs` | `workflow_dispatch` / `workflow_call` inputs |
| `steps` | `steps.metadata.outputs.release-name` (needs `id:`) |
| `needs` | `needs.prepare.outputs.release-name`, `needs.prepare.result` |
| `matrix` | `matrix.os`, `matrix.node` (module 07) |
| `job` | `job.status` |

Property lists for `github`, `runner`, and the other contexts: [`contexts.md`](../contexts.md).

Default env on the runner (not `${{ }}`): `GITHUB_REF`, `GITHUB_SHA`, `GITHUB_RUN_NUMBER`, `GITHUB_WORKSPACE`, `RUNNER_OS`. Full list: [`default-env-vars.md`](../default-env-vars.md).

---

## Passing values: `GITHUB_OUTPUT`

```yaml
- id: metadata
  run: echo "release-name=${PROJECT_NAME}-${GITHUB_RUN_NUMBER}" >> "$GITHUB_OUTPUT"
```

Then `${{ steps.metadata.outputs.release-name }}`.

To another **job**:

```yaml
jobs:
  prepare:
    outputs:
      release-name: ${{ steps.metadata.outputs.release-name }}
  report:
    needs: prepare
    if: ${{ needs.prepare.result == 'success' }}
```

Also:

| File | Purpose |
|---|---|
| `GITHUB_OUTPUT` | Step → later steps / job outputs |
| `GITHUB_ENV` | Set env for **later steps in the same job** (`echo "FOO=bar" >> $GITHUB_ENV`) |
| `GITHUB_PATH` | Prepend to PATH for later steps |
| `GITHUB_STEP_SUMMARY` | Markdown on the job summary page |

Do not use `::set-output` (deprecated).

---

## Expressions and `if`

```yaml
if: ${{ needs.prepare.result == 'success' }}
if: github.ref == 'refs/heads/main'
if: contains(github.event.pull_request.labels.*.name, 'run-ci')
```

Useful functions: `success()`, `failure()`, `always()`, `cancelled()`, `contains()`, `startsWith()`, `endsWith()`, `format()`, `fromJSON()`, `toJSON()`, `hashFiles()`.

`if` on a **job** skips the whole job. `if` on a **step** skips that step. Module 02: a **failed** step still skips later steps unless `if: always()` or `continue-on-error`.

---

## Map onto kubernetes-learn

`ci-validate.yml` writes `GITHUB_OUTPUT` in the “Read version” step (`id: version`) and the Docker action reads `${{ steps.version.outputs.image }}`. Same pattern as `release-name` here.

---

## Mental model

| Question | Answer |
|---|---|
| `${{ }}` vs `$VAR` | GitHub vs shell |
| How to pass job → job? | `outputs:` + `needs:` |
| How to pass step → step? | `id:` + `GITHUB_OUTPUT` |
| Empty `inputs.environment` on push? | Yes — that input exists only for `workflow_dispatch` |

## Self-check

1. Where is `PROJECT_NAME` set in the example?
2. Why does the metadata step need `id: metadata`?
3. How does `report` get `release-name`?
4. Name three files besides `GITHUB_OUTPUT` for passing data in a job.
5. Where does kubernetes-learn use the same output pattern?

## Review answers

1. Workflow-level `env`.
2. So later steps can use `steps.metadata.outputs.*`.
3. `needs: prepare` and `needs.prepare.outputs.release-name`.
4. `GITHUB_ENV`, `GITHUB_PATH`, `GITHUB_STEP_SUMMARY`.
5. `ci-validate.yml` step `id: version` → `steps.version.outputs.image`.

---

Next: [06 - Cache and artifacts](../06-artifacts-cache/README.md).
