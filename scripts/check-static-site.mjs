import { access, readFile } from 'node:fs/promises';

const requiredFiles = ['index.html', 'src/styles.css', 'src/main.js'];

for (const file of requiredFiles) {
  await access(file);
}

const html = await readFile('index.html', 'utf8');
if (!html.includes('id="app"') || !html.includes('/src/main.js')) {
  throw new Error('index.html must mount the static dashboard script into #app');
}

console.log('Static dashboard files are present and linked.');
