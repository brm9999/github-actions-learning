const fs = require('fs');

function oneLine(name) {
  return String(process.env[name] || '').replace(/[\r\n]/g, '');
}

const facts = {
  repository: oneLine('GITHUB_REPOSITORY'),
  sha: oneLine('GITHUB_SHA'),
  ref: oneLine('GITHUB_REF'),
};

for (const [key, value] of Object.entries(facts)) {
  console.log(`${key}=${value}`);
}

const outputPath = process.env.GITHUB_OUTPUT;
if (outputPath) {
  const lines = Object.entries(facts).map(([key, value]) => `${key}=${value}`);
  fs.appendFileSync(outputPath, `${lines.join('\n')}\n`);
}
