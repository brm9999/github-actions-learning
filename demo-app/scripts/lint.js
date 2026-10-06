const fs = require('node:fs');
const path = require('node:path');

const sourceDirectory = path.join(__dirname, '..', 'src');
const sourceFiles = fs.readdirSync(sourceDirectory).filter((file) => file.endsWith('.js'));

for (const file of sourceFiles) {
  const contents = fs.readFileSync(path.join(sourceDirectory, file), 'utf8');
  if (!contents.endsWith('\n')) {
    throw new Error(`${file} must end with a newline`);
  }
}

console.log(`Lint passed for ${sourceFiles.length} source file(s).`);
