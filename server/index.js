require("dotenv").config();
const express = require("express");
const sgMail = require("@sendgrid/mail");
const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const generatePdf = require("./helpers/generatePDF");

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

const app = express();
// parse JSON
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"))
);

app.post("/api/send", async (req, res) => {
  try {
    // get data
    const { data } = req.body;

    // get campus-superhero template
    const templatePath = path.resolve(
      __dirname,
      "templates",
      "campus-superhero.hbs"
    );
    const hbs = fs.readFileSync(templatePath).toString("utf-8");

    // get html from handlebars
    const template = Handlebars.compile(hbs);
    data["html"] = template({
      ...data,
      imageSrc: `${BASE_URL}:${PORT}/assets/cblogo-black.png`,
    });

    // generate PDF using puppeteer and add 'pdf' field to data object
    await generatePdf(data, {
      path: path.resolve(__dirname, `${data["email"]}.pdf`),
    });

    // set api key for sendGrid mail
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // get image attachment
    let imageAttachment = fs.readFileSync(
      path.resolve(__dirname, "assets", "CODING_BLOCKS_SUPERHERO_BATCH.jpeg")
    );

    // construct messages to be mailed
    let msg = {
      to: data.email,
      from: "zeeshan99adeen@gmail.com",
      templateId: "d-bc54206283ad43ecb511f46bebbc2c86",
      dynamicTemplateData: {
        subject: "OFFER LETTER - Welcome to Coding Blocks SuperHero Program 🎉",
        first_name: data["firstName"],
      },
      attachments: [
        {
          content: data["pdf"].toString("base64"),
          filename: "campus-superhero.pdf",
          type: "application/pdf",
          disposition: "attachment",
          content_id: "pdf",
        },
        {
          content: imageAttachment.toString("base64"),
          filename: "CODING_BLOCKS_SUPERHERO_BATCH.jpeg",
          type: "image/jpeg",
          disposition: "attachment",
          content_id: "image",
        },
      ],
    };

    // send mail
    await sgMail.send(msg);

    // delete directory
    fs.unlinkSync(path.resolve(__dirname, `${data.email}.pdf`));

    res.json({
      success: true,
      message: "Mail sent successfully.",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

/* -----------------------------------------------------------
  The below function is to send multiple emails asynchronously
  didnt delete it hoping it will be useful someday
  -------------------------------------------------------------
*/

// app.post("/api/send-bulk", async (req, res) => {
//   try {
//     // get data
//     const { data } = req.body;

//     // get campus-superhero template
//     const templatePath = path.resolve(
//       __dirname,
//       "templates",
//       "campus-superhero.hbs"
//     );
//     const hbs = fs.readFileSync(templatePath).toString("utf-8");

//     // get html from handlebars
//     const template = Handlebars.compile(hbs);
//     for (let i = 0; i < data.length; i++) {
//       data[i]["html"] = template({
//         ...data[i],
//         imageSrc: `${BASE_URL}:${PORT}/assets/cblogo-black.png`,
//       });
//     }

//     // create a directory to store pdfs
//     fs.mkdirSync(path.resolve(__dirname, "pdfs"));

//     // generate PDF using puppeteer and add 'pdf' field to data object
//     await generatePdfs(data);

//     // set api key for sendGrid mail
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//     // construct messages to be mailed
//     const messages = [];
//     for (let i = 0; i < data.length; i++) {
//       // get image attachment
//       let imageAttachment = fs.readFileSync(
//         path.resolve(__dirname, "assets", "CODING_BLOCKS_SUPERHERO_BATCH.jpeg")
//       );

//       let msg = {
//         to: data[i].email,
//         from: "zeeshan99adeen@gmail.com",
//         templateId: "d-bc54206283ad43ecb511f46bebbc2c86",
//         dynamicTemplateData: {
//           subject:
//             "OFFER LETTER - Welcome to Coding Blocks SuperHero Program 🎉",
//           first_name: data[i]["firstName"],
//         },
//         attachments: [
//           {
//             content: data[i]["pdf"].toString("base64"),
//             filename: "campus-superhero.pdf",
//             type: "application/pdf",
//             disposition: "attachment",
//             content_id: "pdf",
//           },
//           {
//             content: imageAttachment.toString("base64"),
//             filename: "CODING_BLOCKS_SUPERHERO_BATCH.jpeg",
//             type: "image/jpeg",
//             disposition: "attachment",
//             content_id: "image",
//           },
//         ],
//       };

//       messages.push(msg);
//     }

//     // send mail
//     await sgMail.send(messages);

//     // delete directory
//     fs.rmSync(path.resolve(__dirname, "pdfs"), {
//       recursive: true,
//       force: true,
//     });

//     res.json({
//       success: true,
//       message: "Mail sent successfully.",
//     });
//   } catch (e) {
//     console.log("err", e);
//   }
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
