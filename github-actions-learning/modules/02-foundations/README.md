# 02 - Workflow building blocks

Study [`first-workflow.yml`](first-workflow.yml) and identify the **workflow**, **event**, **job**, **runner**, **step**, **shell command**, and **action**.

## Run on GitHub

Hands-on is on **your personal GitHub repo**, not kubernetes-learn.

- **First time:** create a personal repo and push [`demo-app/`](../../demo-app) — [Run on GitHub](../../RUN-ON-GITHUB.md).
- **Already pushed:** use that **existing** personal repo. Do not create a new GitHub repo for this module.

YAML under `modules/` is **study only**. Copy [`first-workflow.yml`](first-workflow.yml) to `.github/workflows/first-workflow.yml` on the **personal** repo, push, and inspect the run. This workflow has no `demo-app` path.

## Exercise

Add a second job named `goodbye`. Make it depend on `hello` with `needs`, then deliberately make one step fail and observe which later steps run.

---

## The file

```yaml
name: First workflow

on:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - name: Say hello
        run: echo "Hello from GitHub Actions"

      - name: Show runner information
        run: |
          echo "Operating system: $RUNNER_OS"
          echo "Workspace: $GITHUB_WORKSPACE"
```

```
Workflow  "First workflow"
│
├── Event     on: workflow_dispatch     ← you click Run workflow
├── Permissions  contents: read         ← this run may only read the repo
│
└── Job  hello
      ├── Runner   ubuntu-latest        ← a fresh GitHub-hosted VM
      └── Steps (in order)
            1. run: echo ...            ← shell command
            2. run: |  (multiline)      ← still a shell command
```

| Term | In this file | Meaning |
|---|---|---|
| **Workflow** | whole YAML, `name:` | One automation file |
| **Event** | `on:` | *When* it starts |
| **Job** | `hello:` | Unit of work on **one** VM |
| **Runner** | `runs-on:` | The machine |
| **Step** | items under `steps:` | One action or one shell snippet |
| **Shell command** | `run:` | Runs in bash on Linux |
| **Action** | `uses:` (not in this file yet) | Reusable step, e.g. `actions/checkout@v4` |

Two kinds of step:

- `run:` — you write the command
- `uses:` — you call someone else’s action

This file has only `run:`. Checkout in CI is `uses:`. The repo workflow [`.github/workflows/ci-validate.yml`](../../../.github/workflows/ci-validate.yml) mixes both.

---

## The event: `workflow_dispatch`

This workflow does **not** run on push or PR. You start it from the Actions tab: **Run workflow**.

That is the same trigger as the top of `ci-validate.yml` (`workflow_dispatch`). That file *also* runs on push/PR. Module 02 is manual-only so you can click once and read logs without opening a PR.

---

## Job vs steps (this is the exercise)

**Inside one job**, steps are sequential.

- Step 1 fails → step 2 in the **same** job is **skipped**
- The job is red

**Jobs** are separate VMs. By default they run **in parallel**. `needs:` makes one wait for another.

```yaml
jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - run: echo "hello"
      - run: exit 1          # fail on purpose

  goodbye:
    needs: hello             # wait for hello
    runs-on: ubuntu-latest
    steps:
      - run: echo "goodbye"
```

| If `hello` … | Then `goodbye` … |
|---|---|
| succeeds | runs |
| fails | is **skipped** (because of `needs`) |

If you **omit** `needs`, `goodbye` still runs even when `hello` fails — different VM, no dependency.

A later step in `hello` after `exit 1` does **not** run.

---

## `permissions: contents: read`

Least privilege: this workflow only needs to read the repo. It cannot push or comment unless you grant more. Module 08 goes deeper. `ci-validate.yml` already sets the same on the `validate` job.

---

## Runner env vars (step 2)

- `$RUNNER_OS` → `Linux` on `ubuntu-latest`
- `$GITHUB_WORKSPACE` → clone path on the VM (empty until you checkout)

This workflow never checks out the repo. `echo` does not need your code. The moment you want `npm test` or `mvn test`, you need `actions/checkout@v4` first — that is [module 03](../03-ci-pipeline/README.md).

**Why there is no checkout:** not because the file uses `run:` instead of `uses:`. The job only prints text and runner env vars. The VM does not need the source tree.

---

## Map onto `ci-validate.yml`

| Module 02 | This repo [`.github/workflows/ci-validate.yml`](../../../.github/workflows/ci-validate.yml) |
|---|---|
| workflow name | `CI Validate` |
| event | `workflow_dispatch` **and** push/PR |
| job | `validate` |
| runner | `webexcloudplatform-amd64-runners` (org VM, not `ubuntu-latest`) |
| `run:` | version check, Vault script, Maven tests |
| `uses:` | `actions/checkout@v4`, `setup-java`, docker build |

Same building blocks. Different runner and commands.

---

## Mental model

| Question | Answer |
|---|---|
| Where must the file live to run? | **Personal** repo root `.github/workflows/*.yml` (plural) |
| What starts this example? | Manual `workflow_dispatch` |
| Job vs step? | Job = one VM; steps = sequence on that VM |
| `run` vs `uses`? | Shell vs reusable action |
| Failed step, same job? | Later steps skipped |
| Failed job, other job with `needs`? | Other job skipped |
| Failed job, other job **without** `needs`? | Other job still runs |
| Why no checkout here? | Nothing in the job needs the source tree |

---

## Self-check

1. Name the workflow, event, job, runner, and two steps in `first-workflow.yml`.
2. Why does this file not use `actions/checkout`?
3. If step 1 fails, does step 2 in the same job run?
4. What does `needs: hello` do for job `goodbye`?
5. Where do you put this YAML before GitHub will run it?

---

## Review answers

1. Workflow `First workflow`, event `workflow_dispatch`, job `hello`, runner `ubuntu-latest`, steps **Say hello** and **Show runner information**.
2. The job only prints text and runner env vars. Checkout clones the repo onto an empty VM; you add it when a step must read the code (`npm test`, `mvn test`).
3. No. Later steps in the **same** job are skipped.
4. `goodbye` waits for `hello` (sequential vs default parallel). If `hello` **fails**, `goodbye` is skipped, not just delayed.
5. Your **personal** repo root `.github/workflows/` (plural). `.github/workflow/` is ignored. kubernetes-learn is study-only for this lab.

---

Next: [03 - CI pipeline](../03-ci-pipeline/README.md).
