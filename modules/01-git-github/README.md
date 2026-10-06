# 01 - Git and GitHub foundation

GitHub Actions only runs against a **GitHub repository**. This module is Git/GitHub, not YAML yet.

## Run on GitHub

Hands-on is [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning), not kubernetes-learn.

- **First time:** create that personal repo and push this lab so `demo-app/` is at the repo root — [Run on GitHub](../../RUN-ON-GITHUB.md).
- **Already pushed:** reuse it. Do not create a new repo.

Study notes stay in kubernetes-learn (`github-actions-learning/`).

## Practice (already done if auxislabs exists)

Clone path: `/Users/sswamyap/suresh/git/github-actions-learning`

```bash
gh auth switch --user auxislabs
cd /Users/sswamyap/suresh/git/github-actions-learning
git checkout -b practice/subtract
# edit demo-app, commit, push, open PR on auxislabs
```

## Concepts

| Term | Meaning |
|---|---|
| Repository | Project on GitHub |
| Commit | Snapshot of files |
| Branch | Line of work (`main`, `feature/…`) |
| Remote | `origin` URL |
| Pull request | Ask to merge a branch into `main` |
| `.gitignore` | Files Git should not track (`node_modules/`) |
| Branch protection | Rules on `main` (reviews, required checks) |
| `git revert` | New commit that undoes an old one (safe on shared branches) |
| `git reset` | Moves the branch pointer; rewriting published history is dangerous |

Fork = your copy of someone else’s repo. This lab uses **one personal repo you own**, not a fork of kubernetes-learn.

## Exercise

Add `subtract()` plus a test on a feature branch in **auxislabs**. Open a PR. CI appears after [module 03](../03-ci-pipeline/README.md) copies `ci.yml` into `.github/workflows/`.

## Mental model

Actions never runs “the files on your laptop” by themselves. You **push**; GitHub starts a runner for that commit.

## Self-check

1. Where do hands-on PRs go — kubernetes-learn or auxislabs?
2. Why copy the lab out of kubernetes-learn before `git init`?
3. `git revert` vs `git reset` on `main` that others already pulled?

## Review answers

1. **auxislabs/github-actions-learning**. kubernetes-learn is study notes + real Java CI.
2. kubernetes-learn already has `.git`. A nested `git init` would mix remotes. Copy the folder, then init, or use the existing personal clone.
3. Prefer `revert` on published `main`. `reset --hard` + force-push rewrites history.

---

Next: [02 - Workflow building blocks](../02-foundations/README.md).
