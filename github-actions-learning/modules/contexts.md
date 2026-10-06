# Context objects

Read these in expressions as `${{ github.ref }}` or `${{ runner.os }}`. A property that does not exist evaluates to an empty string.

Default shell variables such as `$GITHUB_SHA` are a separate list: [`default-env-vars.md`](default-env-vars.md). Most `github.*` names have a matching `GITHUB_*` environment variable. The `env` context does not include those defaults.

Official list: [Contexts reference](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts).

## `github`

Information about this run. `github.event` is the webhook payload, so its fields change with the event (`push`, `pull_request`, and so on).

| Group | Properties |
| --- | --- |
| Event | `event_name`, `event`, `event_path`, `action_status` |
| Ref | `ref`, `ref_name`, `ref_type`, `ref_protected`, `base_ref`, `head_ref`, `sha` |
| Run | `run_id`, `run_number`, `run_attempt`, `workflow`, `workflow_ref`, `workflow_sha`, `job`, `retention_days` |
| Repo | `repository`, `repository_id`, `repository_owner`, `repository_owner_id`, `repositoryUrl` |
| Actor | `actor`, `actor_id`, `triggering_actor` |
| URLs | `server_url`, `api_url`, `graphql_url` |
| Paths | `workspace`, `env`, `path`, `action_path`, `artifacts`, `artifacts_list` |
| Action step | `action`, `action_repository`, `action_ref` |
| Other | `secret_source`, `token` |

`github.token` is the installation token, the same credential as `secrets.GITHUB_TOKEN`. It is only set inside a job's steps. Do not print the whole `github` object. The log would include that token. GitHub masks it, but the object still carries it.

`github.job` and `github.token` are `null` outside steps. `base_ref` and `head_ref` are set only for `pull_request` and `pull_request_target`.

## `runner`

The machine running the current job.

| Property | Example |
| --- | --- |
| `runner.os` | `Linux`, `Windows`, `macOS` |
| `runner.arch` | `X64`, `ARM64`, `X86`, `ARM` |
| `runner.name` | `GitHub Actions 2` |
| `runner.environment` | `github-hosted` or `self-hosted` |
| `runner.temp` | `/home/runner/work/_temp` |
| `runner.tool_cache` | `/opt/hostedtoolcache` |
| `runner.debug` | `1` only when debug logging is on; otherwise unset |

## Other contexts

| Context | Properties GitHub puts on it |
| --- | --- |
| `env` | Only names you set in workflow, job, or step `env:`. Default `GITHUB_*` variables are not in here. |
| `vars` | Repository, organization, and environment configuration variables you created. |
| `secrets` | Secret names available to the run, including `secrets.GITHUB_TOKEN`. |
| `inputs` | Inputs from `workflow_dispatch` or `workflow_call`. |
| `steps.<id>` | `outputs`, `outcome`, `conclusion` |
| `needs.<job_id>` | `result`, `outputs` |
| `jobs.<job_id>` | `result`, `outputs`. Reusable workflows only. |
| `job` | `status`, `check_run_id`, `container`, `services`, plus `workflow_ref`, `workflow_sha`, `workflow_repository`, `workflow_file_path` |
| `strategy` | `fail-fast`, `job-index`, `job-total`, `max-parallel`. Matrix jobs only. |
| `matrix` | The keys you declared, such as `matrix.os` and `matrix.node`. |

`job.status` is `success`, `failure`, or `cancelled`. `steps.<id>.outcome` is the step result before `continue-on-error`. `steps.<id>.conclusion` is the result after that flag is applied. `needs.<job_id>.result` is `success`, `failure`, `cancelled`, or `skipped`.
