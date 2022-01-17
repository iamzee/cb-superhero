const puppeteer = require("puppeteer");
const path = require("path");

// -webkit-print-color-adjust is used to print background-color on footer, otherwise it will not work
// set font-size on footer, by default it is 0
const footerTemplate = `
<style>
  html {
    -webkit-print-color-adjust: exact;
  }
  #footer { padding: 0 !important; }
</style>
<span
  style=" width: 100%; background: #e74e4b; font-size: 10px; font-weight: 600; text-transform: uppercase; display: flex; justify-content: space-between; align-items: center; padding: 8px 24px; letter-spacing: 8px; color: bisque;">
  <span>Campus superhero</span>
  <span>Confidential</span>
</span>
`;

// styles to not display header
const headerTemplate = `
<style>
  #header { display: none !important; }
</style>
`;

const defaultPDFOptions = {
  displayHeaderFooter: true,
  format: "a4",
  printBackground: true,
  margin: {
    top: "100px",
    bottom: "100px",
    left: "0px",
    right: "0px",
  },
  headerTemplate,
  footerTemplate,
};

module.exports = async function (data, pdfOptions = {}) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-web-security"],
    });
    console.log("browser===================================");
    console.log(browser);
    const page = await browser.newPage();

    console.log("page11============================");
    console.log(page);

    await page.setContent(data["html"], {
      timeout: 0,
      waitUntil: "networkidle0",
    });

    console.log("page==============================");
    console.log(page);

    data["pdf"] = await page.pdf({
      ...defaultPDFOptions,
      ...pdfOptions,
    });

    console.log("data after pdf", data);

    await browser.close();
  } catch (e) {
    console.log("error=================", e);
  }
};

/* -----------------------------------------------------------
  The below function is to create multiple pdfs asynchronously
  didnt delete it hoping it will be useful someday
  -------------------------------------------------------------
*/

// module.exports = async function (data, pdfOptions = {}) {
//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-web-security"],
//     });

//     for (let i = 0; i < data.length; i++) {
//       data[i]["pdf"] = new Promise(async (resolve, reject) => {
//         try {
//           const page = await browser.newPage();
//           await page.setContent(data[i]["html"], {
//             waitUntil: "networkidle0",
//           });
//           // await page.emulateMedia("screen");
//           const pdf = await page.pdf({
//             ...defaultPDFOptions,
//             ...pdfOptions,
//             path: path.resolve(
//               __dirname,
//               "..",
//               "pdfs",
//               `${data[i]["email"]}.pdf`
//             ),
//           });
//           resolve(pdf);
//         } catch (e) {
//           reject(e);
//         }
//       });
//     }

//     const pdfs = await Promise.all(data.map(d => d.pdf));

//     // adding pdf field to data, so we dont have to read through file system while sending mail
//     for (i = 0; i < pdfs.length; i++) {
//       data[i]["pdf"] = pdfs[i];
//     }
//     await browser.close();
//   } catch (e) {
//     console.log("error=================", e);
// console.log("error=================", e);
//   }
// };
