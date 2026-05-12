const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node generate-cover-letter-pdf.js <input.html> <output.pdf>');
  process.exit(1);
}

const inputHtml = path.resolve(args[0]);
const outputPdf = path.resolve(args[1]);

fs.mkdirSync(path.dirname(outputPdf), { recursive: true });

(async () => {
  console.log(`Rendering ${inputHtml} → ${outputPdf}`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(`file:///${inputHtml.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPdf,
    format: 'Letter',
    printBackground: true,
    margin: { top: '1in', right: '1in', bottom: '1in', left: '1in' }
  });
  await browser.close();
  console.log('Done.');
})();
