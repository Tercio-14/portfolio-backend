import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const content = readFileSync(resolve('imageOfMe.html'), 'utf8');

// Extract the <pre>...</pre> content
const preMatch = content.match(/<pre[^>]*>([\s\S]*?)<\/pre>/);
const pre = preMatch[1];
const lines = pre.split('\n').filter(l => l.trim() !== '');

const result = [];
for (const line of lines) {
  const spans = [];
  const regex = /<b style="color:(#[0-9A-Fa-f]{6})">([01]+)<\/b>/g;
  let m;
  while ((m = regex.exec(line)) !== null) {
    spans.push({ c: m[1], t: m[2] });
  }
  if (spans.length) result.push(spans);
}

console.log(`Parsed ${result.length} lines`);
console.log(`First line: ${result[0].length} spans`);

// Write as a JS module for the frontend
const jsContent = `// Auto-generated binary portrait data
// ${result.length} lines x ~${result[0].length} spans each
export const PORTRAIT_LINES = ${JSON.stringify(result, null, 0)};
`;

writeFileSync(resolve('../portfolio-frontend/src/data/portrait.js'), jsContent);
console.log('Written to portfolio-frontend/src/data/portrait.js');
