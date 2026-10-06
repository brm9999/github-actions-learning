# 08 - Secrets and workflow security

Security is part of CI/CD, not an afterthought. Study [`secure-workflow.yml`](secure-workflow.yml).

## Run on GitHub

Hands-on: [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning).

1. Repo **Settings → Secrets and variables → Actions** → add `DEPLOY_TARGET` (any harmless string, e.g. `staging.example`).
2. **Settings → Environments** → create `staging`.
3. Copy `secure-workflow.yml` to `.github/workflows/` and run it.

[Run on GitHub](../../RUN-ON-GITHUB.md).

## Exercise

Add `permissions: contents: read` to every read-only workflow. Explain why a workflow that **comments on PRs** needs a different permission from a workflow that only runs tests.

---

## `permissions` and `GITHUB_TOKEN`

Every run gets `secrets.GITHUB_TOKEN`. Default abilities depend on repo settings. **Always set explicit `permissions`.**

```yaml
permissions:
  contents: read
```

| Need | Permission |
|---|---|
| checkout, read files | `contents: read` |
| push, create release | `contents: write` |
| PR comments / labels | `pull-requests: write` |
| Issue comments | `issues: write` |
| GHCR push | `packages: write` |
| Re-run others’ workflows | `actions: write` |

kubernetes-learn **Publish image** uses `contents: read` + `packages: write`. **Retest and merge** uses write on contents, PRs, and actions.

Least privilege: if the job only tests, it must not have `contents: write`.

---

## Secrets

| Kind | Where | Example |
|---|---|---|
| Repo secret | Settings → Secrets | `DEPLOY_TARGET` |
| Environment secret | Environment `staging` / `production` | Can require reviewers |
| `GITHUB_TOKEN` | Automatic | Scoped by `permissions` |
| Org secret | Org settings | Shared across repos |
| Repository **variable** | Settings → Variables | Non-secret config (`NODE_VERSION`). Use `vars.NAME`, not `secrets`. |

```yaml
env:
  DEPLOY_TARGET: ${{ secrets.DEPLOY_TARGET }}
run: |
  echo "A deployment target is configured"   # OK
  # Never: echo "$DEPLOY_TARGET"  or echo "${{ secrets.DEPLOY_TARGET }}"
```

GitHub masks secrets in logs if it sees the exact value. Do not `echo`, `curl` them to the internet, or commit them. Module 03 chart lesson: fetch from Vault at runtime (kubernetes-learn `fetch-artifactory-from-vault.sh`) — same idea as your Helm secrets discussion.

Fork PRs from **outside** do not get your repo secrets (`pull_request`). That is why CI for forks is limited.

---

## Environments

```yaml
environment: staging
```

Enables environment secrets and optional **required reviewers** / wait timer. Use `production` for real deploys.

---

## Pinning actions

Prefer:

```yaml
uses: actions/checkout@v4
```

For production, pin to a **commit SHA** after reviewing the action. Third-party tags can move. Do not run untrusted `uses:` from a fork PR with write permissions.

**Avoid `pull_request_target`** for install-and-test of PR code. It has access to secrets. Prefer `pull_request`.

---

## Map onto kubernetes-learn

Vault `VAULT_ROLE_ID` / `VAULT_SECRET_ID` are repo secrets. They are passed as env, used by a script, never printed. Docker `secret-envs` for Artifactory. That is this module in production form.

## Mental model

Token + permissions = what the job **may** do. Secrets = what the job **knows**. Environments = extra gate for deploy.

## Self-check

1. Why `permissions: contents: read` on the example?
2. Why not `echo "$DEPLOY_TARGET"`?
3. Fork PR — does it get `DEPLOY_TARGET`?
4. Which kubernetes-learn job needs `packages: write`?
5. Why is `pull_request_target` risky?

## Review answers

1. The job only checks out and reads a secret; it must not push.
2. Secrets in logs (even if often masked). Prove it exists, do not print it.
3. No, for `pull_request` from a fork.
4. Publish image (`packages: write` for GHCR).
5. It runs in the base repo with secrets; malicious PR code could steal them if you check out and execute PR code.

---

Next: [09 - Reusable workflows](../09-reusable-workflows/README.md).
