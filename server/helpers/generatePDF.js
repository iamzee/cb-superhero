const puppeteer = require("puppeteer");

const defaultPDFOptions = { path: 'mypdf', format: 'a4', printBackground: true };

module.exports = async function (html, pdfOptions = {}) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-web-security"],
    });
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });
    await page.emulateMediaType("screen");
    await page.pdf({ ...defaultPDFOptions, ...pdfOptions });
    await browser.close();
  } catch (e) {
    console.log('error=================', error);
  }
};
