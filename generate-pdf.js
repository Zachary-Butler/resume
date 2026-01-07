const puppeteer = require('puppeteer');
const { exec } = require('child_process');

(async () => {
  console.log("STEP 1: Starting local server...");
  
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

    // Log browser console messages to our node console
    page.on('console', msg => console.log('[BROWSER PAGE LOG]:', msg.text()));

    console.log("STEP 3: Navigating to localhost...");
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

    console.log("STEP 4: Generating PDF...");
    await page.pdf({
      path: 'assets/Zachary_Butler_Resume_2025.pdf',
      format: 'A4',
      printBackground: true,
      margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
    });

    console.log("STEP 5: Success! Closing browser.");
    await browser.close();

  } catch (error) {
    console.error("!!! SCRIPT FAILED !!!");
    console.error(error);
    process.exit(1);
  } finally {
    console.log("Cleaning up server...");
    server.kill();
  }
})();
