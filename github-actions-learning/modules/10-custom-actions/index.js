const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const token = process.env.GITHUB_TOKEN;
  const message = core.getInput('message');
  const payload = github.context.payload;
  const issue = payload.issue || payload.pull_request;

  if (!issue) {
    core.setOutput('commented', 'false');
    core.info('This event has no issue or pull request to comment on.');
    return;
  }

  const client = github.getOctokit(token);
  await client.rest.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: issue.number,
    body: message,
  });

  core.setOutput('commented', 'true');
}

run().catch((error) => core.setFailed(error.message));
