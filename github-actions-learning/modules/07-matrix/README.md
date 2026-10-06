# 07 - Matrix strategies

One job definition, many combinations (OS × Node version, browsers, databases).

Study [`matrix.yml`](matrix.yml).

## Run on GitHub

Hands-on: [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning). Copy `matrix.yml` to `.github/workflows/`. macos minutes cost more on GitHub-hosted runners. [Run on GitHub](../../RUN-ON-GITHUB.md).

## Exercise

Add Node **22** to the matrix (already in the example). Use `exclude` to drop one OS/version pair and `include` to add a custom label.

---

## The example

```yaml
strategy:
  fail-fast: false
  matrix:
    os: [ubuntu-latest, macos-latest]
    node: [20, 22]
runs-on: ${{ matrix.os }}
```

That is **4** jobs: ubuntu/20, ubuntu/22, macos/20, macos/22. Each is its own VM. `${{ matrix.node }}` goes to `setup-node`.

`fail-fast: true` (default) cancels the other cells in **this** matrix when one cell fails. It does not cancel other jobs in the workflow.

- **In progress:** steps stop and the job is marked cancelled, not failed.
- **Queued:** they never start.
- **Already finished:** stay passed or failed.

`fail-fast: false` lets every cell finish, so you can see which OS/Node pairs failed. Use that while learning.

---

## `include` and `exclude`

```yaml
matrix:
  os: [ubuntu-latest, windows-latest]
  node: [20, 22]
  exclude:
    - os: windows-latest
      node: 22
  include:
    - os: ubuntu-latest
      node: 20
      label: baseline
```

A matrix can generate at most **256 jobs per workflow run**, on GitHub-hosted and self-hosted runners. GitHub counts jobs after `exclude` and `include`. More than 256 fails the run before any of those jobs start. The example here is 4 jobs.

`max-parallel` does not raise that cap. It only limits how many cells run at the same time; the rest wait. How many can actually start also depends on free runners (your plan’s concurrency on GitHub-hosted runners, or idle machines on self-hosted runners).

---

## Map onto kubernetes-learn

CI Validate is **one** runner label, not a matrix. A matrix would be “Java 17 and 21” or “amd64 and arm64”. `cisco-actions/docker-build-push-action` can do multi-arch without a matrix of jobs.

## Mental model

Matrix = cartesian product unless you `exclude`. Each cell is an independent job.

## Self-check

1. How many jobs does the example start?
2. What does `fail-fast: false` do? With the default `true`, what happens to a cell that has already started?
3. How does the job pick the Node version?
4. `include` vs a new key in `matrix:`?
5. What is the maximum number of jobs one matrix can generate?

## Review answers

1. Four (2 OS × 2 Node).
2. `false`: every cell runs to its own pass or fail. `true`: in-progress siblings are cancelled and queued siblings never start. A cell that already finished stays as it finished. Other jobs outside this matrix are left alone.
3. `node-version: ${{ matrix.node }}`.
4. `include` adds (or extra fields on) combinations; extra `matrix:` keys multiply the cartesian product.
5. 256 per workflow run, counted after `exclude` and `include`. `max-parallel` only limits how many run at once.

---

Next: [08 - Secrets and security](../08-secrets-security/README.md).
