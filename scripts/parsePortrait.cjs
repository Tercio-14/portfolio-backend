const fs = require('fs');
const content = fs.readFileSync(__dirname + '/../imageOfMe.html', 'utf8');
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
console.log('Lines: ' + result.length);
fs.mkdirSync(__dirname + '/../../portfolio-frontend/src/data', { recursive: true });
const js = 'export const PORTRAIT_LINES = ' + JSON.stringify(result) + ';\n';
fs.writeFileSync(__dirname + '/../../portfolio-frontend/src/data/portrait.js', js);
console.log('Written portrait.js with ' + result.length + ' lines');
