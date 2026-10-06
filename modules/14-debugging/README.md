# 14 - Debugging workflows

When CI is red: read the **step log**, not only the red X. This module is how to find *which* step failed and *why*.

Example: [`debug.yml`](debug.yml).

## Run on GitHub

Hands-on: [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning). Copy `debug.yml` to `.github/workflows/`. [Run on GitHub](../../RUN-ON-GITHUB.md).

## Exercise

Deliberately `exit 1` in a named step. Use the log to quote the failing command. Enable **Re-run failed jobs**. Then add `if: failure()` on a later step that prints “CI failed”.

---

## Reading a run

1. Actions tab → workflow → run.
2. Failed **job** → failed **step** (annotation `##[error]`).
3. Confirm `working-directory` — “file not found” is often the wrong folder (module 03).
4. `github.ref` / `github.event_name` if it ran on the wrong event (module 04).

**Re-run all jobs** vs **Re-run failed jobs**. Re-run uses the **same commit**.

---

## `if:` on failure

```yaml
- name: Notify failure
  if: failure()
  run: echo "A previous step failed"
- name: Always
  if: always()
  run: echo "Runs even when the job failed"
```

`success()` is the default for steps.

---

## Debug logging

Repo **Settings → Secrets → Actions**:

- `ACTIONS_STEP_DEBUG` = `true` → extra step logs
- `ACTIONS_RUNNER_DEBUG` = `true` → runner diagnostic logs

Turn them **off** after you finish. They can leak more data into logs. Never combine with printing secrets (module 08).

---

## Expressions you will debug

| Symptom | Check |
|---|---|
| Empty `${{ inputs.x }}` | Event was `push`, not `workflow_dispatch` |
| `github.ref` is `refs/pull/n/merge` | `pull_request` event (module 04) |
| Output empty | Missing `id:` or wrong `>> $GITHUB_OUTPUT` (module 05) |
| Artifact empty | Upload `path` wrong; `working-directory` does not apply to the action (module 06) |
| Matrix one cell red | `fail-fast` cancelled others (module 07) |

---

## Local tries (optional)

Run `npm test` in `demo-app` on your laptop first. GitHub-hosted Ubuntu is not identical to macOS, but TaskFlow has no native deps.

`act` can approximate Actions locally; it is optional and not required for this course.

## Map onto kubernetes-learn

Failed **CI Validate**: open the job `validate`, then the step (version sync, Vault, utest, stest, docker). Vault failures are often missing secrets on the **fork/PR** or wrong org runner. Version mismatch is `show-version.sh` (Helm `image.tag` lesson).

## Mental model

Red check = a **step** exited non-zero (or was skipped after a failure). The log is the source of truth.

## Self-check

1. Does re-run use a new commit?
2. `if: failure()` vs `if: always()`?
3. Why might `${{ inputs.environment }}` be empty?
4. Name two debug secrets (values should be `true`).

## Review answers

1. No. Same SHA unless you push first.
2. `failure()` only if something already failed; `always()` even on success/cancel.
3. The run was not `workflow_dispatch` (or the input name differs).
4. `ACTIONS_STEP_DEBUG`, `ACTIONS_RUNNER_DEBUG`.

---

You have finished the course path. Return to [COURSE.md](../../COURSE.md) and log runs in [progress.md](../../progress.md).
