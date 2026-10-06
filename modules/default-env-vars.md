# Default environment variables

GitHub sets these on every step. Read them in the shell as `$GITHUB_RUN_NUMBER`. They are not in the `env` context, so `${{ env.GITHUB_RUN_NUMBER }}` is empty. The matching expression is usually `${{ github.* }}`, for example `github.sha` for `GITHUB_SHA`.

A workflow cannot overwrite a `GITHUB_*` or `RUNNER_*` name. `CI` can be overwritten today. List everything the step can see with `run: env`.

Official list: [Default environment variables](https://docs.github.com/en/actions/reference/workflows-and-actions/variables#default-environment-variables).

## Run counters

These three are easy to mix up. They show up in `release-name=${PROJECT_NAME}-${GITHUB_RUN_NUMBER}`.

| Variable | What it is |
| --- | --- |
| `GITHUB_RUN_NUMBER` | Count of runs of this workflow. Starts at 1. Stays the same on a re-run. |
| `GITHUB_RUN_ID` | Unique id of this run inside the repository. Stays the same on a re-run. |
| `GITHUB_RUN_ATTEMPT` | Attempt of this run. Starts at 1 and increases each time you re-run. |

A run URL is `$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID`.

## Ref, event, repo, actor

| Variable | What it is |
| --- | --- |
| `GITHUB_SHA` | Commit that triggered the run |
| `GITHUB_REF` | Full ref, such as `refs/heads/main` or `refs/pull/2/merge` |
| `GITHUB_REF_NAME` | Short name, such as `main`. For an open pull request, `<number>/merge` |
| `GITHUB_REF_TYPE` | `branch` or `tag` |
| `GITHUB_REF_PROTECTED` | `true` when branch protection or a ruleset applies to the ref |
| `GITHUB_EVENT_NAME` | `push`, `pull_request`, `workflow_dispatch`, and so on |
| `GITHUB_ACTOR` | User or app that started the run |
| `GITHUB_ACTOR_ID` | Account id of that actor |
| `GITHUB_TRIGGERING_ACTOR` | User who started this attempt. On a re-run this can differ from `GITHUB_ACTOR` |
| `GITHUB_REPOSITORY` | `owner/repo` |
| `GITHUB_REPOSITORY_ID` | Repository id |
| `GITHUB_REPOSITORY_OWNER` | Owner name |
| `GITHUB_REPOSITORY_OWNER_ID` | Owner account id |
| `GITHUB_JOB` | Job id from the workflow file, such as `prepare` |
| `GITHUB_WORKFLOW` | Workflow `name`, or the workflow file path when `name` is omitted |
| `GITHUB_WORKFLOW_REF` | `owner/repo/.github/workflows/file.yml@refs/heads/branch` |
| `GITHUB_WORKFLOW_SHA` | Commit SHA of the workflow file |
| `GITHUB_SERVER_URL` | `https://github.com` |
| `GITHUB_API_URL` | `https://api.github.com` |
| `GITHUB_GRAPHQL_URL` | `https://api.github.com/graphql` |
| `GITHUB_RETENTION_DAYS` | How long logs and artifacts are kept |

`GITHUB_BASE_REF` (target branch) and `GITHUB_HEAD_REF` (source branch) are set only for `pull_request` and `pull_request_target`.

## Paths

These variables hold a filesystem path. `echo "release-name=..." >> "$GITHUB_OUTPUT"` appends a `name=value` line to the file at that path. The runner reads the file when the step ends.

| Variable | File it points to |
| --- | --- |
| `GITHUB_OUTPUT` | This step's outputs. A new file for each step. |
| `GITHUB_ENV` | Env vars for later steps in the same job |
| `GITHUB_PATH` | Directories to prepend to `PATH` |
| `GITHUB_STEP_SUMMARY` | Markdown for the job summary page |
| `GITHUB_EVENT_PATH` | Full event webhook payload as JSON |
| `GITHUB_WORKSPACE` | Default working directory, and where `actions/checkout` puts the repo |
| `GITHUB_ACTION_PATH` | Where the current action is checked out. Composite actions only. |
| `GITHUB_ARTIFACTS` | File where this step declares workflow artifacts |
| `GITHUB_ARTIFACTS_LIST` | Read-only JSON of artifact metadata for this job |

## Runner

| Variable | What it is |
| --- | --- |
| `RUNNER_OS` | `Linux`, `Windows`, or `macOS` |
| `RUNNER_ARCH` | `X86`, `X64`, `ARM`, or `ARM64` |
| `RUNNER_NAME` | Name of the runner. Not unique across a run. |
| `RUNNER_ENVIRONMENT` | `github-hosted` or `self-hosted` |
| `RUNNER_TEMP` | Temp directory. Emptied at the start and end of the job. |
| `RUNNER_TOOL_CACHE` | Preinstalled tools on GitHub-hosted runners |
| `RUNNER_DEBUG` | `1` only when debug logging is enabled. Otherwise unset. |

## Always true on Actions

| Variable | What it is |
| --- | --- |
| `CI` | `true`. Use it to tell a local test run from Actions. |
| `GITHUB_ACTIONS` | `true` while Actions is running the workflow. |

## Step and action names

| Variable | What it is |
| --- | --- |
| `GITHUB_ACTION` | Name of the action currently running, or the step `id`. A script step with no `id` is `__run`. |
| `GITHUB_ACTION_REPOSITORY` | `owner/repo` of the action executing this step, such as `actions/checkout` |
