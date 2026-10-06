# 10 - Custom actions

Three kinds of actions: **JavaScript** (`using: node20`), **Docker** (`using: docker`), and **composite** (`using: composite`, module 09). This module builds a **local JS** action that comments on an issue or PR via the GitHub API, and a small **Docker** action that greets from a container.

Files: [`action.yml`](action.yml), [`index.js`](index.js), [`custom-action.yml`](custom-action.yml), [`docker-action/action.yml`](docker-action/action.yml), [`docker-action.yml`](docker-action.yml).

## Run on GitHub

Hands-on: [auxislabs/github-actions-learning](https://github.com/auxislabs/github-actions-learning). Keep the action directory in that repo (copy `modules/10-custom-actions/` or the whole lab). Copy `custom-action.yml` to `.github/workflows/` after reviewing **permissions**.

The workflow `uses: ./modules/10-custom-actions` and runs `npm install --ignore-scripts` there first.

Copy `docker-action.yml` to `.github/workflows/docker-action.yml` as well. It calls `uses: ./modules/10-custom-actions/docker-action`, so that folder stays in the repo. Run it with **Run workflow**. It only needs `contents: read`.

Copy `gallery.yml` to `.github/workflows/custom-action-gallery.yml` to run the ten numbered actions below. That workflow also only needs `contents: read`.

[Run on GitHub](../../RUN-ON-GITHUB.md).

## Exercise

Add an output with the created comment URL (`core.setOutput`). Then change the action to add a **label** instead of a comment (`issues.addLabels`).

---

## `action.yml`

```yaml
name: TaskFlow comment action
inputs:
  message:
    required: true
runs:
  using: node20
  main: index.js
```

Inputs → `core.getInput('message')`. Outputs → `core.setOutput`. Fail → `core.setFailed`.

`uses: ./modules/10-custom-actions` names the **folder**. GitHub then reads `action.yml` (or `action.yaml`) inside it. The `uses:` line does not include the filename. That folder may also hold `index.js`, a `Dockerfile`, or a script. One action per folder, because the folder has one metadata file.

The action author writes `runs.using`. The calling workflow does not pass `node20`, `docker`, or `composite`.

| `runs.using` | What GitHub runs |
|---|---|
| `node20` | `main: index.js` on Node.js 20 (`node24` is the newer Node value) |
| `docker` | The image named by `image:`. Any language that image can run |
| `composite` | The `steps:` list (module 09) |

There is no `using: python`. Put Python in a Docker image, or call it from a composite `run:` step with `shell: python`.

The action folder can live anywhere in the repo (`modules/10-custom-actions` here). Copy only the **workflow** into `.github/workflows/`.

---

## The workflow

Triggers: `issues: types: [opened]` and `pull_request: types: [opened]` (module 04 catalog).

```yaml
permissions:
  issues: write
  pull-requests: write
  contents: read
```

Tests-only CI must **not** have these write permissions (module 08).

`GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}` is passed into the action so Octokit can call the API.

`message` and the token take different paths. `with: message` is an input, read in `index.js` with `core.getInput('message')`. `env: GITHUB_TOKEN` is an environment variable, read with `process.env.GITHUB_TOKEN`. GitHub creates `secrets.GITHUB_TOKEN` for the run. The workflow file does not contain the token value.

`npm install --ignore-scripts` has to run before `uses:`. `index.js` loads `@actions/core` and `@actions/github` from `package.json`, and `node_modules/` is gitignored. Checkout comes first so the runner has `package.json`. `--ignore-scripts` skips install scripts from those packages. A published action often commits a prebuilt file, and then the caller can skip this install.

The comment workflow's `contents: read` is for checkout. `issues: write` and `pull-requests: write` are for the comment API. The key is `pull-requests`, with a hyphen. `docker-action.yml` only needs `contents: read`.

---

## Docker action

[`docker-action/action.yml`](docker-action/action.yml) sets `using: docker` and `image: Dockerfile`. GitHub builds that image and runs [`entrypoint.sh`](docker-action/entrypoint.sh) inside it. `args` passes `who-to-greet` as `$1`. The script writes `greeting` to `GITHUB_OUTPUT`.

```yaml
runs:
  using: docker
  image: Dockerfile
  args:
    - ${{ inputs.who-to-greet }}
```

[`docker-action.yml`](docker-action.yml) calls the **folder**, the same way every action is called:

```yaml
- name: Checkout repository
  id: checkout
  uses: actions/checkout@v4
- name: Run Docker greet action
  id: greet
  uses: ./modules/10-custom-actions/docker-action
  with:
    who-to-greet: TaskFlow
- name: Print greeting
  id: print-greeting
  run: echo "${{ steps.greet.outputs.greeting }}"
```

The image runs as UID 1001, the GitHub-hosted runner user, so the entrypoint can append to `GITHUB_OUTPUT`. The workflow does not pass `using`. That value stays in `action.yml`.

`using: docker` runs the action in a container. `image: Dockerfile` is the image GitHub builds. `args` passes `who-to-greet` into the container as `$1`.

`name` on a step is the label in the Actions log. `id` is the handle for `steps.<id>`. Both are optional until a later step reads an output. The print step uses `steps.greet.outputs.greeting`, so the greet step keeps `id: greet`.

---

## Ten more actions

Each folder is one action. [`gallery.yml`](gallery.yml) calls all ten. The comment action at the module root is separate and still needs `npm install`. Actions `06`–`08` use Node only, so they do not.

| Folder | `using` | What it does |
|---|---|---|
| [`01-echo-inputs`](01-echo-inputs/action.yml) | `composite` | Prints `title` and `note` |
| [`02-set-output`](02-set-output/action.yml) | `composite` | Writes the `result` output |
| [`03-append-env`](03-append-env/action.yml) | `composite` | Sets a `TASKFLOW_*` variable for later steps |
| [`04-job-summary`](04-job-summary/action.yml) | `composite` | Appends a line to the job summary |
| [`05-fail-when-asked`](05-fail-when-asked/action.yml) | `composite` | Exits 1 only when `should-fail` is `true` |
| [`06-js-greet`](06-js-greet/action.yml) | `node20` | Greets from `index.js` and sets `greeting` |
| [`07-js-repo-facts`](07-js-repo-facts/action.yml) | `node20` | Publishes repository, sha, and ref |
| [`08-js-slug`](08-js-slug/action.yml) | `node20` | Turns a title into a lowercase slug |
| [`09-docker-upper`](09-docker-upper/action.yml) | `docker` | Uppercases text in a container |
| [`10-docker-word-count`](10-docker-word-count/action.yml) | `docker` | Counts words in a container |

Call any one by its folder:

```yaml
- uses: ./modules/10-custom-actions/06-js-greet
  with:
    who-to-greet: TaskFlow
```

`03-append-env` accepts a name that starts with `TASKFLOW_` and contains only uppercase letters, digits, and underscores. `05-fail-when-asked` stays green in the gallery because `should-fail` is `false`.

---

## Map onto kubernetes-learn

You do not ship a custom JS action there. You call **reusable actions** (`actions/checkout`, `setup-java`, `cisco-actions/docker-build-push-action`). Same interface: `uses:` + `with:` + `permissions`.

## Mental model

`uses: ./path` = action in **this** repo. `uses: owner/repo@v1` = action from GitHub. Review third-party actions before write permissions.

## Self-check

1. Which events start `custom-action.yml`?
2. Why `issues: write`?
3. Where is `message` defined vs consumed?
4. Three `runs.using` types?
5. What does `uses: ./modules/10-custom-actions` point at?
6. Why `npm install` before the JavaScript action?
7. How do `message` and `GITHUB_TOKEN` reach `index.js`?
8. What do step `name` and `id` do?
9. Where can the action folder live?

## Review answers

1. Issue opened, PR opened.
2. Creating a comment (and labels) on the issue/PR API. The workflow also sets `pull-requests: write` and `contents: read`.
3. Defined in `action.yml` `inputs`; consumed in `index.js` via `core.getInput`.
4. `node20` (JS), `docker`, `composite`. The action author sets this. The caller does not pass it.
5. The **folder**. GitHub reads `action.yml` inside it.
6. `index.js` needs `@actions/core` and `@actions/github`. They are listed in `package.json` and are not committed.
7. `message` via `with:` and `core.getInput`. `GITHUB_TOKEN` via `env:` and `process.env.GITHUB_TOKEN`.
8. `name` is the log label. `id` is how a later step reads `steps.<id>.outputs`. The greet step keeps `id: greet` because the next step prints `steps.greet.outputs.greeting`.
9. Anywhere in the repo. The workflow that calls it is the file copied to `.github/workflows/`.

---

Next: [11 - Complete CI/CD](../11-complete-cicd/README.md).
