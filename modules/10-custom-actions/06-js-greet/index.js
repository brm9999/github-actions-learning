const fs = require('fs');

const who = String(process.env.INPUT_WHO_TO_GREET || 'TaskFlow').replace(/[\r\n]/g, '');
const greeting = `Hello, ${who}`;
console.log(greeting);

const outputPath = process.env.GITHUB_OUTPUT;
if (outputPath) {
  fs.appendFileSync(outputPath, `greeting=${greeting}\n`);
}
