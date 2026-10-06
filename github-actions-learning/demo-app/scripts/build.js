const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.join(__dirname, '..');
const sourceDirectory = path.join(projectRoot, 'src');
const outputDirectory = path.join(projectRoot, 'dist');

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

for (const file of fs.readdirSync(sourceDirectory)) {
  fs.copyFileSync(path.join(sourceDirectory, file), path.join(outputDirectory, file));
}

fs.writeFileSync(
  path.join(outputDirectory, 'build-info.json'),
  JSON.stringify({ builtAt: new Date().toISOString() }, null, 2) + '\n'
);

console.log(`Build written to ${outputDirectory}`);
