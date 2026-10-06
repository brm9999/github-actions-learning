# Run on GitHub

Hands-on for every module happens on **your personal GitHub account**. kubernetes-learn is only the study copy.

The only demo application is **TaskFlow** at [`demo-app/`](demo-app/). Push **that** app (this whole lab folder as the repo root) to a **personal** repository. Do not run lab exercises on [WebexCloudPlatform/kubernetes-learn](https://github.com/WebexCloudPlatform/kubernetes-learn).

## First time vs already pushed

| Situation | What to do |
| --- | --- |
| **No personal hands-on repo yet** | Create a repository on **your** GitHub account. Push this lab so `demo-app/` is at the **repo root**. |
| **You already pushed it** | **Use that existing personal repo.** Do not create a new GitHub repo per module. |

Suggested name: `github-actions-learning`  
Hands-on repo: https://github.com/auxislabs/github-actions-learning

Write the real URL in [`progress.md`](progress.md) after the first push.

## Create the personal repo and push (once)

1. On github.com, signed into your **personal** account: **New repository**. Empty repo (no README) is easiest.
2. Copy **this folder** to a new directory that is **not** inside kubernetes-learn (so it can have its own `.git`):

```bash
cp -R /path/to/kubernetes-learn/github-actions-learning ~/suresh/git/github-actions-learning
cd ~/suresh/git/github-actions-learning

git init
git add .
git commit -m "Start GitHub Actions learning lab"
git branch -M main
git remote add origin https://github.com/<your-github-username>/github-actions-learning.git
git push -u origin main
```

After this, all PRs, `workflow_dispatch`, secrets, and Actions logs are on **that** personal repo.

## Where GitHub runs workflows

GitHub only loads **`.github/workflows/*.yml` at the personal repo root**.

| Location | Role |
| --- | --- |
| `kubernetes-learn/github-actions-learning/modules/` | Study copies — do not expect them to run |
| Personal repo `demo-app/` | The app you lint, test, and break for exercises |
| Personal repo `.github/workflows/` | Copy a module YAML here when you want a run |

Module examples already use `working-directory: demo-app`. That is correct **on the personal repo**. Do not prefix `github-actions-learning/`.

## Later modules

From the personal clone:

1. Copy the module YAML into `.github/workflows/` (only when you want a run).
2. `git push` to the **existing** personal remote.
3. Open the Actions tab (or a PR) on that repo.
4. Paste the run URL into [`progress.md`](progress.md).

Do **not** add lab workflows to kubernetes-learn `.github/workflows/` (that would mix with `ci-validate.yml`).
