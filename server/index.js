require("dotenv").config();
const express = require("express");
const sgMail = require("@sendgrid/mail");
const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const generatePdf = require("./helpers/generatePDF");

const app = express();
// parse JSON
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    // get data
    const { firstName, lastName, email, code } = req.body;

    // get campus-superhero template
    const templatePath = path.resolve(
      __dirname,
      "templates",
      "campus-superhero.hbs"
    );
    const hbs = fs.readFileSync(templatePath).toString("utf-8");

    // get html from handlebars
    const template = Handlebars.compile(hbs);
    const html = template({ firstName, lastName, email });

    // specify path for the pdf file to be generated from html
    const outFileName = "campus-superhero.pdf";

    // generate PDF using puppeteer
    await generatePdf(html, { path: outFileName });

    // get the generatedPDF file
    const generatedPdf = fs.readFileSync(
      path.resolve(__dirname, "..", outFileName)
    );

    // set api key for sendGrid mail
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // construct message to be mailed
    const msg = {
      to: "zadeen99@gmail.com",
      from: "zeeshan99adeen@gmail.com",
      subject: "OFFER LETTER - Welcome to Coding Blocks SuperHero Program 🎉",
      text: "This is from CODING BLOCKS",
      attachments: [
        {
          content: generatedPdf.toString("base64"),
          filename: "campus-superhero.pdf",
          type: "application/pdf",
          disposition: "attachment",
          content_id: "campus-superhero",
        },
      ],
    };

    // send mail
    await sgMail.send(msg);

    // delete the generated PDF from server filesystem
    fs.unlinkSync(path.resolve(__dirname, "..", outFileName))

    // if everything works fine
    res.status(200).send({
      success: true,
    });
  } catch (e) {
    console.log('error', e);
    res.status(500).send({
      success: false,
      title: "Unable to send mail",
      message: JSON.stringify(e),
    });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
