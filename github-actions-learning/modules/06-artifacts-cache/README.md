# 06 - Job dependencies, caching, and artifacts

Jobs run **in parallel** by default (separate VMs). `needs` makes one wait for another. **Caches** speed up downloads. **Artifacts** keep files produced by a run.

Study [`artifacts-and-cache.yml`](artifacts-and-cache.yml).

## Run on GitHub

Hands-on: [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning). Copy the YAML to `.github/workflows/` when you want a run. [Run on GitHub](../../RUN-ON-GITHUB.md).

## Exercise

Make `test` depend on `build`. Upload `demo-app/dist` and download it in `inspect`.

---

## `needs`

```yaml
inspect:
  needs: build
```

If `build` fails, `inspect` is **skipped** (module 02). Multiple: `needs: [lint, test]`.

---

## Cache vs artifact

| | Cache | Artifact |
|---|---|---|
| Purpose | Reuse **dependencies** (npm, Maven) across runs | Keep **build output** of **this** run |
| Typical | `actions/setup-node` `cache: npm` | `upload-artifact` / `download-artifact` |
| Keyed by | Lockfile hash | Run id + name |
| Between jobs? | Not for passing dist | Yes — upload in job A, download in job B |
| After the run | May expire (days) | Download from the run UI; retention (e.g. 90 days) |

Never cache secrets. Do not use cache as a substitute for artifacts when job B needs job A’s files on a **new** VM.

`setup-node` + `cache: npm` + `cache-dependency-path: demo-app/package-lock.json` is enough for this app. `actions/cache@v4` is the generic form (`key:`, `path:`).

### Where the npm cache lives

`runs-on: ubuntu-latest` gives every job a new machine, then deletes it. `cache: npm` does not keep `node_modules` on that machine. It stores the whole `~/.npm` directory (downloaded tarballs) in the **repository Actions cache**.

List for the personal repo: [Actions caches](https://github.com/auxislabs/github-actions-learning/actions/caches).

The key is runner OS + `npm` + a hash of the entire `package-lock.json`. The workflow file name is not part of the key, so another workflow in this repo with the same lockfile can restore the same cache. A feature branch can use caches from that branch and from `main`. `main` cannot use a cache saved only on a feature branch. Another repository cannot see it.

`inspect` never reads this cache. The first **Run workflow** only saves it. The next run of `build` restores it before `npm ci`.

### Some packages missing

The cache entry is one directory, not one entry per package.

| This run | What happens |
|---|---|
| Exact lockfile hash was saved before | GitHub restores that `~/.npm`. `npm ci` uses those tarballs. GitHub does not update an existing key. A tarball that is still missing is downloaded for this job only and dies with the machine. |
| Lockfile changed | Exact key misses. `setup-node` may restore an older `~/.npm` for the same OS and `npm`. Packages already there are reused. `npm ci` downloads the rest during the job. |
| Job `build` succeeds after a miss | The post-step of `setup-node` uploads the updated `~/.npm` as a **new** cache entry under the new lockfile hash. The older entry stays until it expires. |

An entry nobody accesses for 7 days is deleted. The default cap is 10 GB per repository; past that, the least recently used caches are dropped.

---

## Upload / download

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: taskflow-dist
    path: demo-app/dist/

# later job, different VM
- uses: actions/download-artifact@v4
  with:
    name: taskflow-dist
    path: downloaded-dist
```

`path` on upload is from the workspace. `working-directory` does not change `upload-artifact` paths — use `demo-app/dist/`.

`upload-artifact` sends `demo-app/dist/` to GitHub’s artifact storage for **this workflow run**, named `taskflow-dist`. It is not the npm cache, not a git commit, and not a container image. On the run page, open **Artifacts** and download the zip: `https://github.com/auxislabs/github-actions-learning/actions/runs/<run-id>`. `inspect` downloads that same object with `download-artifact`. A later run does not see it unless that run uploads it again. GitHub keeps the zip with the run, usually for 90 days.

---

## Map onto kubernetes-learn

CI Validate **builds an image and does not push** — no artifact of the image. Publish image is a **separate** workflow. Mentally: validate job ≠ share a Docker tar via artifacts here; they rebuild or publish later. Module 11 uses artifacts for the npm tarball.

## Mental model

Same job = same disk. Next job = empty VM. Artifact is how you ship files across that gap.

## Self-check

1. Do `build` and `inspect` share a filesystem without artifacts?
2. Why `cache: npm` on setup-node?
3. If `build` fails, does `inspect` run?
4. Cache or artifact for `demo-app/dist`?

## Review answers

1. No. New VM.
2. Restore `~/.npm` (or similar) keyed by the lockfile so `npm ci` is faster.
3. No (`needs: build`).
4. **Artifact** — it is this run’s output, needed on another job.

---

Next: [07 - Matrix](../07-matrix/README.md).
