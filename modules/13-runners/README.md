# 13 - Runners (hosted, self-hosted, org)

A **runner** is the machine that executes jobs. `runs-on` selects it.

Example: [`runners.yml`](runners.yml) (GitHub-hosted). kubernetes-learn uses **org** runners.

## Run on GitHub

Hands-on: [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning) uses `ubuntu-latest` (GitHub-hosted). You cannot use `webexcloudplatform-amd64-runners` on auxislabs — those labels exist only on the Webex org.

Copy `runners.yml` to `.github/workflows/` if you want a hosted-runner demo. [Run on GitHub](../../RUN-ON-GITHUB.md).

## Exercise

On auxislabs, print `runner.os`, `runner.arch`, and `runner.name`. On kubernetes-learn, open any `ci-validate.yml` log and compare `runs-on`.

---

## GitHub-hosted

```yaml
runs-on: ubuntu-latest
# also: ubuntu-24.04, macos-latest, windows-latest
```

GitHub provisions a **clean VM** per job, then destroys it. Software images are documented by GitHub. You pay minutes (macOS costs more). No leftover files between jobs (module 06).

---

## Self-hosted and org runners

```yaml
runs-on: webexcloudplatform-amd64-runners
```

The org (or you) installs the [actions/runner](https://github.com/actions/runner) agent on VMs. **Labels** pick a pool.

| | GitHub-hosted | Self-hosted / org |
|---|---|---|
| Clean VM every job | Yes | Only if you rebuild; disks can persist |
| Labels | `ubuntu-latest` | Custom (`webexcloudplatform-amd64-runners`) |
| Network | GitHub cloud | Often your VPC / Artifactory / Vault |
| Secrets on disk | Destroyed with VM | Harden the machine; don’t leave tokens in workspaces |
| Auxislabs lab | Use hosted | Not available |
| kubernetes-learn | — | Required for Vault + internal Maven |

Jobs that need **Cisco Artifactory / Vault** belong on org runners. Toy Node CI belongs on `ubuntu-latest`.

---

## OIDC (high level)

GitHub can mint a short-lived token (`permissions: id-token: write`) so the job proves “I am this repo/workflow” to AWS/Azure/GCP **without** long-lived cloud keys. kubernetes-learn uses Vault **AppRole** (`VAULT_ROLE_ID` / `VAULT_SECRET_ID`) instead. Same goal: don’t put long-lived cloud passwords in YAML.

## Mental model

`runs-on` is “which fleet.” Hosted = disposable GitHub VM. Org = your hardware and network.

## Self-check

1. What happens to the filesystem when a GitHub-hosted job ends?
2. Why does `ci-validate.yml` not use `ubuntu-latest`?
3. Can auxislabs use `webexcloudplatform-amd64-runners`?
4. Why not put Vault addresses and role IDs in a public workflow file casually?

## Review answers

1. It is destroyed. Next job is empty (except caches/artifacts you set up).
2. It needs org network/secrets (Vault, Artifactory) and the org runner image.
3. No. Those labels are not registered on the personal repo.
4. The **workflow file is in git**. IDs still leak; **secret values** must stay in GitHub secrets. Even IDs are sensitive-ish — don’t add extra secrets to the lab file.

---

Next: [14 - Debugging](../14-debugging/README.md).
