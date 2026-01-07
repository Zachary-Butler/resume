const puppeteer = require('puppeteer');
const { exec } = require('child_process');

(async () => {
  // 1. Start the server
  const server = exec('npx -y http-server -p 8080');
  
  // Give the server time to start (increased to 5s to be safe)
  await new Promise(r => setTimeout(r, 5000));

  try {
    // 2. Launch browser with CI-specific flags (CRITICAL FIX)
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });

    const page = await browser.newPage();

    // 3. Navigate to localhost
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });

    // 4. Generate PDF
    await page.pdf({
      path: 'assets/Zachary_Butler_Resume_2025.pdf',
      format: 'A4',
      printBackground: true,
      margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
    });

    await browser.close();
  } catch (error) {
    console.error("PDF Generation Failed:", error);
    process.exit(1); // Force failure so GitHub knows something went wrong
  } finally {
    server.kill(); // Always kill the server
  }
})();
