const puppeteer = require('puppeteer');
const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function freePort(port) {
  try {
    if (process.platform === 'win32') {
      const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
      const pids = new Set();
      result.split('\n').forEach(line => {
        const match = line.match(/LISTENING\s+(\d+)/);
        if (match) pids.add(match[1]);
      });
      pids.forEach(pid => {
        try { execSync(`taskkill /PID ${pid} /F /T`, { stdio: 'ignore' }); } catch (_) {}
      });
    } else {
      execSync(`lsof -ti:${port} | xargs -r kill -9`, { stdio: 'ignore', shell: '/bin/sh' });
    }
  } catch (_) {
    // No process on the port, or tooling unavailable — fine to proceed
  }
}

function resolveOutputPath() {
  const canonical = 'assets/Zachary_Butler_Resume_2026.pdf';
  let branch = process.env.GITHUB_REF_NAME || '';
  if (!branch) {
    try {
      branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    } catch (e) {
      branch = '';
    }
  }
  if (branch.startsWith('tailored/')) {
    const slug = branch.slice('tailored/'.length).replace(/\//g, '-');
    return `assets/tailored/${slug}.pdf`;
  }
  return canonical;
}

const outputPath = resolveOutputPath();
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

(async () => {
  console.log(`STEP 1: Starting local server... (output: ${outputPath})`);

  freePort(8080);

  // We use the basic command to see if it prompts for input
  const server = exec('npx http-server -p 8080');

  // DIAGNOSTIC MAGIC: Pipe server output to the main console
  server.stdout.on('data', (data) => console.log(`[SERVER LOG]: ${data}`));
  server.stderr.on('data', (data) => console.error(`[SERVER ERROR]: ${data}`));

  // Wait a moment for server to spin up
  await new Promise(r => setTimeout(r, 3000));

  try {
    console.log("STEP 2: Launching Browser...");
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: 'light' }
    ]);

    // Log browser console messages to our node console
    page.on('console', msg => console.log('[BROWSER PAGE LOG]:', msg.text()));

    console.log("STEP 3: Navigating to localhost...");
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

    console.log("STEP 4: Generating PDF...");
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0.4in', right: '0.4in', bottom: '0.4in', left: '0.4in' }
    });

    console.log("STEP 5: Success! Closing browser.");
    await browser.close();

  } catch (error) {
    console.error("!!! SCRIPT FAILED !!!");
    console.error(error);
    process.exit(1);
} finally {
    console.log("Cleaning up server...");
    server.kill(); // Attempt 1: Ask nicely
    process.exit(0); // Attempt 2: The "Hard Stop" (Add this line!)
  }
})();
