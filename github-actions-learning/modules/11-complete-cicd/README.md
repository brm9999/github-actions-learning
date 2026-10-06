# 11 - Complete CI/CD pipeline

Validation, packaging, artifacts, and a GitHub Release. Manual by default; tag push can publish.

Study [`release.yml`](release.yml).

## Run on GitHub

Hands-on: [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning). Copy `release.yml` to `.github/workflows/`. Prefer **Run workflow** until you understand `contents: write`. [Run on GitHub](../../RUN-ON-GITHUB.md).

## Exercise

Create tag `v1.0.0` on auxislabs, run or push the tag, compare the uploaded `.tgz` with `demo-app`. Only then keep `push.tags`.

---

## Two jobs

```
validate  →  lint, test, build, npm pack, upload-artifact
release   →  needs validate, only if github.ref is a v* tag, download-artifact, gh release create
```

```yaml
on:
  workflow_dispatch:
  push:
    tags:
      - 'v*.*.*'

permissions:
  contents: write   # creating a Release
```

```yaml
release:
  if: startsWith(github.ref, 'refs/tags/v')
  needs: validate
```

A **manual** run from `main` still runs `validate`. `release` is skipped (`github.ref` is `refs/heads/main`). A tag push runs both.

That is the same split as kubernetes-learn: **CI Validate** (no push) vs **Publish image** (push to GHCR when `version.properties` hits `main`).

---

## Map onto kubernetes-learn

| Lab | Org |
|---|---|
| `validate` job | `ci-validate.yml` |
| `release` + `contents: write` | `publish-image.yml` + `packages: write` |
| Tag `v*.*.*` | Semver in `version.properties` + Create Release PR workflow |
| Artifact `.tgz` | Image in GHCR (not an Actions artifact) |

## Mental model

CI proves the build. CD publishes **only** on a deliberate signal (tag, `main` + path, or `workflow_dispatch` from `main`). Do not publish from every PR.

## Self-check

1. Why does `release` have `if: startsWith(github.ref, 'refs/tags/v')`?
2. Why `contents: write`?
3. How do files get from `validate` to `release`?
4. How does this match Publish image vs CI Validate?

## Review answers

1. So a button-run from `main` does not create a GitHub Release.
2. `gh release create` needs permission to write releases (contents).
3. `upload-artifact` / `download-artifact` (module 06).
4. Validate always; publish only on a controlled trigger (`main` + version file, not every PR).

---

Next: [12 - Concurrency and extras](../12-concurrency-extras/README.md).
