const fs = require('fs');

const title = String(process.env.INPUT_TITLE || 'taskflow');
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '') || 'taskflow';

console.log(slug);

const outputPath = process.env.GITHUB_OUTPUT;
if (outputPath) {
  fs.appendFileSync(outputPath, `slug=${slug}\n`);
}
