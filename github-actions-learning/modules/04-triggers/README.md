# 04 - Events and triggers

The same workflow can respond to different GitHub events. Study the branch and path filters, manual inputs, and scheduled execution in [`triggers.yml`](triggers.yml).

Module 03 answered **what** CI runs. This module answers **when** it runs.

## Run on GitHub

Hands-on is on **your personal GitHub repo**, not kubernetes-learn.

- **First time:** create a personal repo and push [`demo-app/`](../../demo-app) — [Run on GitHub](../../RUN-ON-GITHUB.md).
- **Already pushed:** use [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning). Do not create a new GitHub repo for this module.

Copy `triggers.yml` into that repo’s `.github/workflows/` when you want a run. Keep `demo-app` paths as written.

## Exercise

Add a manual input named `message`. Print it from the workflow. Then add a path filter so documentation-only changes do not run the application tests.

---

## The four events in `triggers.yml`

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'demo-app/**'
      - '.github/workflows/**'
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: Environment to target
        required: true
        default: staging
        type: choice
        options: [staging, production]
  schedule:
    - cron: '30 6 * * 1-5'
```

| Event | When it fires | In this file |
|---|---|---|
| `push` | Commits land on a branch | Only **`main`**, and only if `demo-app/**` or `.github/workflows/**` changed |
| `pull_request` | PR opened/synced targeting that branch | Targeting **`main`** (any files — no path filter here) |
| `workflow_dispatch` | You click **Run workflow** | Extra input: `environment` = staging or production |
| `schedule` | Cron, **UTC** | `30 6 * * 1-5` = 06:30 UTC, Monday–Friday |

A workflow can list **several** events. GitHub sets `github.event_name` to whichever one started **this** run.

---

## Filters

**Branch** — `branches: [main]` means a push to `module-03-break-test` does **not** run this workflow. Module 03’s lab `ci.yml` uses the same idea.

**Paths (push only here)** — a commit that only changes `README.md` does **not** match `demo-app/**` or `.github/workflows/**`, so the **push** event is skipped. The **pull_request** block has no `paths`, so a docs-only PR to `main` **would** still run.

That is the exercise: add `paths` on `pull_request` too (or ignore `**/*.md`) so docs-only changes skip the app tests.

**Tags** (not in this file): `on.push.tags: ['v*']` for releases (module 11).

---

## Manual inputs

`workflow_dispatch.inputs` show up in the Actions UI. The job prints:

```yaml
echo "Event: ${{ github.event_name }}"
echo "Ref: ${{ github.ref }}"
echo "Manual environment: ${{ inputs.environment }}"
```

- On a **push**, `github.event_name` is `push` and `inputs.environment` is empty.
- On **Run workflow**, `github.event_name` is `workflow_dispatch` and `inputs.environment` is `staging` or `production`.

Exercise extra: add input `message` and `echo` it.

`${{ }}` is a GitHub expression (module 05). It is evaluated **before** the shell runs.

### `github.ref` vs `github.ref_name`

| Context | Example values |
|---|---|
| `github.ref` | Full ref: `refs/heads/main`, `refs/tags/v1.0.0`, `refs/pull/12/merge` |
| `github.ref_name` | Short name: `main`, `v1.0.0`, `12/merge` |
| `github.sha` | Commit SHA for this run |
| `github.head_ref` / `github.base_ref` | PR source / target branch names (empty on plain `push`) |

On **push to `main`**: `github.ref` is `refs/heads/main`. On **`workflow_dispatch` from `main`**: still `refs/heads/main`. On a **pull_request** run: typically `refs/pull/<number>/merge` (GitHub’s merge commit), not `refs/heads/your-branch`.

---

## Cron

Five fields: minute hour day-of-month month day-of-week. **UTC**, not your laptop timezone.

`30 6 * * 1-5` → 06:30 UTC on weekdays. Schedules are often delayed a few minutes and are disabled on inactive public repos.

Scheduled runs still use the default branch (`main`) unless you say otherwise.

---

## Full event catalog (everything `on:` can use)

The lab file teaches the four CI events. GitHub supports many more. You do **not** need all of them for this course; know they exist and which ones appear in kubernetes-learn.

### Everyday CI (this module)

`push` · `pull_request` · `workflow_dispatch` · `schedule`

### Used later in this course or in kubernetes-learn

| Event | Meaning | Course / org example |
|---|---|---|
| `workflow_call` | Another workflow calls this one | Module 09 |
| `workflow_run` | After another **workflow** finishes | “CI green → then deploy” |
| `release` | GitHub Release published | Module 11 |
| `push` + `tags` | Tag push (`v*.*.*`) | Module 11, `publish-image` is path-based instead |
| `repository_dispatch` | HTTP/API trigger | External tools |
| `issue_comment` | Comment on issue/PR | ChatOps / `/retest` style |
| `pull_request_review` | Review submitted | `retest-and-merge.yml` (`types: [submitted]`) |
| `issues` / `pull_request` types | `opened`, `synchronize`, … | Module 10 comments on `opened` |
| `merge_group` | Merge queue | Protected main |
| `create` / `delete` | Branch or tag created/deleted | Cleanup jobs |

### Rare in this lab

`fork` · `watch` (star) · `label` · `milestone` · `discussion` · `gollum` (wiki) · `deployment` / `deployment_status` · `check_run` / `check_suite` · `page_build` · `registry_package` · `status` · `public`

Official list: [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows).

### Do not use for normal CI

`pull_request_target` runs in the **base** repo (secrets available) and is unsafe with untrusted fork PRs. Prefer `pull_request`. Module 08.

---

## Map onto `ci-validate.yml`

kubernetes-learn [`.github/workflows/ci-validate.yml`](../../../.github/workflows/ci-validate.yml) already uses:

| Lab `triggers.yml` | `ci-validate.yml` |
|---|---|
| `workflow_dispatch` | Yes (no inputs) |
| `push` + `paths` | Yes — `greeting-app/**`, k8s deployments, scripts, the workflow files |
| `pull_request` + `paths` | Same path list |
| `schedule` | No |
| `branches: [main]` | Not set — any branch, but **paths** must match |

A README-only change on kubernetes-learn does **not** run CI Validate. A `greeting-app/**` change does. That is the same idea as `demo-app/**` here.

---

## Hands-on (auxislabs)

```bash
gh auth switch --user auxislabs
cd /Users/sswamyap/suresh/git/github-actions-learning

# copy from the study tree if needed, or from this clone's modules/
cp modules/04-triggers/triggers.yml .github/workflows/triggers.yml
git add .github/workflows/triggers.yml
git commit -m "Add module 04 triggers example"
git push origin main
```

Then:

1. Actions tab → **Example - Events and triggers** → **Run workflow** → pick `production` → confirm the log prints `workflow_dispatch` and `production`.
2. Push a **README-only** commit on `main` → this workflow should **not** run (path filter). TaskFlow CI (`ci.yml`) **will** still run if it has no path filter.

---

## Mental model

| Question | Answer |
|---|---|
| What does `on:` control? | *When* the workflow starts |
| Can one workflow have many events? | Yes |
| What is `github.event_name`? | Which event started this run |
| What does `paths` skip? | Runs where none of the listed files changed |
| What timezone is `schedule`? | UTC |
| Docs-only push with this `paths` list? | Push event skipped |

---

## Self-check

1. Name the four event types in `triggers.yml`.
2. A push to branch `feature-x` — does this workflow run? Why?
3. You commit only `README.md` on `main` — does the **push** trigger run?
4. What does `cron: '30 6 * * 1-5'` mean, and in which timezone?
5. How do you pass `staging` vs `production` without a git commit?
6. How is this similar to `ci-validate.yml` on kubernetes-learn?
7. Which extra event does kubernetes-learn `retest-and-merge.yml` use?
8. On a push to `main`, what is `github.ref` vs `github.ref_name`?

---

## Review answers

1. `push`, `pull_request`, `workflow_dispatch`, `schedule`.
2. No. `push.branches` is only `[main]`.
3. No. `README.md` is not under `demo-app/**` or `.github/workflows/**`.
4. 06:30 **UTC**, Monday–Friday.
5. Actions → Run workflow → `workflow_dispatch` input `environment`.
6. Both use `workflow_dispatch` and **path filters** so unrelated files do not start CI. kubernetes-learn filters `greeting-app/**`; this lab filters `demo-app/**`.
7. `pull_request_review` with `types: [submitted]`.
8. `refs/heads/main` vs `main`.

---

Next: [05 - Variables and contexts](../05-variables-contexts/README.md).
