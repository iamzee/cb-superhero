const puppeteer = require("puppeteer");
const path = require("path");

const defaultPDFOptions = {
  path: "mypdf",
  format: "a4",
  printBackground: true,
};

module.exports = async function (data, pdfOptions = {}) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-web-security"],
    });

    for (let i = 0; i < data.length; i++) {
      data[i]["pdf"] = new Promise(async (resolve, reject) => {
        try {
          const page = await browser.newPage();
          await page.setContent(data[i]["html"], {
            waitUntil: "networkidle0",
          });
          await page.emulateMediaType("screen");
          const pdf = await page.pdf({
            ...defaultPDFOptions,
            ...pdfOptions,
            path: path.resolve(
              __dirname,
              "..",
              "pdfs",
              `${data[i]["email"]}.pdf`
            ),
          });
          resolve(pdf);
        } catch (e) {
          reject(e);
        }
      });
    }

    const pdfs = await Promise.all(data.map(d => d.pdf));

    // adding pdf field to data, so we dont have to read through file system while sending mail
    for (i = 0; i < pdfs.length; i++) {
      data[i]["pdf"] = pdfs[i];
    }
    await browser.close();
  } catch (e) {
    console.log("error=================", e);
  }
};
